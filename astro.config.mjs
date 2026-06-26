import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://automize.cl",
  output: "static",
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith("/gracias/"),
    }),
  ],
});
