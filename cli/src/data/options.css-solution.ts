import type { ClackOption } from "$src/data/types.js";

export const css_solutions = ["none", "tailwind", "shadcn", "bits_ui"] as const;
export type CssSolution = (typeof css_solutions)[number];
export const css_options = [
	{ value: "none", label: "Just CSS" },
	// { value: 'bits_ui', label: 'bits UI', hint: 'With Tailwind' },
	// { value: 'shadcn', label: 'shadcn', hint: 'With Tailwind' },
	{ value: "tailwind", label: "Tailwind CSS" },
] satisfies ClackOption<CssSolution>[];
