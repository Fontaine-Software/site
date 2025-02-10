import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";

export default defineConfig({
  base: '/site/',
  plugins: [
    remix({
      ssr: false,
      basename: '/site/',
      ignoredRouteFiles: ["**/.*"],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_lazyRouteDiscovery: true,
        v3_singleFetch: true,
        v3_routeConfig: true,
      },
    }),
  ],
  css: {
    preprocessorOptions: {
        scss: {
        api: 'modern-compiler' // or "modern"
        }
    }
  },
});