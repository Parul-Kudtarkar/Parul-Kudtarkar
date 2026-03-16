# Deployment (GitHub Pages + custom domain)

This site is built as a static export and deployed to **GitHub Pages**, with an optional **custom domain** (e.g. from Google Domains / Squarespace Domains).

## Custom domain and canonical URL

To make Open Graph, Twitter cards, and sitemaps use your real domain instead of the GitHub Pages URL:

1. In your repo go to **Settings → Secrets and variables → Actions**.
2. Under **Variables**, add:
   - **Name:** `SITE_URL`
   - **Value:** your full site URL, e.g. `https://yourdomain.com` (no trailing slash)
3. Re-run the “Deploy to GitHub Pages” workflow (or push a commit).

If `SITE_URL` is not set, the site falls back to `https://parulkudtarkar.com` for metadata.

## Security on GitHub Pages

GitHub Pages does **not** allow custom HTTP headers. Security is handled by:

- **Meta tags** in the HTML (e.g. `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`) so browsers still get basic protections.
- **Safe rendering** of blog content (sanitized links and escaped HTML) to reduce XSS risk.

For full HTTP security headers (e.g. strict CSP), you would need a proxy in front (e.g. Cloudflare) that adds headers.

## `vercel.json`

The `vercel.json` file in the repo is only used if you deploy to Vercel. It is ignored when deploying to GitHub Pages.
