#!/usr/bin/env bash
set -Eeuo pipefail
IFS=$'\n\t'
umask 077

REPO="${ALI_SITE_REPO:-/root/alisodeyfi}"
DEPLOY="${ALI_SITE_DEPLOY:-/opt/sadsalam/scripts/deploy-site-from-repo.sh}"
LOG_DIR="${ALI_SITE_AUDIT_LOG_DIR:-/var/log}"
LOG_FILE="$LOG_DIR/alisodeyfi-monthly-translation-audit.log"
LOCK_FILE="/tmp/alisodeyfi-monthly-translation-audit.lock"
TODAY="$(TZ=Asia/Tehran date +%F)"
FINAL_MESSAGE="$(mktemp)"
CODEX_STDERR="$(mktemp)"

cleanup() {
  rm -f "$FINAL_MESSAGE" "$CODEX_STDERR"
}
trap cleanup EXIT

mkdir -p "$LOG_DIR"
chmod 700 "$LOG_DIR" 2>/dev/null || true
touch "$LOG_FILE"
chmod 600 "$LOG_FILE" 2>/dev/null || true

redact() {
  sed -E \
    -e 's#(token|access_token|api_key|apikey|secret|password|passwd|pwd|authorization)([=: ]+)[^[:space:]&]+#\1\2[redacted]#Ig' \
    -e 's#(https?://[^[:space:]]*([?&](key|token|secret|password|pass|auth)=)[^[:space:]&]+)#URL_WITH_SECRET_REDACTED#Ig'
}

log() {
  printf '[%s] %s\n' "$(date -Is)" "$*"
}

fail() {
  log "FAIL: $*" >&2
  exit 1
}

exec 9>"$LOCK_FILE"
flock -n 9 || exit 0

[[ -d "$REPO/.git" ]] || fail "repository not found: $REPO"
[[ -x "$DEPLOY" ]] || fail "deploy script is not executable: $DEPLOY"

if [[ -n "$(git -C "$REPO" status --short)" ]]; then
  fail "repository is not clean; refusing to touch unrelated changes"
fi

before="$(git -C "$REPO" rev-parse HEAD)"

log "monthly translation audit started repo=$REPO date=$TODAY" | tee -a "$LOG_FILE"

if timeout 1800s codex --ask-for-approval never exec \
  -o "$FINAL_MESSAGE" \
  -C "$REPO" --sandbox workspace-write --skip-git-repo-check - \
  > /dev/null 2>"$CODEX_STDERR" <<'PROMPT'
Perform the complete semantic and technical translation audit for this site repository.

Rules:
- Work only in the current repository. Do not touch /opt/sadsalam or unrelated files.
- First run `node scripts/audit-article-translations.mjs` and use that structured result as the baseline for technical translation integrity.
- Review every article in script.js, content-overrides.json, the generator, and all generated fa/en/ar article pages.
- Compare the three languages semantically using the source metadata and source URLs. Do not copy source articles.
- Make edits only when a real content or technical issue exists. Preserve article-translation-note, article-body, article-takeaways, source links, share, and RTL/LTR structure. Never add an iframe or original-article-frame.
- Keep Persian at least 5 paragraphs and 5 takeaways; keep English and Arabic at least 3 paragraphs and 3 takeaways. Keep the site owner's name out of article body copy.
- Update source data first, then run the generator. Run node --check, JSON validation, page-count checks, and git diff --check.
- Do not commit, push, deploy, print credentials, print config.toml, or write secrets to logs. The wrapper performs commit, push, and deploy after validation.
- Do not print full file contents, script.js, JSON, generated HTML, or full diffs. Keep your final response to 12 lines or fewer.
- If the structured audit passes and your semantic review finds no real issue, leave all files unchanged and reply with `AUDIT_OK` plus one short line of scope.
- If no real issue exists, leave all files unchanged and report that no change was needed.
PROMPT
then
  log "codex audit finished" | tee -a "$LOG_FILE"
  if [[ -s "$FINAL_MESSAGE" ]]; then
    log "codex final message:" | tee -a "$LOG_FILE"
    head -c 12000 "$FINAL_MESSAGE" | redact | tee -a "$LOG_FILE"
    printf '
' | tee -a "$LOG_FILE"
  fi
else
  exit_code=$?
  log "FAIL: codex audit failed with exit code $exit_code" | tee -a "$LOG_FILE" >&2
  if [[ -s "$CODEX_STDERR" ]]; then
    log "codex stderr (truncated):" | tee -a "$LOG_FILE" >&2
    head -c 4000 "$CODEX_STDERR" | redact | tee -a "$LOG_FILE" >&2
    printf '
' | tee -a "$LOG_FILE" >&2
  fi
  exit "$exit_code"
fi

changed_files="$(git -C "$REPO" diff --name-only; git -C "$REPO" ls-files --others --exclude-standard)"
if [[ -z "$changed_files" ]]; then
  log "no real changes; no commit needed" | tee -a "$LOG_FILE"
  exit 0
fi

while IFS= read -r file; do
  [[ -z "$file" ]] && continue
  case "$file" in
    script.js|content-overrides.json|scripts/generate-article-pages.mjs|sitemap.xml|index.html|en/index.html|ar/index.html|reports/*|articles/*/fa/index.html|articles/*/en/index.html|articles/*/ar/index.html)
      ;;
    *)
      fail "unexpected changed path: $file"
      ;;
  esac
done <<< "$changed_files"

if git -C "$REPO" diff --name-only | rg -q '^(script\.js|content-overrides\.json|scripts/generate-article-pages\.mjs)$'; then
  node "$REPO/scripts/generate-article-pages.mjs" | redact | tee -a "$LOG_FILE"
fi

node --check "$REPO/script.js" >/dev/null
node --check "$REPO/scripts/generate-article-pages.mjs" >/dev/null
node -e "JSON.parse(require('fs').readFileSync('$REPO/content-overrides.json', 'utf8'))" >/dev/null
git -C "$REPO" diff --check

article_count="$(find "$REPO/articles" -mindepth 1 -maxdepth 1 -type d | wc -l)"
page_count="$(find "$REPO/articles" -mindepth 3 -maxdepth 3 -type f -name index.html | wc -l)"
[[ "$article_count" == 39 ]] || fail "expected 39 article directories, found $article_count"
[[ "$page_count" == 117 ]] || fail "expected 117 article pages, found $page_count"

git -C "$REPO" add script.js content-overrides.json scripts/generate-article-pages.mjs sitemap.xml index.html en/index.html ar/index.html reports articles
git -C "$REPO" diff --cached --check
git -C "$REPO" commit -m "Audit and refine article translations - $TODAY" | redact | tee -a "$LOG_FILE"
git -C "$REPO" push origin main | redact | tee -a "$LOG_FILE"
bash "$DEPLOY" | redact | tee -a "$LOG_FILE"

after="$(git -C "$REPO" rev-parse HEAD)"
log "monthly translation audit completed before=${before:0:12} after=${after:0:12} articles=$article_count pages=$page_count" | tee -a "$LOG_FILE"
