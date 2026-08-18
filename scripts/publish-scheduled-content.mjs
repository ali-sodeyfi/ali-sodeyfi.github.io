#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const externalChannels = new Set([
  "linkedin",
  "instagram-post",
  "instagram-story",
]);

function getNextStatus(item) {
  if (item.status !== "scheduled") {
    return item.status;
  }

  if (item.target === "external" || externalChannels.has(item.channel)) {
    return "ready";
  }

  return "published";
}

function isDue(item, now) {
  if (!item || item.status !== "scheduled" || !item.publishAt) {
    return false;
  }

  const publishTime = Date.parse(item.publishAt);

  return !Number.isNaN(publishTime) && publishTime <= now.getTime();
}

function publishDueItems(content, now = new Date()) {
  const queue = Array.isArray(content?.publishing?.queue)
    ? content.publishing.queue
    : [];
  let changed = false;
  let dueCount = 0;

  queue.forEach((item) => {
    if (!isDue(item, now)) {
      return;
    }

    const nextStatus = getNextStatus(item);

    item.status = nextStatus;

    if (nextStatus === "published") {
      item.publishedAt ??= item.publishAt;
    }

    if (nextStatus === "ready") {
      item.readyAt ??= item.publishAt;
    }

    dueCount += 1;
    changed = true;
  });

  if (changed) {
    content.updatedAt = now.toISOString();
  }

  return { changed, dueCount };
}

async function main() {
  const filePath = resolve(process.argv[2] ?? "content-overrides.json");
  const original = await readFile(filePath, "utf8");
  const content = JSON.parse(original);
  const result = publishDueItems(content);

  if (!result.changed) {
    console.log("No scheduled publishing items are due.");
    return;
  }

  const next = `${JSON.stringify(content, null, 2)}\n`;

  if (next !== original) {
    await writeFile(filePath, next, "utf8");
  }

  console.log(`Updated ${result.dueCount} due publishing item(s).`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
