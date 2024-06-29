import { ClackOption } from "$src/data/types.js";

export const adapter_solutions = ["node", "vercel", "netlify", "cloudflare", "auto"] as const;
export type AdapterSolution = (typeof adapter_solutions)[number];
export const adapter_options = [
	{ value: "auto", label: "Auto (Not recommended for production)" },
	{ value: "node", label: "Node" },
	{ value: "vercel", label: "Vercel" },
	{ value: "netlify", label: "Netlify" },
	{ value: "cloudflare", label: "Cloudflare" },
] satisfies ClackOption<AdapterSolution>[];
