import { PKG_ROOT } from '$src/data/constants.js';
import { Installer } from '$src/installers/installer.js';
import { add_pkg_dependency } from '$src/utility/add-pkg-dependency.js';
import fs from 'fs-extra';
import path from 'path';
import { PackageJson } from 'type-fest';

export const husky_installer: Installer = ({ project_dir }) => {
	add_pkg_dependency({
		project_dir,
		dependencies: ['husky', 'lint-staged'],
		is_dev_dependency: true,
	});

	const source = path.join(PKG_ROOT, 'template/extras');

	/*  */

	const pkg_json_path = path.join(project_dir, 'package.json');
	const pkg_json_content = fs.readJSONSync(pkg_json_path) as PackageJson;

	pkg_json_content.scripts = {
		...pkg_json_content.scripts,
		prepare: 'husky install',
	};

	pkg_json_content['lint-staged'] = {
		'*.{js,ts,cjs,mjs,svelte,html,md,mdx,json,css}': 'prettier  --write',
	};

	const pre_commit_src = path.join(source, 'config/husky-pre-commit.sh');
	const pre_commit_dest = path.join(project_dir, '.husky/pre-commit');

	fs.copySync(pre_commit_src, pre_commit_dest, { overwrite: true });
	fs.writeJSONSync(pkg_json_path, pkg_json_content, {
		spaces: 2,
	});
};
