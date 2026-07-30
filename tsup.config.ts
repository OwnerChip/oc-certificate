import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.tsx"],
    format: ["esm", "cjs"],
    // No "type": "module" in package.json, so .js must stay CommonJS and the
    // ESM build has to carry the .mjs extension for Node to load it correctly.
    outExtension: ({ format }) => ({ js: format === "cjs" ? ".js" : ".mjs" }),
    dts: true,
    sourcemap: true,
    clean: true,
    // The consumer owns the renderer instance: a second copy would mean a
    // second font registry, and fonts registered by the app would not apply.
    external: ["react", "@react-pdf/renderer"],
});
