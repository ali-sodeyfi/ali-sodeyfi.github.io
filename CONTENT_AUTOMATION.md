# Content Automation

`content-overrides.json` is the source of truth for scheduled publishing.

## Data model

- `translations`: editable site copy.
- `publishing.queue`: dated items with `publishAt`, `channel`, `target`, `articleSlug`, and `status`.

## Primary scheduler

The primary scheduler is the Liara server cron running `scripts/run-publishing-cron.sh`.

It runs every 5 minutes, loads the latest `content-overrides.json`, runs the scheduled publisher, and writes the file back to GitHub when `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`, `GITHUB_BRANCH`, and `CONTENT_PATH` are set on the server. That keeps the repo as the source of truth instead of a local-only copy.

## GitHub Actions fallback

If the server job is unavailable, `.github/workflows/scheduled-content-publish.yml` runs the same publisher on GitHub every 5 minutes and pushes `content-overrides.json` back to the repo.

## Shared runner

- `scripts/sync-scheduled-publishing.mjs` is the shared entrypoint.
- `scripts/publish-scheduled-content.mjs` promotes due items.
- `scripts/run-publishing-cron.sh` is a thin server wrapper that can run the same sync path on Liara or any other host.

## Optional fallback

If you want a second copy of the same job on your server, run:

```bash
bash /var/www/ali-sodeyfi/current/scripts/run-publishing-cron.sh
```

Recommended crontab entry:

```cron
*/5 * * * * bash /var/www/ali-sodeyfi/current/scripts/run-publishing-cron.sh >> /var/log/ali-sodeyfi-publishing.log 2>&1
```

Set `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`, `GITHUB_BRANCH`, and `CONTENT_PATH` on that host if you want the cron job to write back to GitHub instead of only updating the local file.

## Notes

- Site items become `published`.
- Social channels such as LinkedIn and Instagram story are marked `ready` until a real API publisher is connected.
- Keep publish times in `Asia/Tehran`.
