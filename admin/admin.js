const config = window.ADMIN_CONFIG ?? {};
const apiBase = String(config.apiBase ?? "").replace(/\/+$/, "");

const setupPanel = document.querySelector("[data-setup-panel]");
const authPanel = document.querySelector("[data-auth-panel]");
const authForm = document.querySelector("[data-auth-form]");
const phoneInput = document.querySelector("[data-phone-input]");
const codeInput = document.querySelector("[data-code-input]");
const requestCodeButton = document.querySelector("[data-request-code]");
const authStatus = document.querySelector("[data-auth-status]");
const editorShell = document.querySelector("[data-editor-shell]");
const contentForm = document.querySelector("[data-content-form]");
const editorStatus = document.querySelector("[data-editor-status]");
const rawJson = document.querySelector("[data-raw-json]");
const saveButton = document.querySelector("[data-save-content]");
const reloadButton = document.querySelector("[data-reload-content]");
const applyRawButton = document.querySelector("[data-apply-raw]");
const languageButtons = document.querySelectorAll("[data-editor-lang]");

const languages = ["fa", "en", "ar"];
const editableGroups = [
  {
    title: "شناسه و معرفی",
    fields: [
      ["documentTitle", "عنوان مرورگر"],
      ["metaDescription", "توضیح SEO"],
      ["brandRole", "نقش کنار لوگو"],
      ["heroTitle", "عنوان اصلی"],
      ["heroLead", "متن کوتاه معرفی"],
      ["heroThesis", "تز اصلی صفحه"],
      ["heroPrimary", "متن دکمه اصلی"],
      ["profileCaptionLabel", "برچسب تمرکز فعلی"],
      ["profileCaption", "متن تمرکز فعلی"],
    ],
  },
  {
    title: "جایگاه و لحن",
    fields: [
      ["positioningLabel", "برچسب بخش جایگاه"],
      ["positioningTitle", "عنوان جایگاه"],
      ["positioningBody", "متن جایگاه"],
      ["briefOneLabel", "برچسب brief اول"],
      ["briefOne", "متن brief اول"],
      ["briefTwoLabel", "برچسب brief دوم"],
      ["briefTwo", "متن brief دوم"],
      ["briefThreeLabel", "برچسب brief سوم"],
      ["briefThree", "متن brief سوم"],
    ],
  },
  {
    title: "تجربه‌ها",
    fields: [
      ["trackLabel", "برچسب تجربه‌ها"],
      ["trackTitle", "عنوان تجربه‌ها"],
      ["trackIntro", "مقدمه تجربه‌ها"],
      ["workOneYear", "زمان آیتم اول"],
      ["workOneTitle", "عنوان آیتم اول"],
      ["workOneBody", "متن آیتم اول"],
      ["workTwoTitle", "عنوان آیتم دوم"],
      ["workTwoBody", "متن آیتم دوم"],
      ["workThreeYear", "زمان آیتم سوم"],
      ["workThreeTitle", "عنوان آیتم سوم"],
      ["workThreeBody", "متن آیتم سوم"],
      ["workFourTitle", "عنوان آیتم چهارم"],
      ["workFourBody", "متن آیتم چهارم"],
      ["workFiveTitle", "عنوان آیتم پنجم"],
      ["workFiveBody", "متن آیتم پنجم"],
    ],
  },
  {
    title: "روش کار و تماس",
    fields: [
      ["thesisLabel", "برچسب روش کار"],
      ["thesisTitle", "عنوان روش کار"],
      ["thesisIntro", "مقدمه روش کار"],
      ["focusOneTitle", "عنوان روش اول"],
      ["focusOneBody", "متن روش اول"],
      ["focusTwoTitle", "عنوان روش دوم"],
      ["focusTwoBody", "متن روش دوم"],
      ["focusThreeTitle", "عنوان روش سوم"],
      ["focusThreeBody", "متن روش سوم"],
      ["contactLabel", "برچسب تماس"],
      ["contactTitle", "عنوان تماس"],
      ["contactBody", "متن تماس"],
      ["footerText", "متن footer"],
    ],
  },
];

const longFieldPattern = /(Body|Lead|Thesis|Intro|Caption|Description|brief|footerText|metaDescription)/i;
let activeLanguage = "fa";
let sessionToken = sessionStorage.getItem("admin-session-token") ?? "";
let content = createEmptyContent();

function createEmptyContent() {
  return {
    schemaVersion: 1,
    updatedAt: null,
    translations: {
      fa: {},
      en: {},
      ar: {},
    },
  };
}

function setStatus(node, message, isError = false) {
  if (!node) {
    return;
  }

  node.textContent = message;
  node.classList.toggle("error", isError);
}

function ensureContentShape(value) {
  const next = createEmptyContent();

  if (value && typeof value === "object") {
    next.schemaVersion = Number(value.schemaVersion) || 1;
    next.updatedAt = value.updatedAt ?? null;
    languages.forEach((language) => {
      next.translations[language] = {
        ...(value.translations?.[language] ?? {}),
      };
    });
  }

  return next;
}

function getLanguageContent(language = activeLanguage) {
  content.translations[language] ??= {};
  return content.translations[language];
}

function renderLanguageTabs() {
  languageButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.editorLang === activeLanguage));
  });
}

