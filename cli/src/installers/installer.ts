import type { PackageManager } from "$src/data/get-user-pkg-manager.js";
import type { AvailablePackages, DatabaseSolution } from "$src/data/options.js";
import { adapter_auto_installer } from "$src/installers/installer.adapter-auto.js";
import { adapter_cloudflare_installer } from "$src/installers/installer.adapter-cloudflare.js";
import { adapter_netlify_installer } from "$src/installers/installer.adapter-netlify.js";
import { adapter_node_installer } from "$src/installers/installer.adapter-node.js";
import { adapter_vercel_installer } from "$src/installers/installer.adapter-vercel.js";
import { drizzle_installer } from "$src/installers/installer.drizzle.js";
import { husky_installer } from "$src/installers/installer.husky.js";
import { lucia_installer } from "$src/installers/installer.lucia.js";
import { tailwind_installer } from "$src/installers/installer.tailwind.js";
import { vscode_installer } from "$src/installers/installer.vscode.js";

// Turning this into a const allows the list to be iterated over for programmatically creating prompt options
// Should increase extensibility in the future

export interface InstallerOptions {
	project_dir: string;
	pkg_manager: PackageManager;
	no_install: boolean;
	packages?: PkgInstallerMap;
	project_name: string;
	scoped_app_name: string;
	database_solution: DatabaseSolution;
}

export type Installer = (opts: InstallerOptions) => void;

export type PkgInstallerMap = {
	[pkg in AvailablePackages]: {
		is_used: boolean;
		installer: Installer;
	};
};

export const initialize_packages = (packages: AvailablePackages[]): PkgInstallerMap => ({
	// SvelteKit adapters
	"adapter:auto": { is_used: packages.includes("adapter:auto"), installer: adapter_auto_installer },
	"adapter:cloudflare": {
		is_used: packages.includes("adapter:cloudflare"),
		installer: adapter_cloudflare_installer,
	},
	"adapter:netlify": {
		is_used: packages.includes("adapter:netlify"),
		installer: adapter_netlify_installer,
	},
	"adapter:node": { is_used: packages.includes("adapter:node"), installer: adapter_node_installer },
	"adapter:vercel": {
		is_used: packages.includes("adapter:vercel"),
		installer: adapter_vercel_installer,
	},

	// Auth solutions
	lucia: { is_used: packages.includes("lucia"), installer: lucia_installer },

	// CSS solutions
	tailwind: { is_used: packages.includes("tailwind"), installer: tailwind_installer },
	// shadcn: { is_used: packages.includes('shadcn'), installer: null },
	// bits_ui: { is_used: packages.includes('bits_ui'), installer: null },

	// Database solutions
	mysql: { is_used: packages.includes("mysql"), installer: drizzle_installer },
	sqlite: { is_used: packages.includes("sqlite"), installer: drizzle_installer },
	postgres: { is_used: packages.includes("postgres"), installer: drizzle_installer },

	vscode: { is_used: packages.includes("vscode"), installer: vscode_installer },
	husky: { is_used: packages.includes("husky"), installer: husky_installer },
});
