import tseslint from "typescript-eslint";
import json from "@eslint/json";
import { defineConfig, globalIgnores } from "eslint/config";

import solid from "eslint-plugin-solid/configs/typescript";
import * as tsParser from "@typescript-eslint/parser";

export default defineConfig([
    {
        files: ["**/*.{ts,tsx}"],
        ...solid,
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: "tsconfig.json",
            },
        },
    },
    tseslint.configs.recommended,
    {
        files: ["**/*.json"],
        plugins: { json },
        language: "json/json",
        extends: ["json/recommended"],
    },
    globalIgnores([
        "**/dist",
        "**/node_modules",
        "**/src-tauri",
        "vite.config.ts",
        "package-lock.json",
    ]),
]);
