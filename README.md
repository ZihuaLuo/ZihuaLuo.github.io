# Zihua Luo, FRM Personal Website

> Current mode: local editing only. GitHub Pages deployment is paused because
> `.github/workflows/deploy.yml` has been renamed to `deploy.yml.disabled`.
> Rename it back only when the site is ready for public deployment.

## Project Overview

This is the bilingual personal website for Zihua Luo, FRM / 罗子华, FRM

The site is a premium dark personal branding system for finance, research analytics, risk-aware thinking, learning notes, structured reflection, and a long-form timeline

It is built as a static website so it can be deployed on GitHub Pages without a backend

## Tech Stack

- Astro static output
- Astro content collections for Thoughts, Notes, and Timeline entries
- Markdown / MDX content
- Tailwind CSS plus global premium dark styling
- Client-side static search index
- GitHub Pages deployment through GitHub Actions

## Local Development

```bash
npm install
npm run dev
npm run build
npm run preview
```

`npm run build` writes the static site to `dist/`

## Project Structure

```txt
src/pages/              Routes for English and Chinese pages
src/pages/zh/           Chinese routes
src/content/            Thoughts, Notes, and Timeline Markdown / MDX
src/components/         Hero, Header, cards, search, analytics, dashboard
src/layouts/            Base layout and content layout
src/styles/             Global visual system
src/i18n/               Bilingual navigation, routes, UI labels
src/config/             Central site configuration
src/data/               Reusable site data for Now and Operating Principles
public/                 Static assets, favicon, OG images
.github/workflows/      GitHub Pages deployment workflow
```

## Central Site Config

Core identity, public links, metadata defaults, and analytics placeholders live in:

```txt
src/config/site.ts
```

`PUBLIC_SITE_URL` controls canonical URLs, sitemap URLs, and social preview URLs. This repository is configured as a GitHub user site:

```txt
PUBLIC_SITE_URL=https://zihualuo.github.io
BASE_PATH=/
```

For another user site, use:

```txt
PUBLIC_SITE_URL=https://your-github-username.github.io
BASE_PATH=/
```

For a project site, use:

```txt
PUBLIC_SITE_URL=https://your-github-username.github.io/your-repository-name
BASE_PATH=/your-repository-name
```

## Content Maintenance

Thoughts live in:

```txt
src/content/thoughts/en/
src/content/thoughts/zh/
```

Notes live in:

```txt
src/content/notes/en/
src/content/notes/zh/
```

Timeline entries live in:

```txt
src/content/timeline/en/
src/content/timeline/zh/
```

Use paired English and Chinese files with the same `translationKey` when both versions exist

### Add A Thought

```txt
src/content/thoughts/en/my-new-thought.md
src/content/thoughts/zh/my-new-thought.md
```

```yaml
---
title: "My New Thought"
description: "Short summary without a sentence-ending period"
date: 2026-05-22
category: "Decision Making"
tags: ["Decision Making", "Risk"]
language: "en"
translationKey: "my-new-thought"
draft: false
---
```

### Add A Note

```txt
src/content/notes/en/my-new-note.md
src/content/notes/zh/my-new-note.md
```

Useful note categories include:

- CFA Level II
- Financial Statement Analysis
- Fixed Income
- Derivatives
- Equity Valuation
- Portfolio Management
- Economics
- Data Analytics

### Add A Timeline Entry

Create paired files in:

```txt
src/content/timeline/en/
src/content/timeline/zh/
```

Timeline frontmatter supports fields such as:

```yaml
---
type: "milestone"
date: "2026"
title: "Structured finance notes"
description: "Organizing valuation, financial analysis, fixed income, derivatives, and portfolio concepts into reusable study notes"
category: "Learning"
tags: ["CFA Level II", "Finance", "Study System"]
language: "en"
translationKey: "structured-finance-notes"
draft: false
order: 100
---
```

Set `draft: true` to keep content out of production pages, generated routes, and production search

### Update Now Dashboard

Now dashboard copy and data live in:

```txt
src/data/now.ts
src/components/NowDashboard.astro
```

Update the data file first so the dashboard and search index stay aligned

### Update Operating Principles

Operating Principles live in:

```txt
src/data/principles.ts
```

They render on the homepage and are included in search

## Search

Site-wide search is static and backend-free

Search index generation lives in:

```txt
src/pages/search-index.json.ts
```

Search UI lives in:

```txt
src/components/SearchModal.astro
src/components/Header.astro
```

The index includes:

- Thoughts
- Notes
- Timeline entries
- Now dashboard sections
- Operating Principles
- English and Chinese content, filtered to the active language in the UI

Search items include `title`, `description`, `url`, `type`, `category`, `tags`, `language`, `date` where applicable, and lightweight searchable body content for Thoughts and Notes

Use the header search button or `Cmd/Ctrl K` to open the command palette

