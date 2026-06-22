import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import { readFileSync } from "node:fs";

const appVersion = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8")).version;

export default defineConfig({
  base: "./",
  define: { __APP_VERSION__: JSON.stringify(appVersion) },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      // Offline-first : tout le shell + les assets sont précachés ; les routes
      // retombent sur index.html ; les vieux caches sont nettoyés à la mise à jour.
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,webmanifest}"],
        navigateFallback: "index.html",
        cleanupOutdatedCaches: true,
      },
      manifest: {
        name: "Coincheur — Coinche & entraînement",
        short_name: "Coincheur",
        description:
          "Jouez à la Coinche contre des IA paramétrables et entraînez-vous, hors-ligne.",
        lang: "fr",
        dir: "ltr",
        categories: ["games", "entertainment", "education"],
        theme_color: "#0f5132",
        background_color: "#0b3d28",
        display: "standalone",
        orientation: "any",
        icons: [
          { src: "icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png" },
          {
            src: "icon-512-maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: "node",
    testTimeout: 30000, // les simulations Expert (PIMC) peuvent dépasser 5s
  },
});
