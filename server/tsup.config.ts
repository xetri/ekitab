import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  target: "node20",
  format: ["esm"],
  sourcemap: false,
  clean: true,
  dts: false,
  tsconfig: "./tsconfig.json",
});