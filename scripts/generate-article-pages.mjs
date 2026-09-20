#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const siteRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const siteUrl = "https://alisodeyfi.ir";
const scriptPath = join(siteRoot, "script.js");
const articleRoot = join(siteRoot, "articles");
const sitemapPath = join(siteRoot, "sitemap.xml");
const stylesheetVersion = "20260920-article-feedback";
const feedbackEmail = "Sodeyfi.ali@gmail.com";

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return entities[character];
  });
}

function escapeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function cleanTrailingWhitespace(value) {
  return value.replace(/[ \t]+$/gm, "");
}

function getSiteData(source) {
  const runtimeSource = source.replace(/initializeSite\(\);\s*$/s, "") + `
globalThis.__articlePageData = {
  articleCatalog,
  articleEssays,
  defaultArticleEssay,
  articleEssayExpansion,
  translations,
  getArticleSlug,
};
`;

  const emptyElement = {
    dataset: {},
    textContent: "",
    setAttribute() {},
    getAttribute() {
      return null;
    },
  };
  const documentElement = { lang: "fa", dir: "rtl" };
  const document = {
    documentElement,
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
    getElementById() {
      return null;
    },
    createElement() {
      return emptyElement;
    },
  };
  const window = {
    location: { search: "", href: `${siteUrl}/` },
    history: {},
    addEventListener() {},
  };

  const context = {
    console,
    Date,
    Intl,
    URL,
    URLSearchParams,
    document,
    window,
    localStorage: {
      getItem() {
        return null;
      },
      setItem() {},
    },
    navigator: {},
    fetch: async () => ({ ok: false }),
    setTimeout,
    requestAnimationFrame() {},
    Element: class Element {},
  };

  vm.runInNewContext(runtimeSource, context, { filename: scriptPath });

  return context.__articlePageData;
}

function getEssay(data, article, language) {
  const essay =
    data.articleEssays[article.title]?.[language] ??
    data.defaultArticleEssay[language] ??
    data.defaultArticleEssay.en;
  const paragraphs = [...(essay.paragraphs ?? [])];
  const takeaways = [...(essay.takeaways ?? [])];
  const advice = [...(essay.advice ?? [])];
  const minimumParagraphs = language === "fa" ? 5 : 4;
  const minimumTakeaways = language === "fa" ? 5 : 4;
  const expansion = data.articleEssayExpansion[language] ?? data.articleEssayExpansion.en;

  while (paragraphs.length < minimumParagraphs && expansion.paragraphs.length > 0) {
    const offset = paragraphs.length - (essay.paragraphs?.length ?? 0);
    paragraphs.push(expansion.paragraphs[offset % expansion.paragraphs.length](article));
  }

  while (takeaways.length < minimumTakeaways && expansion.takeaways.length > 0) {
    const offset = takeaways.length - (essay.takeaways?.length ?? 0);
    takeaways.push(expansion.takeaways[offset % expansion.takeaways.length](article));
  }

  return { paragraphs, takeaways, advice };
}

function renderParagraphs(paragraphs) {
  return paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("\n");
}

function renderAdvice(advice, label) {
  if (!advice.length) {
    return "";
  }

  return `
        <div class="article-advice">
          <p class="article-section-label">${escapeHtml(label)}</p>
          <ol>${advice.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
        </div>`;
}

function renderTakeaways(takeaways, label) {
  return `
        <div class="article-takeaways">
          <p class="article-section-label">${escapeHtml(label)}</p>
          <ul>${takeaways.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </div>`;
}

