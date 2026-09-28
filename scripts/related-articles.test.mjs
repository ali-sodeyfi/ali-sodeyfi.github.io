import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { relatedArticleGroups } from "./related-articles.mjs";

const siteRoot = new URL("../", import.meta.url);
const languages = ["fa", "en", "ar"];
const allSlugs = relatedArticleGroups.flatMap((group) => group.map((item) => item.slug));

test("curated reading groups are disjoint and translated", () => {
  assert.equal(new Set(allSlugs).size, allSlugs.length);
  for (const group of relatedArticleGroups) {
    assert(group.length >= 2);
    for (const item of group) {
      for (const language of languages) {
        assert(item.titles[language]?.trim(), `${item.slug}: ${language}`);
      }
    }
  }
});

for (const group of relatedArticleGroups) {
  for (const language of languages) {
    test(`${group[0].slug} reading path is complete in ${language}`, async () => {
      for (const item of group) {
        const path = `articles/${item.slug}/${language}/index.html`;
        const html = await readFile(new URL(path, siteRoot), "utf8");
        const related = html.split('<nav class="article-related"')[1]?.split("</nav>")[0];
        assert(related, path);
        assert.equal((related.match(/<li>/g) ?? []).length, group.length - 1, path);
        for (const target of group) {
          const link = `href="https://alisodeyfi.ir/articles/${target.slug}/${language}/"`;
          assert.equal(related.includes(link), target.slug !== item.slug, path);
        }
      }
    });
  }
}
