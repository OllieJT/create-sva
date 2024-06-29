import { PKG_ROOT } from "$src/data/constants.js";
import { Installer } from "$src/installers/installer.js";
import { add_pkg_dependency } from "$src/utility/add-pkg-dependency.js";
import { update_pkg_json } from "$src/utility/update-pkg-json.js";
import fs from "fs-extra";
import path from "path";

export const husky_installer: Installer = ({ project_dir }) => {
	add_pkg_dependency({
		project_dir,
		dependencies: ["husky", "lint-staged"],
		is_dev_dependency: true,
	});

	const source = path.join(PKG_ROOT, "template/extras");

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

	const pre_commit_src = path.join(source, "config/husky-pre-commit.sh");
	const pre_commit_dest = path.join(project_dir, ".husky/pre-commit");

	fs.copySync(pre_commit_src, pre_commit_dest, { overwrite: true });
};
