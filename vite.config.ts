import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// See https://getbootstrap.com/docs/5.3/getting-started/vite/ for configuration
// https://vite.dev/config/
export default defineConfig(({mode}) => ({
  plugins: [react()],
  base: loadEnv(mode, process.cwd(), '').BASE_PATH,
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
