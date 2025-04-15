// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      MINDLET_API_URL: envField.string({
        context: "client",
        access: "public",
        default: "https://api.mindlet.app",
      }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  site: "https://mindlet.app/",
  integrations: [react(), sitemap()],
});
