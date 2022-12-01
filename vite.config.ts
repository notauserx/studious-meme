import { defineConfig } from "vite";
import type { UserConfig as VitestUserConfig } from 'vitest/config';
import react from "@vitejs/plugin-react";

const vitestConfig: VitestUserConfig = {
  test: {
    environment: 'jsdom',
    setupFiles: './tests/setup'
  }
};

export default defineConfig({
  plugins: [react()],
  test: vitestConfig.test,
});

