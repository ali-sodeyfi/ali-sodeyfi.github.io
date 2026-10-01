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
