import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

test("the product-market fit article has a specific English search title and description", async () => {
  const html = await readFile(
    new URL("../articles/the-only-thing-that-matters/en/index.html", import.meta.url),
    "utf8",
  );
  const title = "The Only Thing that Matters | Marc Andreessen on Product-Market Fit";
  const description = "A concise adaptation of Marc Andreessen&#039;s essay on product-market fit: why market pull matters more than product polish, and which user signals to watch.";

  assert(html.includes(`<title>${title}</title>`));
  assert(html.includes(`<meta name="description" content="${description}" />`));
  assert(html.includes(`<meta property="og:title" content="${title}" />`));
  assert(html.includes(`<meta name="twitter:description" content="${description}" />`));
  assert(html.includes('"@type":"Article"'));
});

test("bus ticket article describes curiosity rather than spare-time scheduling in every language", async () => {
  const expectations = {
    fa: ["نظریه بلیت اتوبوس و نبوغ", "بلیت‌های قدیمی را با اشتیاق جمع می‌کنند"],
    en: ["The Bus Ticket Theory of Genius | Paul Graham&#039;s Idea", "not a metaphor for using spare minutes"],
    ar: ["نظرية تذكرة الحافلة والعبقرية", "ليست استعارة لاستغلال الدقائق المتفرقة"],
  };

  for (const [language, phrases] of Object.entries(expectations)) {
    const html = await readFile(
      new URL(`../articles/the-bus-ticket-theory-of-genius/${language}/index.html`, import.meta.url),
      "utf8",
    );

    for (const phrase of phrases) {
      assert(html.includes(phrase), `${language} page is missing: ${phrase}`);
    }
    assert(html.includes('<meta name="description" content='));
    assert(html.includes('class="article-page-meta"'));
    assert(html.includes('class="article-takeaways"'));
    assert(!html.includes("short windows of deep focus"));
  }
});
