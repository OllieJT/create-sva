import { Installer } from "$src/installers/installer.js";
import fs from "fs-extra";
import merge from "just-merge";
import path from "path";

type VsCodeExtension = string[];

type VsCodeSettings = {
	[key: string]: VsCodeSettings | string | boolean | string[];
};

const json = <T extends object | []>(s: T) => JSON.stringify(s, null, "\t");

export const vscode_installer: Installer = ({ project_dir, packages }) => {
	const extensions: VsCodeExtension = [
		"aaron-bond.better-comments",
		"esbenp.prettier-vscode",
		"mikestead.dotenv",
		"svelte.svelte-vscode",
		"antfu.file-nesting",
		"YoavBls.pretty-ts-errors",
	];

	let settings: VsCodeSettings = {
		"[json]": {
			"editor.defaultFormatter": "esbenp.prettier-vscode",
			"editor.codeActionsOnSave": {
				"source.fixAll.prettier": "explicit",
			},
		},
		"[typescript]": {
			"editor.defaultFormatter": "esbenp.prettier-vscode",
			"editor.codeActionsOnSave": {
				"source.fixAll.prettier": "explicit",
				"source.organizeImports": "explicit",
			},
		},
		"[javascript]": {
			"editor.defaultFormatter": "esbenp.prettier-vscode",
			"editor.codeActionsOnSave": {
				"source.organizeImports": "explicit",
			},
		},
		"[svelte]": {
			"editor.defaultFormatter": "esbenp.prettier-vscode",
			"editor.codeActionsOnSave": {
				"source.fixAll.prettier": "explicit",
				"source.organizeImports": "explicit",
			},
		},
		"files.exclude": {
			"**/.DS_Store": true,
			"**/*-lock.*": true,
			"**/*.Identifier": true,
			"**/*.map": true,
			"**/node_modules": true,
			"**/tsconfig.tsbuildinfo": true,
			".eslintcache": true,
		},
		"files.watcherExclude": {
			"**/node_modules": true,
			"**/.svelte-kit": true,
		},
		"typescript.tsdk": "node_modules/typescript/lib",
		"editor.formatOnSave": true,
		"todo-tree.tree.scanMode": "workspace only",
		"fileNestingUpdater.autoUpdate": true,
		"fileNestingUpdater.promptOnAutoUpdate": false,
	};

	if (packages?.tailwind.is_used) {
		extensions.push("bradlc.vscode-tailwindcss");
		settings = merge<VsCodeSettings, VsCodeSettings>(settings, {
			"tailwindCSS.colorDecorators": true,
			"files.associations": {
				".css": "postcss",
			},
		});
	}

	const extensions_dest = path.join(project_dir, ".vscode/extensions.json");
	const extensions_data = json<VsCodeExtension>(extensions);

	const settings_dest = path.join(project_dir, ".vscode/settings.json");
	const settings_data = json<VsCodeSettings>(settings);

	fs.writeFileSync(extensions_dest, extensions_data, { flag: "w" });
	fs.writeFileSync(settings_dest, settings_data, { flag: "w" });
};
