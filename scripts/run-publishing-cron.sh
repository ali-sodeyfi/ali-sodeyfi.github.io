#!/usr/bin/env bash
set -euo pipefail

SITE_ROOT="${SITE_ROOT:-/var/www/ali-sodeyfi/current}"
NODE_BIN="${NODE_BIN:-/usr/bin/node}"
RUNNER_PATH="${RUNNER_PATH:-$SITE_ROOT/scripts/sync-scheduled-publishing.mjs}"
CONTENT_PATH="${CONTENT_PATH:-$SITE_ROOT/content-overrides.json}"

exec "$NODE_BIN" "$RUNNER_PATH" "$CONTENT_PATH"
