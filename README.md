# Zihua Luo Personal Website

An English-only personal website built with Astro and Tailwind CSS. The production site is static and is deployed through GitHub Pages.

## Public routes

- `/` — Redirects to the canonical About page
- `/about/` — About landing page, personal story, principles, soundtrack, and contact details
- `/experience/` — Professional, research, education, and credential records
- `/writing/` — Full writing archive and series
- `/credits/` — Searchable acknowledgements directory

Writing articles are published at `/writing/<slug>/`. Writing series use `/writing/series/<series>/`. Retired routes and placeholder Notes are intentionally not generated so they cannot re-enter search or the sitemap.

## Project structure

```txt
src/
  components/          Shared interface components
  config/site.ts       Site identity, URLs, and analytics settings
  content/writing/     Approved essays
  content/experience/  Experience records
  data/credits.ts      Credits directory
  data/writingSeries.ts
  layouts/             Shared page and article layouts
  pages/               Current public routes and generated indexes
  styles/global.css    Global styling
public/
  audio/               About page soundtrack
  documents/           Donation records and downloadable task template
  images/              Profile image and active About hero background
  logos/               Experience logos
```

## Local development

```bash
npm install
npm run dev
```

The default local URL is `http://127.0.0.1:4321/`.

Create a production build with:

```bash
npm run build
```

Preview the generated `dist` folder with:

```bash
npm run preview
```

## Content workflow

Add approved essays as Markdown or MDX files under `src/content/writing/en/`. Set `draft: true` to exclude an entry from production routes, search, and the sitemap.

Add Experience records under `src/content/experience/en/`. Supported tracks are:

- `professional`
- `research`
- `education`
- `credentials`

Do not add placeholder study maps, inferred personal writing, or unpublished Notes. Search is generated only from approved Writing and Experience collections.

Credits are maintained in `src/data/credits.ts`. The visible directory and `/credit-data.json` are generated from the same source.

## Configuration

Copy `.env.example` to `.env` for local overrides. Important variables include:

- `PUBLIC_SITE_URL` or `SITE_URL`
- `BASE_PATH`
- `PUBLIC_ANALYTICS_PROVIDER`
- `PUBLIC_PLAUSIBLE_DOMAIN`
- `PUBLIC_UMAMI_WEBSITE_ID`
- `PUBLIC_UMAMI_SCRIPT_URL`

`PUBLIC_SITE_URL` should be the final public origin before deployment so canonical URLs and the sitemap are correct.

## Deployment

`.github/workflows/deploy.yml` builds and deploys the site to GitHub Pages on pushes to `main`. The workflow defaults to `https://zihualuo.github.io` with `/` as the base path, so repository variables are only needed when the public origin, base path, or analytics configuration changes.

## Release checks

Before uploading changes:

1. Run `npm run build`.
2. Confirm `/` redirects to `/about/` and all four navigation destinations work.
3. Test search results for About, Writing, Experience, and Acknowledgements content.
4. Validate internal links, section anchors, document downloads, and public assets.
5. Confirm `dist/sitemap.xml` contains only current canonical routes.
6. Check desktop and mobile layouts and confirm the browser console has no errors.
