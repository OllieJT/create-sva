import { PKG_ROOT } from "$src/data/constants.js";
import type { Installer } from "$src/installers/installer.js";
import { add_pkg_dependency } from "$src/utility/add-pkg-dependency.js";
import fs from "fs-extra";
import path from "path";
import { type Config as PrettierConfig } from "prettier";

export const tailwind_installer: Installer = ({ project_dir }) => {
	add_pkg_dependency({
		project_dir,
		dependencies: [
			"tailwindcss",
			"autoprefixer",
			"postcss",
			"prettier",
			"prettier-plugin-tailwindcss",
			"tailwind-merge",
			"@tailwindcss/container-queries",
		],
		is_dev_dependency: true,
	});

	const template_dir = path.join(PKG_ROOT, "template/extras/tailwind");

	const tw_config_src = path.join(template_dir, "tailwind.config.ts");
	const tw_config_dest = path.join(project_dir, "tailwind.config.ts");
	fs.copySync(tw_config_src, tw_config_dest, { overwrite: true });

	const postcss_config_src = path.join(template_dir, "postcss.config.cjs");
	const postcss_config_dest = path.join(project_dir, "postcss.config.cjs");
	fs.copySync(postcss_config_src, postcss_config_dest, { overwrite: true });

	const css_src = path.join(template_dir, "app.pcss");
	const css_dest = path.join(project_dir, "src/app.pcss");
	fs.copySync(css_src, css_dest, { overwrite: true });

	const prettier_path = path.join(project_dir, ".prettierrc");
	const prettier_content = fs.readJSONSync(prettier_path) as PrettierConfig;
	prettier_content.plugins?.push("prettier-plugin-tailwindcss");
	fs.writeJSONSync(prettier_path, prettier_content, { spaces: 2 });
};
