import { defineConfig, loadEnv } from "vite";
import preact from "@preact/preset-vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    build: {
      sourcemap: true, // Source map generation must be turned on
    },
    plugins: [
      preact(),
      sentryVitePlugin({
        org: "its-simple-studios",
        project: "dataverse",

        authToken: env.SENTRY_AUTH_TOKEN,

        sourcemaps: {
          // Specify the directory containing build artifacts
          assets: "./dist/**",
        },
      }),
    ],
    server: {
      port: 14949,
    },
  };
});
