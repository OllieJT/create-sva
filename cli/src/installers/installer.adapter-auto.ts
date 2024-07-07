import { PKG_ROOT } from "$src/data/constants.js";
import { AvailableDependencies } from "$src/installers/dependency-version-map.js";
import { type Installer } from "$src/installers/installer.js";
import { add_pkg_dependency } from "$src/utility/add-pkg-dependency.js";
import fs from "fs-extra";
import path from "path";

type AdapterType = "auto" | "cloudflare" | "netlify" | "node" | "vercel";

export const get_adapter_installer = (adapter: AdapterType): Installer => {
	const dependencies: AvailableDependencies[] = [`@sveltejs/adapter-${adapter}`];

	const extras_dir = path.join(PKG_ROOT, "template/extras");
	const config_src = path.join(extras_dir, `config/svelte-${adapter}.js`);

	const adapter_auto_installer: Installer = ({ project_dir }) => {
		// Add dependencies to package json

		add_pkg_dependency({
			project_dir,
			dependencies,
			is_dev_dependency: true,
		});

		// Moving Files

		const config_dest = path.join(project_dir, "svelte.config.js");
		fs.copySync(config_src, config_dest);
	};

	return adapter_auto_installer;
};
