import { PKG_ROOT } from "$src/data/constants.js";
import { type Installer } from "$src/installers/installer.js";
import { add_pkg_dependency } from "$src/utility/add-pkg-dependency.js";
import fs from "fs-extra";
import path from "path";

export const adapter_vercel_installer: Installer = ({ project_dir }) => {
	// Add dependencies to package json

	add_pkg_dependency({
		project_dir,
		dependencies: ["@sveltejs/adapter-vercel"],
		is_dev_dependency: true,
	});

	// Moving Files

	// Move template svelte.config.js file

	const extras_dir = path.join(PKG_ROOT, "template/extras");

	const config_src = path.join(extras_dir, `config/svelte-vercel.js`);
	const config_dest = path.join(project_dir, "svelte.config.js");

	fs.copySync(config_src, config_dest);
};
