import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const source = await readFile(new URL("script.js", root), "utf8");
const dataStart = source.indexOf("const articleCategories =");
const dataEnd = source.indexOf("const articleEssays =");
const matchStart = source.indexOf("const advisorCategoryCues =");
const matchEnd = source.indexOf("function appendAdvisorMessage");
assert(dataStart > 0 && dataEnd > dataStart && matchStart > dataEnd && matchEnd > matchStart);

const { articleCatalog, rankAdvisorArticles } = vm.runInNewContext(
  `${source.slice(dataStart, dataEnd)}\n${source.slice(matchStart, matchEnd)}\n({ articleCatalog, rankAdvisorArticles })`,
);

test("matches a Persian idea-validation challenge to idea articles", () => {
  const results = rankAdvisorArticles("نمی دانم ایده ام را چطور اعتبارسنجی کنم");
  assert.equal(results.length, 3);
  assert.equal(results[0].article.category, "ideas");
});

test("matches funding and team challenges to their topics", () => {
  assert.equal(rankAdvisorArticles("برای جذب سرمایه و تقسیم سهام مشکل داریم")[0].article.category, "funding");
  assert.equal(rankAdvisorArticles("تیم ما در تمرکز و اولویت بندی اختلاف دارد")[0].article.category, "leadership");
});

test("prioritizes first-customer guidance over general startup advice", () => {
  const results = rankAdvisorArticles("مشتری پیدا نمی کنم و نمی دانم از کجا شروع کنم");
  assert.equal(results[0].article.title, "How to Get Your First Customers");
  assert.equal(rankAdvisorArticles("كيف أجد العملاء الأوائل؟")[0].article.title, "How to Get Your First Customers");
});

test("recognizes English and Arabic phrasing without changing the article corpus", () => {
  assert.equal(rankAdvisorArticles("How can I validate my idea with users?")[0].article.category, "ideas");
  assert.equal(rankAdvisorArticles("كيف أقنع المستثمرين بجمع التمويل؟")[0].article.category, "funding");
  assert(articleCatalog.length > 50);
});

test("does not invent a match for empty or unrelated input", () => {
  assert.equal(rankAdvisorArticles(" ").length, 0);
  assert.equal(rankAdvisorArticles("weather forecast tomorrow").length, 0);
});

for (const language of ["fa", "en", "ar"]) {
  test(`${language} homepage contains the advisor form`, async () => {
    const path = language === "fa" ? "index.html" : `${language}/index.html`;
    const html = await readFile(new URL(path, root), "utf8");
    assert.match(html, /data-article-advisor/);
    assert.match(html, /data-advisor-form/);
    assert.match(html, /data-advisor-input/);
    assert.match(html, /data-advisor-log/);
    assert.match(html, /<button[^>]+type="button"[^>]+data-advisor-submit/);
  });
}
