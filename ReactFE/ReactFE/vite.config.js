import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
  server: {
    port: 5173, // <--- adaugă asta ca să forțezi portul
    strictPort: true, // opțional: dacă e ocupat, nu pornește pe altul
  },
});
