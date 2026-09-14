# SEO Tools Setup

This site is technically ready for Google SEO tools, but the actual connection needs two real values from the Google account that owns the property.

## Required values

1. Google Search Console verification token
   - Usually provided as an HTML tag:
     `<meta name="google-site-verification" content="..." />`
   - Paste the real tag in `index.html`, inside `<head>`, where the Search Console comment is placed.

2. Google Analytics Measurement ID
   - Usually looks like `G-XXXXXXXXXX`.
   - Add the official Google tag snippet for that Measurement ID in `index.html`, inside `<head>`.

## Verification checklist

After adding the real values:

1. Open `https://alisodeyfi.ir/`.
2. Confirm the Search Console meta tag is present in the page source.
3. Confirm the Google tag script loads without console errors.
4. Verify the property in Google Search Console.
5. In Google Analytics, confirm realtime traffic after opening the site.

Do not commit passwords, API keys, recovery codes, or private account tokens. Search Console verification tags and Analytics Measurement IDs are public identifiers, but they must still be the real values from the correct Google property.
