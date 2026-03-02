import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  {
    rules: {
      "no-restricted-imports": "off",
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/*/**"],
              message:
                "Feature internals must be imported through the barrel file (e.g., '@/features/config').",
            },
            {
              group: [
                "../features/*/**",
                "../../features/*/**",
                "../../../features/*/**",
              ],
              message:
                "Feature internals must be imported through the barrel file (e.g., '@/features/config').",
            },
            {
              group: ["@backend/*"],
              allowTypeImports: true,
              message:
                "Only 'import type' is allowed from @backend. Value imports will bundle backend code into the frontend.",
            },
          ],
        },
      ],
    },
  },
  {
    ignores: ["dist/", "src/routeTree.gen.ts"],
  },
]);
