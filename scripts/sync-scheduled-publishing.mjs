#!/usr/bin/env node

import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const DEFAULT_BRANCH = "main";
const DEFAULT_CONTENT_PATH = "content-overrides.json";
const githubToken = process.env.GITHUB_TOKEN?.trim() ?? "";
const githubOwner = process.env.GITHUB_OWNER?.trim() ?? "";
const githubRepo = process.env.GITHUB_REPO?.trim() ?? "";
const githubBranch = process.env.GITHUB_BRANCH?.trim() || DEFAULT_BRANCH;
const githubContentPath = process.env.CONTENT_PATH?.trim() || DEFAULT_CONTENT_PATH;
const publisherPath = fileURLToPath(new URL("./publish-scheduled-content.mjs", import.meta.url));

const remoteMode = Boolean(githubToken && githubOwner && githubRepo);

async function main() {
  if (remoteMode) {
    await syncRemoteContent();
    return;
  }

  const filePath = resolve(process.argv[2] ?? DEFAULT_CONTENT_PATH);
  const result = spawnSync(process.execPath, [publisherPath, filePath], {
    stdio: "inherit",
  });

  if (result.status !== 0) {
    throw new Error("Scheduled publishing runner failed.");
  }
}

async function syncRemoteContent() {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const { sha, text } = await readGithubContent();
    const tempDir = await mkdtemp(join(tmpdir(), "ali-sodeyfi-publishing-"));
    const tempFile = join(tempDir, "content-overrides.json");

    try {
      await writeFile(tempFile, text, "utf8");

      const result = spawnSync(process.execPath, [publisherPath, tempFile], {
        stdio: "inherit",
      });

      if (result.status !== 0) {
        throw new Error("Scheduled publishing runner failed.");
      }

      const updated = await readFile(tempFile, "utf8");

      if (updated === text) {
        console.log("No scheduled publishing items are due.");
        return;
      }

      try {
        await writeGithubContent(updated, sha);
        console.log("Updated content-overrides.json on GitHub.");
        return;
      } catch (error) {
        if (isRetryableGithubError(error) && attempt < maxAttempts) {
          console.log("Remote content changed while publishing. Retrying with the latest revision...");
          continue;
        }

        throw error;
      }
    } finally {
      await rm(tempDir, { recursive: true, force: true });
    }
  }
}

async function readGithubContent() {
  const response = await fetch(
    `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${encodePath(githubContentPath)}?ref=${encodeURIComponent(githubBranch)}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${githubToken}`,
        "User-Agent": "ali-sodeyfi-site-publishing",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message ?? "GitHub content download failed.");
  }

  const content = String(payload.content ?? "").replace(/\n/g, "");
  const sha = String(payload.sha ?? "").trim();

  if (!sha || !content) {
    throw new Error("GitHub content download returned an empty file.");
  }

  return {
    sha,
    text: Buffer.from(content, "base64").toString("utf8"),
  };
}

async function writeGithubContent(text, sha) {
  const response = await fetch(
    `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${encodePath(githubContentPath)}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${githubToken}`,
        "Content-Type": "application/json",
        "User-Agent": "ali-sodeyfi-site-publishing",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({
        message: `Run scheduled publishing - ${new Date().toISOString()}`,
        content: Buffer.from(text, "utf8").toString("base64"),
        sha,
        branch: githubBranch,
      }),
    },
  );

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    const error = new Error(payload.message ?? "GitHub content upload failed.");
    error.retryable = response.status === 409 || response.status === 422;
    throw error;
  }
}

function isRetryableGithubError(error) {
  return Boolean(error && typeof error === "object" && error.retryable);
}

function encodePath(value) {
  return String(value)
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
