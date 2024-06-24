import { PKG_ROOT } from '$src/data/constants.js';
import { type Installer } from '$src/installers/installer.js';
import { add_pkg_dependency } from '$src/utility/add-pkg-dependency.js';
import fs from 'fs-extra';
import path from 'path';

export const lucia_installer: Installer = ({ project_dir }) => {
	// Add dependencies to package json

	add_pkg_dependency({
		project_dir,
		dependencies: ['lucia', '@lucia-auth/adapter-drizzle', 'arctic'],
		is_dev_dependency: false,
	});

	// Moving Files

	const source = path.join(PKG_ROOT, 'template/extras');
	const dest = path.join(project_dir, 'src/');

	const global_types_src = path.join(source, `src/app-lucia.ts`);
	const global_types_dest = path.join(dest, 'app.d.ts');

	const hook_server_src = path.join(source, `src/hooks-server-lucia.ts`);
	const hook_server_dest = path.join(dest, 'hooks.server.ts');

	const auth_src = path.join(source, `src/lib/server/lucia.ts`);
	const auth_dest = path.join(dest, 'lib/server/auth.ts');

	const page_server_src = path.join(source, `src/routes/account/lucia.ts`);
	const page_server_dest = path.join(dest, 'routes/account/+page.server.ts');

	const page_svelte_src = path.join(source, `src/routes/account/lucia.svelte`);
	const page_svelte_dest = path.join(dest, 'routes/account/+page.svelte');

	fs.copySync(global_types_src, global_types_dest, { overwrite: true });
	fs.copySync(hook_server_src, hook_server_dest, { overwrite: true });
	fs.copySync(auth_src, auth_dest, { overwrite: true });
	fs.copySync(page_server_src, page_server_dest, { overwrite: true });
	fs.copySync(page_svelte_src, page_svelte_dest, { overwrite: true });
};
