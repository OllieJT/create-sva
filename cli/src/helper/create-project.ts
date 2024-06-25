import { get_user_pkg_manager } from '$src/data/globals.js';
import { install_packages } from '$src/helper/install-packages.js';
import { scaffold_project } from '$src/helper/scaffold-project.js';
import { InstallerOptions, PkgInstallerMap } from '$src/installers/installer.js';
import path from 'path';

type Options = Omit<InstallerOptions, 'project_dir' | 'pkg_manager'> & {
	packages: PkgInstallerMap;
};

export const createProject = async ({
	database_solution,
	no_install,
	project_name,
	scoped_app_name,
	packages,
}: Options) => {
	const pkg_manager = get_user_pkg_manager();
	const project_dir = path.resolve(process.cwd(), project_name);

	// Bootstraps the base Next.js application
	await scaffold_project({
		database_solution,
		no_install,
		project_name,
		scoped_app_name,
		packages,
		pkg_manager,
		project_dir,
	});

	// Install the selected packages
	install_packages({
		database_solution,
		no_install,
		project_name,
		scoped_app_name,
		packages,
		pkg_manager,
		project_dir,
	});

	// Select necessary _app,index / layout,page files

	// select_app_file({ project_dir, packages });
	// select_index_file({ project_dir, packages });

	return project_dir;
};
