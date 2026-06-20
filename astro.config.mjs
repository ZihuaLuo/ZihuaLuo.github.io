import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { fileURLToPath } from "node:url";

const site =
  process.env.PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  "http://127.0.0.1:4321";
const base = process.env.BASE_PATH || "/";

export default defineConfig({
  site,
  base,
  output: "static",
  integrations: [mdx()],
  vite: {
    resolve: {
      alias: {
        "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
        "@config": fileURLToPath(new URL("./src/config", import.meta.url)),
        "@data": fileURLToPath(new URL("./src/data", import.meta.url)),
        "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
        "@i18n": fileURLToPath(new URL("./src/i18n", import.meta.url)),
      },
    },
  },
  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
  },
});