function renderArticleFeedback(data, article, language) {
  const dictionary = data.translations[language] ?? data.translations.fa;
  const slug = data.getArticleSlug(article);
  const feedbackUrl = getArticleUrl(slug, language);
  const feedbackKey = `article-feedback:${slug}:${language}`;
  const choices = [
    ["useful", dictionary.articleFeedbackUseful],
    ["question", dictionary.articleFeedbackQuestion],
    ["disagree", dictionary.articleFeedbackDisagree],
  ];

  return `
        <section class="article-feedback" data-article-feedback data-feedback-key="${escapeHtml(feedbackKey)}" data-feedback-title="${escapeHtml(article.title)}" data-feedback-url="${escapeHtml(feedbackUrl)}" aria-labelledby="article-feedback-title">
          <p class="article-section-label">${escapeHtml(dictionary.articleFeedbackLabel ?? "")}</p>
          <h3 id="article-feedback-title">${escapeHtml(dictionary.articleFeedbackTitle ?? "")}</h3>
          <p class="article-feedback-intro">${escapeHtml(dictionary.articleFeedbackIntro ?? "")}</p>
          <div class="article-feedback-reactions" role="group" aria-label="${escapeHtml(dictionary.articleFeedbackTitle ?? "")}">
            ${choices
              .map(
                ([value, label]) => `
              <button class="article-feedback-choice" type="button" data-feedback-choice="${value}" aria-pressed="false">${escapeHtml(label)}</button>`,
              )
              .join("")}
          </div>
          <form class="article-feedback-form" data-article-feedback-form action="mailto:${feedbackEmail}" method="post">
            <label class="article-feedback-field">
              <span>${escapeHtml(dictionary.articleFeedbackPlaceholder ?? "")}</span>
              <textarea name="message" data-feedback-message rows="4" placeholder="${escapeHtml(dictionary.articleFeedbackPlaceholder ?? "")}"></textarea>
            </label>
            <div class="article-feedback-form-footer">
              <span class="article-feedback-email-hint">${escapeHtml(dictionary.articleFeedbackEmailHint ?? "")}</span>
              <button class="button primary" type="submit">${escapeHtml(dictionary.articleFeedbackSubmit ?? "")}</button>
            </div>
            <p class="article-feedback-status" data-feedback-status aria-live="polite"></p>
          </form>
        </section>`;
}

function getArticleUrl(slug, language) {
  return `${siteUrl}/articles/${slug}/${language}/`;
}

function getArticleCredit(article) {
  const parts =
    article.source === article.author
      ? [article.source, article.year]
      : [article.source, article.author, article.year];

  return parts.join(" · ");
}

function getPageTitle(article, language, dictionary) {
  if (language === "fa") {
    return `${article.title} | ترجمه و برداشت آزاد`;
  }

  if (language === "ar") {
    return `${article.title} | ترجمة وملاحظات`;
  }

  return `${article.title} | Notes on building`;
}

function getBrandSubtitle(language) {
  if (language === "fa") {
    return "یادداشت‌هایی درباره ساختن";
  }

  if (language === "ar") {
    return "ملاحظات عن البناء";
  }

  return "Notes on building";
}

