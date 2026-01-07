import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// See https://getbootstrap.com/docs/5.3/getting-started/vite/ for configuration
// https://vite.dev/config/
export default defineConfig(({
  plugins: [react()],
  base: './',
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          "import",
          "color-functions",
          "global-builtin",
          "if-function"
        ],
      },
    },
  },
}));
