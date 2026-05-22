import { getCollection } from "astro:content";
import { entrySlug, withBase } from "@i18n/routes";

const staticPaths = [
  "/",
  "/zh/",
  "/thoughts/",
  "/zh/thoughts/",
  "/notes/",
  "/zh/notes/",
  "/now/",
  "/zh/now/",
  "/contact/",
  "/zh/contact/",
];

function urlFor(path: string, siteUrl: URL) {
  return new URL(withBase(path), siteUrl).toString();
}

export async function GET({ site }: { site: URL }) {
  const siteUrl = site ?? new URL("https://zihualuo.github.io");
  const includeDrafts = !import.meta.env.PROD;
  const thoughts = await getCollection("thoughts", ({ data }) => includeDrafts || !data.draft);
  const notes = await getCollection("notes", ({ data }) => includeDrafts || !data.draft);
  const contentPaths = [
    ...thoughts.map((entry) =>
      entry.data.language === "zh"
        ? `/zh/thoughts/${entrySlug(entry.id)}/`
        : `/thoughts/${entrySlug(entry.id)}/`,
    ),
    ...notes.map((entry) =>
      entry.data.language === "zh"
        ? `/zh/notes/${entrySlug(entry.id)}/`
        : `/notes/${entrySlug(entry.id)}/`,
    ),
  ];

  const urls = [...staticPaths, ...contentPaths]
    .map((path) => `  <url><loc>${urlFor(path, siteUrl)}</loc></url>`)
    .join("\n");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
