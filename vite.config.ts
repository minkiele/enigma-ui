import packageJson from "./package.json";
import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// See https://getbootstrap.com/docs/5.3/getting-started/vite/ for configuration
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    { enforce: "pre", ...mdx() },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
  ],
  base: "./",
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          "import",
          "color-functions",
          "global-builtin",
          "if-function",
        ],
      },
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
  },
});
