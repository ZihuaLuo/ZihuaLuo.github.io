import { getCollection } from "astro:content";
import { essaysPerPage, writingSeries, writingSeriesPath } from "@data/writingSeries";
import { entrySlug, withBase } from "@i18n/routes";

const staticPaths = [
  "/about/",
  "/experience/",
  "/writing/",
  "/credits/",
];

function urlFor(path: string, siteUrl: URL) {
  return new URL(withBase(path), siteUrl).toString();
}

export async function GET({ site }: { site: URL }) {
  const siteUrl = site ?? new URL("http://127.0.0.1:4321");
  const includeDrafts = !import.meta.env.PROD;
  const writing = await getCollection(
    "writing",
    ({ data }) => data.language === "en" && (includeDrafts || !data.draft),
  );
  const seriesPaths = writingSeries.flatMap((series) => {
    const count = writing.filter((entry) => entry.data.category === series.category).length;
    const totalPages = Math.ceil(count / essaysPerPage);

    return Array.from({ length: totalPages }, (_, index) =>
      writingSeriesPath(series.slug, index + 1),
    );
  });
  const contentPaths = [
    ...seriesPaths,
    ...writing.map((entry) => `/writing/${entrySlug(entry.id)}/`),
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
