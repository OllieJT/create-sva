import { ClackOption } from "$src/data/types.js";

export const dev_tool_solutions = ["none", "husky", "vscode"] as const;
export type DevToolSolution = (typeof dev_tool_solutions)[number];
export const dev_tool_options = [
	{
		value: "husky",
		label: "Husky + Lint Staged",
		hint: "Automatically checks your code for errors BEFORE commiting changes.",
	},
	{
		value: "vscode",
		label: "VS Code Config",
		hint: "The recommended settings, and extensions in .vscode/*.",
	},
] satisfies ClackOption<DevToolSolution>[];
