import { Installer } from "$src/installers/installer.js";
import { add_pkg_dependency } from "$src/utility/add-pkg-dependency.js";
import { update_pkg_json } from "$src/utility/update-pkg-json.js";

export const husky_installer: Installer = ({ project_dir }) => {
	add_pkg_dependency({
		project_dir,
		dependencies: ["husky", "lint-staged"],
		is_dev_dependency: true,
	});

	update_pkg_json({
		project_dir,
		update: (pkg) => {
			pkg.scripts = {
				...pkg.scripts,
				prepare: "husky install",
			};
			pkg["lint-staged"] = {
				"*.{js,ts,cjs,mjs,svelte,html,md,mdx,json,css}": "prettier  --write",
			};
			return pkg;
		},
	});
};
