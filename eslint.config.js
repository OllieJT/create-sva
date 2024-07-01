import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import path from "path";
import ts from "typescript-eslint";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default ts.config(
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs["flat/recommended"],
	prettier,
	...svelte.configs["flat/prettier"],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				tsconfigRootDir: __dirname,
				project: [
					path.resolve(__dirname, "tsconfig.json"),
					path.resolve(__dirname, "cli/tsconfig.eslint.json"),
					path.resolve(__dirname, "web/tsconfig.json"),
				],
			},
		},
	},
	{
		files: ["**/*.svelte", "**/*.svelte.ts"],
		languageOptions: {
			parserOptions: {
				parser: ts.parser,
			},
		},
	},
	{
		rules: {
			"@typescript-eslint/no-explicit-any": "error",

			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					destructuredArrayIgnorePattern: "^_",
				},
			],

			"@typescript-eslint/no-confusing-void-expression": "off",
			"@typescript-eslint/restrict-template-expressions": "off",
			"@typescript-eslint/prefer-nullish-coalescing": "off",
		},
	},
	{
		ignores: [
			".DS_Store",
			"node_modules",
			"/build",
			"**/.svelte-kit",
			"dist/",
			"/package",
			".env",
			".env.*",
			"!.env.example",
			"pnpm-lock.yaml",
			"package-lock.json",
			"yarn.lock",
		],
	},
);
