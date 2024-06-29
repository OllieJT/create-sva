import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			fontFamily: {
				sans: [...fontFamily.sans],
			},
		},
	},
	plugins: [
		plugin(function ({ addVariant, addUtilities }) {
			addVariant("current", ["&.current"]);
			addVariant("not-current", ["&:not(.current)"]);
		}),
	],
} satisfies Config;
