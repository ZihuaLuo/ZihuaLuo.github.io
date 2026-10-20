import { readFile } from "node:fs/promises";
import path from "node:path";
import { withBase } from "@i18n/routes";
import { addProjectMetadata } from "../../utils/projectMetadata";

export async function GET({ site }: { site: URL }) {
  const file = path.join(process.cwd(), "src/assets/canadian-provincial-electricity-dashboard.html");
  const html = addProjectMetadata(await readFile(file, "utf8"), "canadian-electricity", new URL(withBase("/projects/canadian-provincial-electricity-dashboard.html"), site).toString());
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
