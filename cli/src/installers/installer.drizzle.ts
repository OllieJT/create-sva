import { PKG_ROOT } from "$src/data/constants.js";
import type { DatabaseSolution } from "$src/data/options.js";
import type { AvailableDependencies } from "$src/installers/dependency-version-map.js";
import { type Installer } from "$src/installers/installer.js";
import { add_env_variable } from "$src/utility/add-env_variable.js";
import { add_pkg_dependency } from "$src/utility/add-pkg-dependency.js";
import { update_pkg_json } from "$src/utility/update-pkg-json.js";
import fs from "fs-extra";
import path from "path";

const database_type = {
	mysql: {
		dependencies: ["mysql2"],
		dev_dependencies: [],
		database_url: "mysql://<username>:<password>@<hostname>:<port>/<database>",
	},
	postgres: {
		dependencies: ["postgres"],
		dev_dependencies: [],
		database_url: "postgresql://<username>:<password>@<hostname>:<port>/<database>",
	},
	sqlite: {
		dependencies: ["better-sqlite3"],
		dev_dependencies: ["@types/better-sqlite3"],
		database_url: "./local.db",
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
		dependencies: ["drizzle-kit", "eslint-plugin-drizzle", ...database.dev_dependencies],
		is_dev_dependency: true,
	});

	add_pkg_dependency({
		project_dir,
		dependencies: ["drizzle-orm", ...database.dependencies],
		is_dev_dependency: false,
	});

	add_env_variable({
		project_dir,
		variables: [{ key: "DATABASE_URL", value: database.database_url }],
	});

	// Moving Files

	const template_dir = path.join(PKG_ROOT, "template/extras/drizzle");
	const db_dir = path.join(project_dir, "src/lib/server/db");
	fs.mkdirSync(db_dir, { recursive: true });

	// Setup config files

	const config_src = path.join(template_dir, `drizzle.config-${database_solution}.ts`);
	const config_dest = path.join(project_dir, "drizzle.config.ts");
	fs.copySync(config_src, config_dest, { overwrite: true });

	// Setup schema files

	if (packages?.["lucia"].is_used) {
		const schema_lucia_src = path.join(template_dir, `lib/schema-${database_solution}-lucia.ts`);
		const schema_lucia_dest = path.join(db_dir, "schema.lucia.ts");
		fs.copySync(schema_lucia_src, schema_lucia_dest, { overwrite: true });

		const schema_src = path.join(template_dir, `lib/schema-lucia.ts`);
		const schema_dest = path.join(db_dir, "schema.ts");
		fs.copySync(schema_src, schema_dest, { overwrite: true });
	} else {
		const schema_demo_src = path.join(template_dir, `lib/schema-${database_solution}-demo.ts`);
		const schema_demo_dest = path.join(db_dir, "schema.demo.ts");
		fs.copySync(schema_demo_src, schema_demo_dest, { overwrite: true });

		const schema_src = path.join(template_dir, `lib/schema-demo.ts`);
		const schema_dest = path.join(db_dir, "schema.ts");
		fs.copySync(schema_src, schema_dest, { overwrite: true });
	}

	// Setup client files

	const client_src = path.join(template_dir, `lib/db-${database_solution}.ts`);
	const client_dest = path.join(db_dir, "index.ts");
	fs.copySync(client_src, client_dest, { overwrite: true });

	// Add db:* scripts to package.json
	update_pkg_json({
		project_dir,
		update: (pkg) => {
			pkg.scripts = {
				...pkg.scripts,
				"db:push": "drizzle-kit push",
				"db:studio": "drizzle-kit studio",
				"db:generate": "drizzle-kit generate",
				"db:migrate": "drizzle-kit migrate",
			};
			return pkg;
		},
	});
};
