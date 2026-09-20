#!/usr/bin/env node

import { readFile, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const siteRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const scriptPath = join(siteRoot, "script.js");
const articleRoot = join(siteRoot, "articles");
const languages = ["fa", "en", "ar"];
const ownerNamePattern = /علی\s*سدیفی|علي\s*السديفي|ali\s*sodeyfi/i;

function fail(message) {
  throw new Error(message);
}

async function loadData() {
  const source = await readFile(scriptPath, "utf8");
  const runtimeSource = source.replace(/initializeSite\(\);\s*$/s, "") + `
globalThis.__articleAuditData = { articleCatalog, articleEssays, getArticleSlug };
`;
  const noop = () => {};
  const emptyElement = {
    dataset: {},
    textContent: "",
    setAttribute: noop,
    getAttribute: () => null,
  };
  const context = {
    console,
    Date,
    Intl,
    URL,
    URLSearchParams,
    document: {
      documentElement: { lang: "fa", dir: "rtl" },
      querySelector: () => null,
      querySelectorAll: () => [],
      getElementById: () => null,
      createElement: () => emptyElement,
    },
    window: {
      location: { search: "", href: "https://alisodeyfi.ir/" },
      history: {},
      addEventListener: noop,
    },
    localStorage: { getItem: () => null, setItem: noop },
    navigator: {},
    fetch: async () => ({ ok: false }),
    setTimeout,
    requestAnimationFrame: noop,
    Element: class Element {},
  };

  vm.runInNewContext(runtimeSource, context, { filename: scriptPath });
  return context.__articleAuditData;
}

async function main() {
  const data = await loadData();
  const errors = [];
  const titles = new Set();
  const urls = new Set();
  const slugs = new Set();

  for (const article of data.articleCatalog) {
    if (!article.title || titles.has(article.title)) errors.push(`duplicate/missing title: ${article.title}`);
    if (!article.url || urls.has(article.url)) errors.push(`duplicate/missing source URL: ${article.title}`);
    const slug = data.getArticleSlug(article);
    if (!slug || slugs.has(slug)) errors.push(`duplicate/missing slug: ${article.title}`);
    titles.add(article.title);
    urls.add(article.url);
    slugs.add(slug);

    const essays = data.articleEssays[article.title];
    if (!essays) {
      errors.push(`missing essays: ${article.title}`);
      continue;
    }
    for (const language of languages) {
      const essay = essays[language];
      if (!essay) {
        errors.push(`missing ${language} essay: ${article.title}`);
        continue;
      }
      const paragraphs = Array.isArray(essay.paragraphs) ? essay.paragraphs : [];
      const takeaways = Array.isArray(essay.takeaways) ? essay.takeaways : [];
      const minimumParagraphs = language === "fa" ? 5 : 3;
      const minimumTakeaways = language === "fa" ? 5 : 3;
      if (paragraphs.length < minimumParagraphs) errors.push(`${language} paragraphs < ${minimumParagraphs}: ${article.title}`);
      if (language === "fa" && paragraphs.length > 13) errors.push(`fa paragraphs > 13: ${article.title}`);
      if (takeaways.length < minimumTakeaways) errors.push(`${language} takeaways < ${minimumTakeaways}: ${article.title}`);
      const body = [...paragraphs, ...takeaways, ...(essay.advice ?? [])].join(" ");
      if (ownerNamePattern.test(body)) errors.push(`owner name in ${language} body: ${article.title}`);
    }
  }

  const expectedPages = data.articleCatalog.length * languages.length;
  const pageFiles = [];
  for (const article of data.articleCatalog) {
    const slug = data.getArticleSlug(article);
    for (const language of languages) {
      const pagePath = join(articleRoot, slug, language, "index.html");
      pageFiles.push(pagePath);
      let html;
      try {
        html = await readFile(pagePath, "utf8");
      } catch {
        errors.push(`missing generated page: ${slug}/${language}`);
        continue;
      }
      const bodyMatch = html.match(/<section class="article-body[\s\S]*?<div class="article-takeaways"[\s\S]*?<\/div>/i);
      const body = bodyMatch?.[0] ?? "";
      if (!html.includes('class="article-translation-note"')) errors.push(`missing translation note: ${slug}/${language}`);
      if (!html.includes('class="article-takeaways"')) errors.push(`missing takeaways: ${slug}/${language}`);
      if (!html.includes(article.url)) errors.push(`missing source link: ${slug}/${language}`);
      if (html.includes("original-article-reader") || /<iframe\b/i.test(html)) errors.push(`forbidden reader/iframe: ${slug}/${language}`);
      if (ownerNamePattern.test(body)) errors.push(`owner name in rendered body: ${slug}/${language}`);
    }
  }

  const articleDirs = await readdir(articleRoot, { withFileTypes: true }).catch(() => []);
  const generatedPageCount = articleDirs
    .filter((entry) => entry.isDirectory())
    .reduce(async (countPromise, entry) => {
      const count = await countPromise;
      const languageDirs = await readdir(join(articleRoot, entry.name), { withFileTypes: true }).catch(() => []);
      return count + languageDirs.filter((language) => language.isDirectory()).length;
    }, Promise.resolve(0));
  const actualPageCount = await generatedPageCount;
  if (actualPageCount !== expectedPages) errors.push(`generated page count ${actualPageCount} != ${expectedPages}`);

  const result = {
    articles: data.articleCatalog.length,
    languages,
    expectedPages,
    generatedPages: actualPageCount,
    errors,
    ok: errors.length === 0,
  };
  console.log(JSON.stringify(result, null, 2));
  if (errors.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(JSON.stringify({ ok: false, errors: [error.message] }, null, 2));
  process.exitCode = 1;
});
