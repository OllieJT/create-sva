import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		env: { publicPrefix: 'PUBLIC_' },
		alias: { $src: 'src', $lib: 'src/lib' },

		// https://kit.svelte.dev/docs/adapter-cloudflare
		adapter: adapter({
			// deployment configuration
		}),

		typescript: {
			config: (initial) => ({
				// generated tsconfig
				...initial,
				compilerOptions: {
					...initial.compilerOptions,
					allowJs: true,
					checkJs: true,
					esModuleInterop: true,
					forceConsistentCasingInFileNames: true,
					resolveJsonModule: true,
					skipLibCheck: true,
					sourceMap: true,
					strict: true,
				},
			}),
		},
	},
};

export default config;
