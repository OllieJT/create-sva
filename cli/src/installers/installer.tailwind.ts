import { PKG_ROOT } from '$src/data/constants.js';
import { Installer } from '$src/installers/installer.js';
import { add_pkg_dependency } from '$src/utility/add-pkg-dependency.js';
import fs from 'fs-extra';
import path from 'path';

export const tailwind_installer: Installer = ({ project_dir }) => {
	add_pkg_dependency({
		project_dir,
		dependencies: [
			'tailwindcss',
			'autoprefixer',
			'postcss',
			'prettier',
			'prettier-plugin-tailwindcss',
			'tailwind-merge',
			'@tailwindcss/container-queries',
		],
		is_dev_dependency: true,
	});

	const source = path.join(PKG_ROOT, 'template/extras');

	const tw_config_src = path.join(source, 'config/tailwind.config.ts');
	const tw_config_dest = path.join(project_dir, 'tailwind.config.ts');

	const postcss_config_src = path.join(source, 'config/postcss.config.cjs');
	const postcss_config_dest = path.join(project_dir, 'postcss.config.cjs');

	const prettier_src = path.join(source, 'config/_prettier.config.js');
	const prettier_dest = path.join(project_dir, 'prettier.config.js');

	const css_src = path.join(source, 'src/tailwind.pcss');
	const css_dest = path.join(project_dir, 'src/styles/app.pcss');

	fs.copySync(tw_config_src, tw_config_dest, { overwrite: true });
	fs.copySync(postcss_config_src, postcss_config_dest, { overwrite: true });
	fs.copySync(css_src, css_dest, { overwrite: true });
	fs.copySync(prettier_src, prettier_dest, { overwrite: true });
};