function renderForm() {
  const languageContent = getLanguageContent();

  contentForm.innerHTML = editableGroups
    .map((group) => {
      const fields = group.fields
        .map(([key, label]) => {
          const value = languageContent[key] ?? "";
          const fieldId = `field-${activeLanguage}-${key}`;
          const isLong = longFieldPattern.test(key);

          if (isLong) {
            return `
              <label for="${fieldId}">
                ${escapeHtml(label)}
                <textarea id="${fieldId}" data-field-key="${escapeHtml(key)}">${escapeHtml(value)}</textarea>
              </label>
            `;
          }

          return `
            <label for="${fieldId}">
              ${escapeHtml(label)}
              <input id="${fieldId}" data-field-key="${escapeHtml(key)}" value="${escapeHtml(value)}" />
            </label>
          `;
        })
        .join("");

      return `
        <section class="field-group">
          <h3>${escapeHtml(group.title)}</h3>
          ${fields}
        </section>
      `;
    })
    .join("");

  renderLanguageTabs();
  syncRawJson();
}

function syncRawJson() {
  if (rawJson) {
    rawJson.value = JSON.stringify(content, null, 2);
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return entities[character];
  });
}

async function requestApi(path, options = {}) {
  if (!apiBase) {
    throw new Error("API تنظیم نشده است.");
  }

  const headers = new Headers(options.headers ?? {});
  headers.set("Content-Type", "application/json");

  if (sessionToken) {
    headers.set("Authorization", `Bearer ${sessionToken}`);
  }

  const response = await fetch(`${apiBase}${path}`, {
    ...options,
    headers,
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error ?? "درخواست انجام نشد.");
  }

  return payload;
}

async function loadLocalContent() {
  const response = await fetch(`../content-overrides.json?v=${Date.now()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("فایل محتوای محلی پیدا نشد.");
  }

  return response.json();
}

async function loadContent() {
  setStatus(editorStatus, "در حال بارگذاری محتوا...");

  try {
    const payload = apiBase && sessionToken
      ? await requestApi("/content")
      : { content: await loadLocalContent() };

    content = ensureContentShape(payload.content ?? payload);
    renderForm();
    editorShell.hidden = false;
    setStatus(
      editorStatus,
      apiBase ? "محتوا آماده و قابل ذخیره است." : "حالت محلی: برای ذخیره واقعی، backend را تنظیم کن.",
      !apiBase,
    );
  } catch (error) {
    setStatus(editorStatus, error.message, true);
  }
}

async function requestLoginCode() {
  const phone = phoneInput.value.trim();

  if (!phone) {
    setStatus(authStatus, "شماره موبایل را وارد کن.", true);
    return;
  }

  requestCodeButton.disabled = true;
  setStatus(authStatus, "در حال ارسال کد...");

  try {
    await requestApi("/auth/request-code", {
      method: "POST",
      body: JSON.stringify({ phone }),
    });
    setStatus(authStatus, "اگر شماره مجاز باشد، کد ورود ارسال شد.");
  } catch (error) {
    setStatus(authStatus, error.message, true);
  } finally {
    requestCodeButton.disabled = false;
  }
}

async function verifyLogin(event) {
  event.preventDefault();

  const phone = phoneInput.value.trim();
  const code = codeInput.value.trim();

  if (!phone || !code) {
    setStatus(authStatus, "شماره و کد پیامکی را وارد کن.", true);
    return;
  }

  setStatus(authStatus, "در حال بررسی کد...");

  try {
    const payload = await requestApi("/auth/verify-code", {
      method: "POST",
      body: JSON.stringify({ phone, code }),
    });
    sessionToken = payload.token;
    sessionStorage.setItem("admin-session-token", sessionToken);
    authPanel.hidden = true;
    await loadContent();
    setStatus(authStatus, "");
  } catch (error) {
    setStatus(authStatus, error.message, true);
  }
}

async function saveContent() {
  if (!apiBase) {
    setStatus(editorStatus, "برای ذخیره واقعی باید backend deploy و apiBase تنظیم شود.", true);
    return;
  }

  content.updatedAt = new Date().toISOString();
  syncRawJson();
  saveButton.disabled = true;
  setStatus(editorStatus, "در حال ذخیره روی GitHub...");

  try {
    const payload = await requestApi("/content", {
      method: "POST",
      body: JSON.stringify({ content }),
    });

    setStatus(
      editorStatus,
      payload.commitUrl ? `ذخیره شد. Commit: ${payload.commitUrl}` : "ذخیره شد.",
    );
  } catch (error) {
    setStatus(editorStatus, error.message, true);
  } finally {
    saveButton.disabled = false;
  }
}

function applyRawJson() {
  try {
    content = ensureContentShape(JSON.parse(rawJson.value));
    renderForm();
    setStatus(editorStatus, "JSON روی فرم اعمال شد.");
  } catch {
    setStatus(editorStatus, "JSON معتبر نیست.", true);
  }
}

contentForm?.addEventListener("input", (event) => {
  const target = event.target instanceof HTMLElement ? event.target : null;
  const key = target?.dataset.fieldKey;

  if (!key) {
    return;
  }

  getLanguageContent()[key] = target.value;
  syncRawJson();
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeLanguage = button.dataset.editorLang ?? "fa";
    renderForm();
  });
});

requestCodeButton?.addEventListener("click", requestLoginCode);
authForm?.addEventListener("submit", verifyLogin);
saveButton?.addEventListener("click", saveContent);
reloadButton?.addEventListener("click", loadContent);
applyRawButton?.addEventListener("click", applyRawJson);

async function bootDashboard() {
  if (!apiBase) {
    setupPanel.hidden = false;
    authPanel.hidden = true;
    saveButton.disabled = true;
    await loadContent();
    return;
  }

  setupPanel.hidden = true;

  if (sessionToken) {
    authPanel.hidden = true;
    await loadContent();
  }
}

bootDashboard();
