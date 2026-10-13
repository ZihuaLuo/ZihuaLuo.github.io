import { withBase } from "@i18n/routes";

export function GET({ site }: { site: URL }) {
  const sitemapUrl = new URL(withBase("/sitemap.xml"), site).toString();

  return new Response(`User-agent: *\nAllow: /\nSitemap: ${sitemapUrl}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
