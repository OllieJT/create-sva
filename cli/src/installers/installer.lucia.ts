import { PKG_ROOT } from "$src/data/constants.js";
import { type Installer } from "$src/installers/installer.js";
import { add_env_variable } from "$src/utility/add-env_variable.js";
import { add_pkg_dependency } from "$src/utility/add-pkg-dependency.js";
import fs from "fs-extra";
import path from "path";

export const lucia_installer: Installer = ({ project_dir, database_solution }) => {
	// Add dependencies to package json

	add_pkg_dependency({
		project_dir,
		dependencies: ["lucia", "@lucia-auth/adapter-drizzle", "arctic"],
		is_dev_dependency: false,
	});

	add_env_variable({
		project_dir,
		variables: [
			{ key: "GITHUB_CLIENT_ID", value: "" },
			{ key: "GITHUB_CLIENT_SECRET", value: "" },
		],
	});

	// Moving Files

	const template_dir = path.join(PKG_ROOT, "template/extras/lucia");
	const routes_dir = path.join(project_dir, "src/routes");
	const auth_dir = path.join(project_dir, "src/lib/server/auth");
	fs.mkdirSync(auth_dir, { recursive: true });

	// Framework

	const global_types_src = path.join(template_dir, `app.d.ts`);
	const global_types_dest = path.join(project_dir, "src/app.d.ts");
	fs.copySync(global_types_src, global_types_dest, { overwrite: true });

	const hook_server_src = path.join(template_dir, `hooks.server.ts`);
	const hook_server_dest = path.join(project_dir, "src/hooks.server.ts");
	fs.copySync(hook_server_src, hook_server_dest, { overwrite: true });

	// Lib

	const auth_src = path.join(template_dir, `lib/with-${database_solution}.ts`);
	const auth_dest = path.join(auth_dir, "index.ts");
	fs.copySync(auth_src, auth_dest, { overwrite: true });

	const auth_create_session_src = path.join(template_dir, `lib/create-session.ts`);
	const auth_create_session_dest = path.join(auth_dir, "create-session.ts");
	fs.copySync(auth_create_session_src, auth_create_session_dest, { overwrite: true });

	const auth_oauth_provider_src = path.join(template_dir, `lib/oauth.ts`);
	const auth_oauth_provider_dest = path.join(auth_dir, "oauth.ts");
	fs.copySync(auth_oauth_provider_src, auth_oauth_provider_dest, { overwrite: true });

	const auth_use_oauth_src = path.join(template_dir, `lib/use-oauth.ts`);
	const auth_use_oauth_dest = path.join(auth_dir, "use-oauth.ts");
	fs.copySync(auth_use_oauth_src, auth_use_oauth_dest, { overwrite: true });

	// Routes

	const account_server_src = path.join(template_dir, `routes/account/+page.server.ts`);
	const account_server_dest = path.join(routes_dir, "account/+page.server.ts");
	fs.copySync(account_server_src, account_server_dest, { overwrite: true });

	const account_svelte_src = path.join(template_dir, `routes/account/+page.svelte`);
	const account_svelte_dest = path.join(routes_dir, "account/+page.svelte");
	fs.copySync(account_svelte_src, account_svelte_dest, { overwrite: true });

	const login_server_src = path.join(template_dir, `routes/login/+page.server.ts`);
	const login_server_dest = path.join(routes_dir, "login/+page.server.ts");
	fs.copySync(login_server_src, login_server_dest, { overwrite: true });

	const login_svelte_src = path.join(template_dir, `routes/login/+page.svelte`);
	const login_svelte_dest = path.join(routes_dir, "login/+page.svelte");
	fs.copySync(login_svelte_src, login_svelte_dest, { overwrite: true });

	const login_gh_server_src = path.join(template_dir, `routes/login/github/+server.ts`);
	const login_gh_server_dest = path.join(routes_dir, "login/github/+server.ts");
	fs.copySync(login_gh_server_src, login_gh_server_dest, { overwrite: true });

	const login_ghcb_server_src = path.join(template_dir, `routes/login/github/callback/+server.ts`);
	const login_ghcb_server_dest = path.join(routes_dir, "login/github/callback/+server.ts");
	fs.copySync(login_ghcb_server_src, login_ghcb_server_dest, { overwrite: true });
};
