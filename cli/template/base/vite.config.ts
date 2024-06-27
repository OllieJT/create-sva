import { enhancedImages } from "@sveltejs/enhanced-img";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [sveltekit(), enhancedImages()],
	test: {
		include: ["src/**/*.{test,spec}.{js,ts}"],
	},
});
