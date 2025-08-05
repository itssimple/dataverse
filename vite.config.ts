import { defineConfig, loadEnv, splitVendorChunkPlugin } from "vite";
import preact from "@preact/preset-vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    appType: "spa",
    build: {
      sourcemap: true, // Source map generation must be turned on
    },
    base:
      mode == "production"
        ? "https://overlay.eververse.trade/"
        : "http://localhost.eververse.trade:14949/",
    plugins: [
      preact(),
      splitVendorChunkPlugin(),
      /*sentryVitePlugin({
        org: "its-simple-studios",
        project: "dataverse",

        authToken: env.SENTRY_AUTH_TOKEN,

        sourcemaps: {
          // Specify the directory containing build artifacts
          assets: "./dist/**",
        },
      }),*/
    ],
    server: {
      port: 14949,
      allowedHosts: ["localhost.eververse.trade"],
    },
  };
});
