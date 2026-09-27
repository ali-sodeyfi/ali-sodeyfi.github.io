import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";
import { getSitemapDates, validateSitemapDate } from "./sitemap-dates.mjs";

function fixture() {
  const root = mkdtempSync(join(tmpdir(), "sitemap-dates-test-"));
  const git = (args, date = "2026-09-20T12:00:00Z") => execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date },
  });
  git(["init", "--quiet"]);
  git(["config", "user.name", "Sitemap Test"]);
  git(["config", "user.email", "sitemap-test@example.invalid"]);
  git(["config", "core.autocrlf", "false"]);
  mkdirSync(join(root, "articles/example/fa"), { recursive: true });
  writeFileSync(join(root, "index.html"), "<h1>Home</h1>\n");
  writeFileSync(join(root, "articles/example/fa/index.html"), "<h1>Example</h1>\n");
  git(["add", "."]);
  git(["commit", "--quiet", "-m", "Initial content"]);
  return { root, git };
}

test("unchanged pages retain their own dates across build days and unrelated commits", () => {
  const { root, git } = fixture();
  writeFileSync(join(root, "index.html"), "<h1>Updated home</h1>\n");
  git(["add", "index.html"]);
  git(["commit", "--quiet", "-m", "Home update"], "2026-09-23T12:00:00Z");
  writeFileSync(join(root, "styles.css"), "body { color: black; }\n");
  git(["add", "styles.css"]);
  git(["commit", "--quiet", "-m", "Style update"], "2026-09-25T12:00:00Z");
  const first = getSitemapDates(root, "2026-09-27");
  assert.equal(first.get("index.html"), "2026-09-23");
  assert.equal(first.get("articles/example/fa/index.html"), "2026-09-20");
  assert.deepEqual(first, getSitemapDates(root, "2026-09-28"));
});

test("staged, unstaged and new pages receive the build date without changing other pages", () => {
  const { root, git } = fixture();
  writeFileSync(join(root, "index.html"), "<h1>Uncommitted home</h1>\n");
  let dates = getSitemapDates(root, "2026-09-27");
  assert.equal(dates.get("index.html"), "2026-09-27");
  assert.equal(dates.get("articles/example/fa/index.html"), "2026-09-20");
  git(["add", "index.html"]);
  mkdirSync(join(root, "en"));
  writeFileSync(join(root, "en/index.html"), "<h1>English home</h1>\n");
  dates = getSitemapDates(root, "2026-09-27");
  assert.equal(dates.get("index.html"), "2026-09-27");
  assert.equal(dates.get("en/index.html"), "2026-09-27");
  assert.equal(dates.get("articles/example/fa/index.html"), "2026-09-20");
});

test("archives without Git history omit dates instead of inventing freshness", () => {
  const root = mkdtempSync(join(tmpdir(), "sitemap-archive-test-"));
  assert.equal(getSitemapDates(root, "2026-09-27").size, 0);
});

test("shallow clones omit dates because the boundary commit is not a page timestamp", () => {
  const { root, git } = fixture();
  const clone = mkdtempSync(join(tmpdir(), "sitemap-shallow-test-"));
  git(["clone", "--quiet", "--depth=1", pathToFileURL(root).href, clone]);
  assert.equal(getSitemapDates(clone, "2026-09-27").size, 0);
});

test("date overrides reject invalid and injected XML values", () => {
  assert.equal(validateSitemapDate("2024-02-29"), "2024-02-29");
  for (const value of ["2026-02-29", "2026-09-31", "2026-9-1", "", "2026-09-27</lastmod>"]) {
    assert.throws(() => validateSitemapDate(value), /valid YYYY-MM-DD/);
  }
});
