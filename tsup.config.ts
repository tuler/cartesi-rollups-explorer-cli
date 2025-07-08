import { defineConfig } from "tsup";

export default defineConfig({
    clean: true,
    dts: true,
    entry: ["src/cli.tsx"],
    format: ["cjs", "esm"],
    minify: true,
    sourcemap: true,
});