function getPageHtml(data, article, language) {
  const dictionary = data.translations[language] ?? data.translations.fa;
  const essay = getEssay(data, article, language);
  const slug = data.getArticleSlug(article);
  const canonicalUrl = getArticleUrl(slug, language);
  const title = getPageTitle(article, language, dictionary);
  const description = article.summary[language] ?? article.summary.en;
  const direction = language === "en" ? "ltr" : "rtl";
  const sourceLabel = dictionary.articleReadLabel ?? "Original source";
  const homeLabel =
    language === "fa"
      ? "بازگشت به همه مقاله‌ها"
      : language === "ar"
        ? "العودة إلى كل المقالات"
        : "Back to all articles";
  const translationLabel = dictionary.articleOnSiteLabel ?? "Translation and notes";
  const shareLabel = dictionary.articleShareLabel ?? "Share";
  const shareSuccess = dictionary.articleShareSuccess ?? "Article link copied.";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Person",
      name: "Ali Sodeyfi",
      url: siteUrl,
    },
    isBasedOn: article.url,
    mainEntityOfPage: canonicalUrl,
    inLanguage: language,
    about: article.tags[language] ?? article.tags.en,
  };
  const alternateLinks = ["fa", "en", "ar", "x-default"]
    .map(
      (alternateLanguage) => {
        const href =
          alternateLanguage === "x-default"
            ? getArticleUrl(slug, "fa")
            : getArticleUrl(slug, alternateLanguage);
        return `<link rel="alternate" hreflang="${alternateLanguage}" href="${href}" />`;
      },
    )
    .join("\n    ");

  return `<!doctype html>
<html lang="${language}" dir="${direction}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${canonicalUrl}" />
    ${alternateLinks}
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:site_name" content="Ali Sodeyfi" />
    <meta property="og:image" content="${siteUrl}/assets/ali-sodeyfi.jpg" />
    <meta property="og:locale" content="${language === "fa" ? "fa_IR" : language === "ar" ? "ar" : "en_US"}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${siteUrl}/assets/ali-sodeyfi.jpg" />
    <title>${escapeHtml(title)}</title>
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="/styles.css?v=${stylesheetVersion}" />
    <link rel="stylesheet" href="/article-page.css?v=${stylesheetVersion}" />
    <script type="application/ld+json">${escapeJsonLd(structuredData)}</script>
  </head>
  <body class="article-page">
    <header class="article-page-header">
      <a class="article-page-brand" href="/?lang=${language}" aria-label="Ali Sodeyfi">
        <span class="article-page-brand-mark">AS</span>
        <span>
          <strong>Ali Sodeyfi</strong>
          <small>${escapeHtml(getBrandSubtitle(language))}</small>
        </span>
      </a>
      <nav class="article-page-languages" aria-label="Language">
        <a href="${getArticleUrl(slug, "fa")}"${language === "fa" ? ' aria-current="page"' : ""}>FA</a>
        <a href="${getArticleUrl(slug, "en")}"${language === "en" ? ' aria-current="page"' : ""}>EN</a>
        <a href="${getArticleUrl(slug, "ar")}"${language === "ar" ? ' aria-current="page"' : ""}>AR</a>
      </nav>
    </header>

    <main class="article-page-main">
      <article class="article-page-card" aria-labelledby="article-page-title">
        <div class="article-page-topline">
          <span>${escapeHtml(translationLabel)}</span>
          <span>${escapeHtml(getArticleCredit(article))}</span>
        </div>

        <header class="article-page-hero" id="daily-article-reader">
          <div class="article-page-heading-row">
            <div>
              <p class="article-kicker">${escapeHtml(dictionary.articleSelectedLabel ?? "Selected translation")}</p>
              <h1 id="article-page-title" class="article-title" dir="ltr">${escapeHtml(article.title)}</h1>
            </div>
            <button class="article-share-button article-page-share" type="button" aria-label="${escapeHtml(shareLabel)}" title="${escapeHtml(shareLabel)}">
              <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <path d="m8.59 13.51 6.83 3.98"></path>
                <path d="m15.41 6.51-6.82 3.98"></path>
              </svg>
            </button>
          </div>
          <p class="article-page-summary">${escapeHtml(description)}</p>
          <div class="article-page-meta">
            <span>${escapeHtml(article.author)}</span>
            <span>${escapeHtml(article.source)}</span>
            <span>${escapeHtml(article.year)}</span>
          </div>
          <div class="article-page-actions">
            <a class="button primary" href="${escapeHtml(article.url)}" target="_blank" rel="noreferrer">${escapeHtml(sourceLabel)}</a>
            <a class="button" href="/?lang=${language}#articles">${escapeHtml(homeLabel)}</a>
          </div>
          <p class="article-page-status" aria-live="polite"></p>
        </header>

        <section class="article-body article-page-body" id="article-body">
          <p class="article-section-label">${escapeHtml(translationLabel)}</p>
          <p class="article-translation-note">${escapeHtml(dictionary.articleTranslationNote ?? "")}</p>
          ${renderParagraphs(essay.paragraphs)}
          ${renderAdvice(essay.advice, dictionary.articleAdviceLabel ?? "")}
          ${renderTakeaways(essay.takeaways, dictionary.articleTakeawaysLabel ?? "")}
          ${renderArticleFeedback(data, article, language)}
          <p class="article-note">${escapeHtml(dictionary.articleCopyrightNote ?? "")}</p>
        </section>
      </article>
    </main>

    <footer class="article-page-footer">
      <a href="/?lang=${language}#articles">Ali Sodeyfi</a>
      <span>${escapeHtml(dictionary.footerText ?? getBrandSubtitle(language))}</span>
    </footer>

    <script>
      const shareButton = document.querySelector(".article-page-share");
      const status = document.querySelector(".article-page-status");
      const shareUrl = ${JSON.stringify(`${canonicalUrl}#daily-article-reader`)};
      shareButton?.addEventListener("click", async () => {
        try {
          if (navigator.share) {
            await navigator.share({ title: ${JSON.stringify(article.title)}, text: ${JSON.stringify(dictionary.articleShareText ?? article.title)}, url: shareUrl });
          } else {
            await navigator.clipboard.writeText(shareUrl);
          }
          if (status) status.textContent = ${JSON.stringify(shareSuccess)};
        } catch (error) {
          if (error?.name === "AbortError") return;
          try {
            await navigator.clipboard.writeText(shareUrl);
            if (status) status.textContent = ${JSON.stringify(shareSuccess)};
          } catch {
            if (status) status.textContent = shareUrl;
          }
        }
      });

      const feedbackRoot = document.querySelector("[data-article-feedback]");
      const feedbackStatus = feedbackRoot?.querySelector("[data-feedback-status]");
      const feedbackMessage = feedbackRoot?.querySelector("[data-feedback-message]");
      const feedbackKey = feedbackRoot?.dataset.feedbackKey;
      const savedFeedback = (() => {
        try {
          return feedbackKey ? localStorage.getItem(feedbackKey) : "";
        } catch {
          return "";
        }
      })();

      feedbackRoot?.querySelectorAll("[data-feedback-choice]").forEach((button) => {
        const selected = button.dataset.feedbackChoice === savedFeedback;
        button.classList.toggle("is-selected", selected);
        button.setAttribute("aria-pressed", String(selected));
      });

      feedbackRoot?.addEventListener("click", (event) => {
        const button = event.target.closest("[data-feedback-choice]");
        if (!button) return;
        try {
          localStorage.setItem(feedbackKey, button.dataset.feedbackChoice);
        } catch {}
        feedbackRoot.querySelectorAll("[data-feedback-choice]").forEach((choice) => {
          const selected = choice === button;
          choice.classList.toggle("is-selected", selected);
          choice.setAttribute("aria-pressed", String(selected));
        });
        if (feedbackStatus) feedbackStatus.textContent = ${JSON.stringify(dictionary.articleFeedbackSaved ?? "")};
      });

      feedbackRoot?.querySelector("form")?.addEventListener("submit", (event) => {
        event.preventDefault();
        const message = feedbackMessage?.value.trim() ?? "";
        if (!message) {
          if (feedbackStatus) feedbackStatus.textContent = ${JSON.stringify(dictionary.articleFeedbackEmpty ?? "")};
          feedbackMessage?.focus();
          return;
        }
        const subject = ${JSON.stringify(`${article.title} | ${dictionary.articleFeedbackSubject ?? "Article feedback"}`)};
        const body = message + "\\n\\n" + ${JSON.stringify(canonicalUrl)};
        if (feedbackStatus) feedbackStatus.textContent = ${JSON.stringify(dictionary.articleFeedbackEmailHint ?? "")};
        window.location.href = "mailto:${feedbackEmail}?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      });
    </script>
  </body>
</html>
`;
}

function buildSitemap(data, lastmod) {
  const urls = [
    `${siteUrl}/`,
    `${siteUrl}/?lang=en`,
    `${siteUrl}/?lang=ar`,
  ];

  data.articleCatalog.forEach((article) => {
    const slug = data.getArticleSlug(article);
    ["fa", "en", "ar"].forEach((language) => {
      urls.push(getArticleUrl(slug, language));
    });
  });

  const body = urls
    .map(
      (url) => `  <url>\n    <loc>${escapeHtml(url)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

async function main() {
  const source = await readFile(scriptPath, "utf8");
  const data = getSiteData(source);
  const lastmod = process.env.SITEMAP_LASTMOD ?? new Date().toISOString().slice(0, 10);

  await mkdir(articleRoot, { recursive: true });

  for (const article of data.articleCatalog) {
    const slug = data.getArticleSlug(article);

    for (const language of ["fa", "en", "ar"]) {
      const directory = join(articleRoot, slug, language);
      await mkdir(directory, { recursive: true });
      await writeFile(
        join(directory, "index.html"),
        cleanTrailingWhitespace(getPageHtml(data, article, language)),
        "utf8",
      );
    }
  }

  await writeFile(sitemapPath, buildSitemap(data, lastmod), "utf8");
  console.log(`Generated ${data.articleCatalog.length * 3} article pages and sitemap.xml.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack ?? error.message : error);
  process.exit(1);
});
