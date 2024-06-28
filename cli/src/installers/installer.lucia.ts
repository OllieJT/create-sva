import { PKG_ROOT } from '$src/data/constants.js';
import { type Installer } from '$src/installers/installer.js';
import { add_env_variable } from '$src/utility/add-env_variable.js';
import { add_pkg_dependency } from '$src/utility/add-pkg-dependency.js';
import fs from 'fs-extra';
import path from 'path';

export const lucia_installer: Installer = ({ project_dir, database_solution }) => {
	// Add dependencies to package json

	add_pkg_dependency({
		project_dir,
		dependencies: ['lucia', '@lucia-auth/adapter-drizzle', 'arctic'],
		is_dev_dependency: false,
	});

	add_env_variable({
		project_dir,
		variables: [
			{ key: 'GITHUB_CLIENT_ID', value: '' },
			{ key: 'GITHUB_CLIENT_SECRET', value: '' },
		],
	});

	// Moving Files

	const source = path.join(PKG_ROOT, 'template/extras');
	const dest = path.join(project_dir, 'src/');

	// Lib

	const global_types_src = path.join(source, `src/app-lucia.ts`);
	const global_types_dest = path.join(dest, 'app.d.ts');

	const hook_server_src = path.join(source, `src/hooks-server-lucia.ts`);
	const hook_server_dest = path.join(dest, 'hooks.server.ts');

	const auth_src = path.join(source, `src/lib/server/lucia-${database_solution}.ts`);
	const auth_dest = path.join(dest, 'lib/server/auth.ts');

	const auth_create_session_src = path.join(source, `src/lib/server/lucia-auth.create-session.ts`);
	const auth_create_session_dest = path.join(dest, 'lib/server/auth.create-session.ts');

	const auth_oauth_provider_src = path.join(source, `src/lib/server/lucia-auth.oauth-provider.ts`);
	const auth_oauth_provider_dest = path.join(dest, 'lib/server/auth.oauth-provider.ts');

	const auth_use_oauth_src = path.join(source, `src/lib/server/lucia-auth.use-oauth.ts`);
	const auth_use_oauth_dest = path.join(dest, 'lib/server/auth.use-oauth.ts');

	/* Routes */

	const account_server_src = path.join(source, `src/routes/lucia/page-account.ts`);
	const account_server_dest = path.join(dest, 'routes/account/+page.server.ts');

	const account_svelte_src = path.join(source, `src/routes/lucia/page-account.svelte`);
	const account_svelte_dest = path.join(dest, 'routes/account/+page.svelte');

	const login_server_src = path.join(source, `src/routes/lucia/page-login.ts`);
	const login_server_dest = path.join(dest, 'routes/login/+page.server.ts');

	const login_svelte_src = path.join(source, `src/routes/lucia/page-login.svelte`);
	const login_svelte_dest = path.join(dest, 'routes/login/+page.svelte');

	const login_gh_server_src = path.join(source, `src/routes/lucia/github-login.ts`);
	const login_gh_server_dest = path.join(dest, 'routes/login/github/+server.ts');

	const login_ghcb_server_src = path.join(source, `src/routes/lucia/github-callback.ts`);
	const login_ghcb_server_dest = path.join(dest, 'routes/login/github/callback/+server.ts');

	// Copy Lib
	fs.copySync(global_types_src, global_types_dest, { overwrite: true });
	fs.copySync(hook_server_src, hook_server_dest, { overwrite: true });
	fs.copySync(auth_src, auth_dest, { overwrite: true });
	fs.copySync(auth_create_session_src, auth_create_session_dest, { overwrite: true });
	fs.copySync(auth_oauth_provider_src, auth_oauth_provider_dest, { overwrite: true });
	fs.copySync(auth_use_oauth_src, auth_use_oauth_dest, { overwrite: true });

	// Copy Routes
	fs.copySync(account_server_src, account_server_dest, { overwrite: true });
	fs.copySync(account_svelte_src, account_svelte_dest, { overwrite: true });
	fs.copySync(login_server_src, login_server_dest, { overwrite: true });
	fs.copySync(login_svelte_src, login_svelte_dest, { overwrite: true });
	fs.copySync(login_gh_server_src, login_gh_server_dest, { overwrite: true });
	fs.copySync(login_ghcb_server_src, login_ghcb_server_dest, { overwrite: true });
};
