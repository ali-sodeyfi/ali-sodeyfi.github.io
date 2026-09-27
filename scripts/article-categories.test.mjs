import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const source = await readFile(new URL("script.js", root), "utf8");
const start = source.indexOf("const articleCategories =");
const end = source.indexOf("const articleEssays =");
assert(start > 0 && end > start, "Article data declarations must exist");
const data = vm.runInNewContext(
  source.slice(start, end) + ";({ articleCategories, articleCatalog })",
);
const { articleCategories, articleCatalog } = data;
const categoryIds = new Set(articleCategories.map((category) => category.id));

test("topic IDs are unique and every topic is named in all three languages", () => {
  assert.equal(categoryIds.size, articleCategories.length);
  assert(!categoryIds.has("all"), "all is reserved for the reset filter");
  for (const category of articleCategories) {
    assert.match(category.id, /^[a-z]+$/);
    for (const language of ["fa", "en", "ar"]) {
      assert(category.label[language]?.trim());
    }
  }
});

test("every article has exactly one valid topic and no topic is empty", () => {
  for (const article of articleCatalog) {
    assert(categoryIds.has(article.category), article.title);
  }
  const counts = articleCategories.map((category) =>
    articleCatalog.filter((article) => article.category === category.id).length,
  );
  assert(counts.every((count) => count > 0));
  assert.equal(counts.reduce((sum, count) => sum + count, 0), articleCatalog.length);
});

for (const language of ["fa", "en", "ar"]) {
  test(`generated ${language} homepage retains every article and its topic without JavaScript`, async () => {
    const path = language === "fa" ? "index.html" : `${language}/index.html`;
    const html = await readFile(new URL(path, root), "utf8");
    const archive = html.split("<!-- STATIC_ARTICLE_LINKS_START -->")[1]
      ?.split("<!-- STATIC_ARTICLE_LINKS_END -->")[0];
    assert(archive);
    assert.equal((archive.match(/data-article-topic="/g) ?? []).length, articleCatalog.length);
    for (const category of articleCategories) {
      const count = articleCatalog.filter((article) => article.category === category.id).length;
      assert.equal(archive.split(`data-article-topic="${category.id}"`).length - 1, count);
      const label = category.label[language].replaceAll("&", "&amp;");
      assert.equal(archive.split(`class="article-category-label">${label}</span>`).length - 1, count);
    }
    assert.equal((archive.match(new RegExp(`/articles/[^"]+/${language}/"`, "g")) ?? []).length, articleCatalog.length * 2);
    assert(!archive.includes("undefined"));
  });
}
