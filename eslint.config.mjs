import js from "@eslint/js";
import globals from "globals";
import importPlugin from "eslint-plugin-import";
import playwright from "eslint-plugin-playwright";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      js,
      import: importPlugin,
      playwright,
    },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      // Import/export good practices
      "import/no-named-default": "error",
      "import/no-named-as-default-member": "error",
      "import/no-unresolved": "error",
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal"],
          "newlines-between": "always",
        },
      ],
      // Playwright specific
      "playwright/no-skipped-test": "warn",
      "playwright/no-focused-test": "error",
      // Async best practices
      "no-async-promise-executor": "error",
      "require-await": "error",
      "no-floating-promises": "error",
      // Clean JS code
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
]);