## Sharing & Social Preview

Social preview images live in:

```txt
public/og-image.png
public/og-image-zh.png
```

SEO and social metadata are handled in:

```txt
src/components/SEO.astro
src/layouts/BaseLayout.astro
src/config/site.ts
```

The in-site share card lives in:

```txt
src/components/ShareCard.astro
src/components/Hero.astro
src/components/Footer.astro
```

Metadata includes:

- `og:title`
- `og:description`
- `og:image`
- `og:type`
- `og:url`
- `twitter:card`
- `twitter:title`
- `twitter:description`
- `twitter:image`

English pages use the English OG image and English share text:

```txt
Zihua Luo, FRM
Finance, Research & Analytics, Risk-Aware Thinking
```

Chinese pages use the Chinese OG image and Chinese share text:

```txt
罗子华, FRM
金融、研究分析与风险意识驱动的思考方式
```

The share card opens from the homepage Hero and footer share buttons. It uses the Web Share API on supported devices and falls back to copying the current share URL to the clipboard

In local development, the fallback can use the local browser URL. For production builds, sharing uses `PUBLIC_SITE_URL` plus the current locale path so shared links send people to the public website rather than a local development address

Before public launch, update:

```txt
PUBLIC_SITE_URL=https://your-public-site-url
```

Local addresses such as `127.0.0.1` are only for development and cannot be used as public share links or social preview URLs

Test sharing locally by opening the share card, copying the link, and confirming the modal text matches the current language. After deployment, test previews with platform tools such as LinkedIn Post Inspector, Slack unfurl preview, Discord, iMessage, or a private message share

## Analytics

Analytics are privacy-friendly and disabled unless configured

The reusable analytics component lives in:

```txt
src/components/Analytics.astro
```

The component only loads analytics in production and only when required public environment variables exist

### Plausible

```txt
PUBLIC_ANALYTICS_PROVIDER=plausible
PUBLIC_PLAUSIBLE_DOMAIN=your-public-domain.com
```

This loads:

```html
<script defer data-domain="your-public-domain.com" src="https://plausible.io/js/script.js"></script>
```

### Umami

```txt
PUBLIC_ANALYTICS_PROVIDER=umami
PUBLIC_UMAMI_WEBSITE_ID=your-website-id
PUBLIC_UMAMI_SCRIPT_URL=https://cloud.umami.is/script.js
```

This loads:

```html
<script defer src="https://cloud.umami.is/script.js" data-website-id="your-website-id"></script>
```

Leave `PUBLIC_ANALYTICS_PROVIDER` empty to disable analytics

The helper `window.trackSiteEvent(name, props)` safely tracks optional events when analytics is available and does nothing when analytics is disabled

Current lightweight events include:

- Open Search
- Click Search Result
- Open Share Card
- Click Native Share
- Copy Share Link
- Click LinkedIn
- Click Instagram
- Click Email

Environment variable examples live in:

```txt
.env.example
```

These values are public client-side analytics IDs and domains only, not private secrets

## Public Deployment

GitHub Pages deployment is configured in:

```txt
.github/workflows/deploy.yml
```

To deploy this site to `ZihuaLuo/ZihuaLuo.github.io`:

1. Push this project to the `main` branch
2. In GitHub, open `Settings -> Pages`
3. Set the source to `GitHub Actions`
4. Run `npm run build` locally
5. Push to `main`
6. Check the Actions run
7. Open `https://zihualuo.github.io` and verify routes, metadata, search, and sharing

`127.0.0.1` and other local addresses are only reachable on your machine, so they should never be used for production OG metadata or shared links

For this user site:

```txt
PUBLIC_SITE_URL=https://zihualuo.github.io
BASE_PATH=/
```

For a project site:

```txt
PUBLIC_SITE_URL=https://your-github-username.github.io/your-repository-name
BASE_PATH=/your-repository-name
```

## Custom Domain

If adding a custom domain later:

1. Add `public/CNAME` containing only the domain
2. Configure DNS with the domain provider
3. Configure the custom domain in GitHub Pages settings
4. Update `PUBLIC_SITE_URL` after the domain is live
5. Rebuild and redeploy

## Content Style

Visible site copy follows a clean no sentence-ending periods style where already established

Avoid final `.` in English visible UI copy and final `。` in Chinese visible UI copy

Keep punctuation in email addresses, URLs, file names, abbreviations, decimals, code, and configuration values

## Maintenance Checklist

- Update content in the relevant collection or data file
- Keep English pages free of Chinese UI text
- Keep Chinese pages natural and localized
- Run `npm run build`
- Check mobile layouts
- Verify internal links and language links
- Verify search opens and returns expected results
- Verify share card opens, copies links, and uses the current language
- Verify LinkedIn, Instagram, and email links
- Verify OG image previews after deployment
- Verify analytics only loads when configured
- Check GitHub Actions after pushing
