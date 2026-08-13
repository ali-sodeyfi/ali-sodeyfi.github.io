# Admin Dashboard Setup

The public site is hosted on GitHub Pages, so secure SMS login and saving edits need a small backend. This repo includes:

- `admin/`: the public admin dashboard UI.
- `content-overrides.json`: editable personal-brand content consumed by the public site.
- `worker/admin-api.js`: Cloudflare Worker backend for OTP login and GitHub saves.

## Why a Backend Is Required

GitHub Pages is static. SMS API keys, GitHub tokens, OTP codes, and the allowed owner phone must never be placed in browser JavaScript. The Worker keeps those values as secrets and exposes only safe API endpoints to the dashboard.

## Backend Services

- Cloudflare Workers + KV for OTP/session storage.
- Kavenegar OTP via `verify/lookup.json`.
- GitHub Contents API for updating `content-overrides.json`.

Kavenegar OTP docs:
https://kavenegar.com/rest.html

## Deploy Steps

1. Install and log in to Wrangler.

```powershell
npm install -g wrangler
wrangler login
```

2. Create a KV namespace.

```powershell
wrangler kv namespace create ADMIN_AUTH
```

3. Copy the example config and replace the KV namespace id.

```powershell
Copy-Item worker\wrangler.example.toml worker\wrangler.toml
```

4. Set Worker secrets.

```powershell
wrangler secret put OWNER_PHONE
wrangler secret put SESSION_SECRET
wrangler secret put GITHUB_TOKEN
wrangler secret put KAVENEGAR_API_KEY
```

Use the owner mobile number as `OWNER_PHONE`. Generate a long random value for `SESSION_SECRET`.

The GitHub token should be fine-grained and limited to this repo with Contents read/write permission.

5. Create or approve a Kavenegar verification template whose name matches `KAVENEGAR_TEMPLATE` in `worker/wrangler.toml`. The template text must include `%token`.

6. Deploy.

```powershell
Set-Location worker
wrangler deploy
```

7. Put the deployed Worker URL in `admin/admin-config.js`.

```js
window.ADMIN_CONFIG = {
  apiBase: "https://your-worker-url.workers.dev",
};
```

8. Commit and push `admin/admin-config.js`. Then open:

```text
https://ali-sodeyfi.github.io/admin/
```

## Local Debug Mode

For local-only testing without Kavenegar, set `OTP_DEBUG=true` in Worker vars. The API will return `debugCode` from `/auth/request-code`. Do not use this in production.
