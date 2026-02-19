import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),

  // ✅ No-drift guardrails
  {
    files: ["src/app/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}"],
    rules: {
      // 1) Never allow old data imports (even if folder is re-created later)
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/data/*", "../data/*", "./data/*", "**/src/data/*"],
              message:
                "Do not import from src/data. Use content loader + query layer: src/lib/content/* and src/lib/queries/*.",
            },
            {
              group: ["*.json"],
              message:
                "Do not import JSON directly in app/components. Use src/lib/content/load.ts + src/lib/queries/*.",
            },
            {
              group: ["content/data/*.json", "../content/data/*.json", "../../content/data/*.json"],
              message:
                "Do not import content JSON directly. Only src/lib/content/load.ts may read content/data/*.json.",
            },
          ],
        },
      ],
    },
  },

  // Allow JSON reading ONLY in the content loader layer (server-side).
  {
    files: ["src/lib/content/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/data/*", "../data/*", "./data/*", "**/src/data/*"],
              message:
                "Do not reintroduce src/data. Canonical content is in content/data/* with src/lib/content/load.ts.",
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
