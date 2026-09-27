import { execFileSync } from "node:child_process";

const pagePaths = ["index.html", "en/index.html", "ar/index.html", "articles"];

export function validateSitemapDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) ||
      !Number.isFinite(Date.parse(value)) ||
      new Date(value).toISOString().slice(0, 10) !== value) {
    throw new Error("SITEMAP_LASTMOD must be a valid YYYY-MM-DD date.");
  }
  return value;
}

export function getSitemapDates(siteRoot, buildDate) {
  const git = (args) => execFileSync("git", ["-c", "core.quotepath=false", ...args], {
    cwd: siteRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    maxBuffer: 16 * 1024 * 1024,
  });

  try {
    if (git(["rev-parse", "--is-shallow-repository"]).trim() !== "false") {
      throw new Error("Full Git history is required.");
    }
    const dates = new Map();
    let date;
    const history = git(["log", "--format=date:%cI", "--name-only", "--no-renames", "--", ...pagePaths]);
    for (const line of history.split(/\r?\n/)) {
      if (line.startsWith("date:")) {
        date = new Date(line.slice(5)).toISOString().slice(0, 10);
      } else if (line && date && !dates.has(line)) {
        dates.set(line, date);
      }
    }

    // Run after rendering so source edits and manually edited homepages both count.
    const changed = git(["diff", "--name-only", "--no-renames", "HEAD", "--", ...pagePaths]);
    const added = git(["ls-files", "--others", "--exclude-standard", "--", ...pagePaths]);
    for (const file of `${changed}\n${added}`.split(/\r?\n/).filter(Boolean)) {
      dates.set(file, buildDate);
    }
    return dates;
  } catch {
    console.warn("Sitemap lastmod omitted: complete page history is unavailable.");
    return new Map();
  }
}
