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
      // Offline-first : on précache le SHELL de l'app + les assets, mais PAS les
      // ~200 pages SEO statiques (elles gonfleraient l'install de ~1 Mo pour rien).
      // Les articles sont servis en NetworkFirst : dispo hors-ligne après visite,
      // sans alourdir l'installation du jeu.
      workbox: {
        globPatterns: ["**/*.{js,css,svg,png,ico,webmanifest}", "index.html"],
        navigateFallback: "index.html",
        navigateFallbackDenylist: [/\.html$/], // les .html (articles) vont au réseau
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.endsWith(".html"),
            handler: "NetworkFirst",
            options: {
              cacheName: "articles",
              expiration: { maxEntries: 64, maxAgeSeconds: 604800 },
            },
          },
        ],
      },
      manifest: {
        name: "Coincheur : Coinche & entraînement",
        short_name: "Coincheur",
        description:
          "Jeu de Coinche (belote contrée) contre des IA redoutables, avec coach intégré et exercices. Gratuit, sans inscription.",
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
