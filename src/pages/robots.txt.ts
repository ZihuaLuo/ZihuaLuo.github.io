import { withBase } from "@i18n/routes";

export function GET({ site }: { site: URL }) {
  const siteUrl = site ?? new URL("http://127.0.0.1:4321");
  const sitemapUrl = new URL(withBase("/sitemap.xml"), siteUrl).toString();

  return new Response(`User-agent: *\nAllow: /\nSitemap: ${sitemapUrl}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
