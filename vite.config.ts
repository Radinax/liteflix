/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  test: {
    globals: true, // Enable global APIs like `describe`, `it`, `expect`
    environment: "jsdom", // Use jsdom for DOM-related tests
    setupFiles: "./setupTests.ts", // Load jest-dom matchers
    include: ["**/*.test.{ts,tsx,js,jsx}"], // Include all test files
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/assets/avatar.png": path.resolve(__dirname, "./__mocks__/fileMock.js"),
      "@/assets/star.svg": path.resolve(__dirname, "./__mocks__/fileMock.js"),
    },
  },
});
