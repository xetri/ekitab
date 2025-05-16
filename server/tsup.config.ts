import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  target: "es2020",
  format: ["esm"],
  sourcemap: false,
  minify: true,
  clean: true,
  dts: false,
  skipNodeModulesBundle: true,
  tsconfig: "./tsconfig.json",
});