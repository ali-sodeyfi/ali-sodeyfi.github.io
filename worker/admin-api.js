const DEFAULT_ALLOWED_ORIGIN = "https://ali-sodeyfi.github.io";
const DEFAULT_CONTENT_PATH = "content-overrides.json";
const DEFAULT_BRANCH = "main";
const SESSION_TTL_SECONDS = 60 * 60 * 24;
const OTP_TTL_SECONDS = 5 * 60;
const OTP_THROTTLE_SECONDS = 60;
const MAX_CONTENT_BYTES = 500000;

export default {
  async fetch(request, env) {
    const corsHeaders = getCorsHeaders(request, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    try {
      const url = new URL(request.url);
      const route = `${request.method} ${url.pathname.replace(/\/+$/, "") || "/"}`;

      if (route === "GET /health") {
        return json({ ok: true }, 200, corsHeaders);
      }

      if (route === "POST /auth/request-code") {
        return requestLoginCode(request, env, corsHeaders);
      }

      if (route === "POST /auth/verify-code") {
        return verifyLoginCode(request, env, corsHeaders);
      }

      if (route === "GET /content") {
        await requireSession(request, env);
        return getContent(env, corsHeaders);
      }

      if (route === "POST /content") {
        await requireSession(request, env);
        return saveContent(request, env, corsHeaders);
      }

      throw new HttpError(404, "Not found");
    } catch (error) {
      const status = error instanceof HttpError ? error.status : 500;
      const message = error instanceof Error ? error.message : "Unexpected error";
      return json({ ok: false, error: message }, status, corsHeaders);
    }
  },
};

async function requestLoginCode(request, env, corsHeaders) {
  assertConfigured(env, ["ADMIN_AUTH", "OWNER_PHONE", "SESSION_SECRET"]);

  const { phone } = await readJson(request);
  const normalizedPhone = normalizeIranPhone(phone);
  const ownerPhone = normalizeIranPhone(env.OWNER_PHONE);

  if (normalizedPhone !== ownerPhone) {
    return json({ ok: true }, 200, corsHeaders);
  }

  const throttleKey = `otp-throttle:${ownerPhone}`;
  const throttled = await env.ADMIN_AUTH.get(throttleKey);

  if (throttled) {
    throw new HttpError(429, "کد قبلی تازه ارسال شده است. کمی صبر کن.");
  }

  const code = createNumericCode();
  const hash = await hmacHex(env.SESSION_SECRET, `${ownerPhone}:${code}`);
  const expiresAt = Date.now() + OTP_TTL_SECONDS * 1000;

  await env.ADMIN_AUTH.put(
    `otp:${ownerPhone}`,
    JSON.stringify({ hash, attempts: 0, expiresAt }),
    { expirationTtl: OTP_TTL_SECONDS },
  );
  await env.ADMIN_AUTH.put(throttleKey, "1", { expirationTtl: OTP_THROTTLE_SECONDS });

  if (env.OTP_DEBUG === "true" && (!env.KAVENEGAR_API_KEY || !env.KAVENEGAR_TEMPLATE)) {
    return json({ ok: true, debugCode: code }, 200, corsHeaders);
  }

  assertConfigured(env, ["KAVENEGAR_API_KEY", "KAVENEGAR_TEMPLATE"]);
  await sendKavenegarOtp(ownerPhone, code, env);

  return json({ ok: true }, 200, corsHeaders);
}

async function verifyLoginCode(request, env, corsHeaders) {
  assertConfigured(env, ["ADMIN_AUTH", "OWNER_PHONE", "SESSION_SECRET"]);

  const { phone, code } = await readJson(request);
  const normalizedPhone = normalizeIranPhone(phone);
  const ownerPhone = normalizeIranPhone(env.OWNER_PHONE);

  if (normalizedPhone !== ownerPhone) {
    throw new HttpError(403, "این شماره اجازه ورود ندارد.");
  }

  const otpKey = `otp:${ownerPhone}`;
  const storedOtp = await env.ADMIN_AUTH.get(otpKey, "json");

  if (!storedOtp || Date.now() > storedOtp.expiresAt) {
    throw new HttpError(401, "کد منقضی شده است.");
  }

  if (storedOtp.attempts >= 5) {
    await env.ADMIN_AUTH.delete(otpKey);
    throw new HttpError(429, "تعداد تلاش‌ها زیاد شد. دوباره کد بگیر.");
  }

  const expectedHash = await hmacHex(env.SESSION_SECRET, `${ownerPhone}:${String(code).trim()}`);

  if (expectedHash !== storedOtp.hash) {
    storedOtp.attempts += 1;
    await env.ADMIN_AUTH.put(otpKey, JSON.stringify(storedOtp), { expirationTtl: OTP_TTL_SECONDS });
    throw new HttpError(401, "کد ورود اشتباه است.");
  }

  await env.ADMIN_AUTH.delete(otpKey);

  const token = createSessionToken();
  const tokenHash = await hmacHex(env.SESSION_SECRET, token);

  await env.ADMIN_AUTH.put(
    `session:${tokenHash}`,
    JSON.stringify({ phone: ownerPhone, createdAt: new Date().toISOString() }),
    { expirationTtl: SESSION_TTL_SECONDS },
  );

  return json({ ok: true, token, expiresIn: SESSION_TTL_SECONDS }, 200, corsHeaders);
}

async function requireSession(request, env) {
  assertConfigured(env, ["ADMIN_AUTH", "SESSION_SECRET"]);

  const authorization = request.headers.get("Authorization") ?? "";

  if (!authorization.startsWith("Bearer ")) {
    throw new HttpError(401, "ورود لازم است.");
  }

  const token = authorization.slice("Bearer ".length).trim();
  const tokenHash = await hmacHex(env.SESSION_SECRET, token);
  const session = await env.ADMIN_AUTH.get(`session:${tokenHash}`);

  if (!session) {
    throw new HttpError(401, "نشست ورود منقضی شده است.");
  }

  return JSON.parse(session);
}

async function getContent(env, corsHeaders) {
  assertConfigured(env, ["GITHUB_TOKEN", "GITHUB_OWNER", "GITHUB_REPO"]);

  const githubContent = await readGitHubContent(env);

  return json(
    {
      ok: true,
      content: githubContent.content,
      sha: githubContent.sha,
    },
    200,
    corsHeaders,
  );
}

async function saveContent(request, env, corsHeaders) {
  assertConfigured(env, ["GITHUB_TOKEN", "GITHUB_OWNER", "GITHUB_REPO"]);

  const { content } = await readJson(request);
  const validatedContent = validateContent(content);
  const current = await readGitHubContent(env);
  const path = env.CONTENT_PATH || DEFAULT_CONTENT_PATH;
  const branch = env.GITHUB_BRANCH || DEFAULT_BRANCH;
  const body = {
    message: `Update site content from admin dashboard - ${new Date().toISOString()}`,
    content: toBase64(JSON.stringify(validatedContent, null, 2) + "\n"),
    sha: current.sha,
    branch,
  };
  const result = await githubRequest(env, `/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/${path}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

  return json(
    {
      ok: true,
      commitUrl: result.commit?.html_url ?? null,
      sha: result.content?.sha ?? null,
    },
    200,
    corsHeaders,
  );
}

async function readGitHubContent(env) {
  const path = env.CONTENT_PATH || DEFAULT_CONTENT_PATH;
  const branch = env.GITHUB_BRANCH || DEFAULT_BRANCH;
  const result = await githubRequest(
    env,
    `/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/${path}?ref=${branch}`,
  );
  const text = fromBase64(String(result.content ?? "").replace(/\n/g, ""));

  return {
    sha: result.sha,
    content: JSON.parse(text),
  };
}

async function githubRequest(env, path, options = {}) {
  const response = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "ali-sodeyfi-site-admin",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(options.headers ?? {}),
    },
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new HttpError(response.status, payload.message ?? "GitHub request failed");
  }

  return payload;
}

async function sendKavenegarOtp(phone, code, env) {
  const url = new URL(`https://api.kavenegar.com/v1/${env.KAVENEGAR_API_KEY}/verify/lookup.json`);
  url.searchParams.set("receptor", phone);
  url.searchParams.set("token", code);
  url.searchParams.set("template", env.KAVENEGAR_TEMPLATE);

  const response = await fetch(url.toString(), { method: "GET" });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok || payload.return?.status !== 200) {
    throw new HttpError(502, payload.return?.message ?? "ارسال پیامک ناموفق بود.");
  }
}

function validateContent(content) {
  if (!content || typeof content !== "object" || Array.isArray(content)) {
    throw new HttpError(400, "ساختار محتوا معتبر نیست.");
  }

  const normalized = {
    schemaVersion: Number(content.schemaVersion) || 1,
    updatedAt: content.updatedAt || new Date().toISOString(),
    translations: {
      fa: content.translations?.fa ?? {},
      en: content.translations?.en ?? {},
      ar: content.translations?.ar ?? {},
    },
  };
  const encodedLength = new TextEncoder().encode(JSON.stringify(normalized)).length;

  if (encodedLength > MAX_CONTENT_BYTES) {
    throw new HttpError(413, "فایل محتوا بیش از حد بزرگ است.");
  }

  return normalized;
}

async function readJson(request) {
  const contentType = request.headers.get("Content-Type") ?? "";

  if (!contentType.includes("application/json")) {
    throw new HttpError(415, "Content-Type باید application/json باشد.");
  }

  return request.json();
}

function getCorsHeaders(request, env) {
  const origin = request.headers.get("Origin") ?? "";
  const allowedOrigins = String(env.ALLOWED_ORIGIN || DEFAULT_ALLOWED_ORIGIN)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const allowedOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...headers,
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

function assertConfigured(env, keys) {
  keys.forEach((key) => {
    if (!env[key]) {
      throw new HttpError(500, `Missing ${key}`);
    }
  });
}

function normalizeIranPhone(value) {
  const raw = String(value ?? "").trim().replace(/[^\d+]/g, "");

  if (raw.startsWith("+98")) {
    return `0${raw.slice(3)}`;
  }

  if (raw.startsWith("0098")) {
    return `0${raw.slice(4)}`;
  }

  if (raw.startsWith("98") && raw.length === 12) {
    return `0${raw.slice(2)}`;
  }

  if (raw.startsWith("9") && raw.length === 10) {
    return `0${raw}`;
  }

  return raw;
}

function createNumericCode() {
  const value = new Uint32Array(1);
  crypto.getRandomValues(value);
  return String(100000 + (value[0] % 900000));
}

function createSessionToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return base64Url(bytes);
}

async function hmacHex(secret, value) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function base64Url(bytes) {
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function toBase64(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";

  for (let index = 0; index < bytes.length; index += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
  }

  return btoa(binary);
}

function fromBase64(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new TextDecoder().decode(bytes);
}

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
