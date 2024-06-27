import { PKG_ROOT } from '$src/data/constants.js';
import { DatabaseSolution } from '$src/data/options.js';
import { AvailableDependencies } from '$src/installers/dependency-version-map.js';
import { type Installer } from '$src/installers/installer.js';
import { add_env_variable } from '$src/utility/add-env_variable.js';
import { add_pkg_dependency } from '$src/utility/add-pkg-dependency.js';
import { update_pkg_json } from '$src/utility/update-pkg-json.js';
import fs from 'fs-extra';
import path from 'path';

const database_type = {
	mysql: {
		dependencies: ['mysql2'],
		dev_dependencies: [],
		database_url: 'mysql://<username>:<password>@<hostname>:<port>/<database>',
	},
	postgres: {
		dependencies: ['postgres'],
		dev_dependencies: [],
		database_url: 'postgresql://<username>:<password>@<hostname>:<port>/<database>',
	},
	sqlite: {
		dependencies: ['better-sqlite3'],
		dev_dependencies: ['@types/better-sqlite3'],
		database_url: './local.db',
	},
} satisfies Record<
	DatabaseSolution,
	{
		dependencies: AvailableDependencies[];
		dev_dependencies: AvailableDependencies[];
		database_url: string;
	}
>;

export const drizzle_installer: Installer = ({ packages, project_dir, database_solution }) => {
	// Add dependencies to package json

	const database = database_type[database_solution];

	add_pkg_dependency({
		project_dir,
		dependencies: ['drizzle-kit', 'eslint-plugin-drizzle', ...database.dev_dependencies],
		is_dev_dependency: true,
	});

	add_pkg_dependency({
		project_dir,
		dependencies: ['drizzle-orm', ...database.dependencies],
		is_dev_dependency: false,
	});

	add_env_variable({
		project_dir,
		variables: [{ key: 'DATABASE_URL', value: database.database_url }],
	});

	// Moving Files

	const source = path.join(PKG_ROOT, 'template/extras');
	const dest_server = path.join(project_dir, 'src/lib/server');

	// Setup config files

	const config_src = path.join(source, `config/drizzle-config-${database_solution}.ts`);
	const config_dest = path.join(project_dir, 'drizzle.config.ts');
	let config_content = fs.readFileSync(config_src, 'utf-8');

	// Setup schema files

	const schema_suffix = packages?.['lucia'].is_used ? '-lucia' : '';
	const schema_src = path.join(
		source,
		`src/lib/server/schema-${database_solution}${schema_suffix}.ts`,
	);
	const schema_dest = path.join(dest_server, 'schema.ts');
	let schema_content = fs.readFileSync(schema_src, 'utf-8');

	// Setup client files

	const client_src = path.join(source, `src/lib/server/db-${database_solution}.ts`);
	const client_dest = path.join(dest_server, 'db.ts');

	// Add db:* scripts to package.json
	update_pkg_json({
		project_dir,
		update: (pkg) => {
			pkg.scripts = {
				...pkg.scripts,
				'db:push': 'drizzle-kit push',
				'db:studio': 'drizzle-kit studio',
				'db:generate': 'drizzle-kit generate',
				'db:migrate': 'drizzle-kit migrate',
			};
			return pkg;
		},
	});

	// Write files to project directory

	fs.copySync(config_src, config_dest, { overwrite: true });
	fs.mkdirSync(path.dirname(schema_dest), { recursive: true });
	fs.writeFileSync(schema_dest, schema_content);
	fs.writeFileSync(config_dest, config_content);
	fs.copySync(client_src, client_dest, { overwrite: true });
};
