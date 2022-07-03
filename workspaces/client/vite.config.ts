import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import * as path from "path";

import { viteAlias } from "./scripts/alias";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    // alias: [...viteAlias, { find: "@/", replacement: path.resolve(__dirname, "src/modules") }],
    alias: {
      ...viteAlias,
      "@": path.resolve(__dirname, "src/modules"),
    },
  },
});
