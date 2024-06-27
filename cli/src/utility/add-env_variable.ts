import { logger } from '$src/utility/logger.js';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';

export const add_env_variable = ({
	variables,
	project_dir,
}: {
	variables: { key: string; value: string }[];
	project_dir: string;
}) => {
	const env_example = fs.readFileSync(path.join(project_dir, '.env.example')).toString();

	logger.info('\n+ Adding env variables:');

	const env_rows = env_example.split('\n');
	variables.forEach((variable) => {
		const row = `${variable.key}="${variable.value}"`;
		env_rows.push(row);
		logger.info(`  + Added: ${chalk.green.bold(variable.key)}`);
	});

	const sorted_env_example = env_rows.sort().join('\n') + '\n';

	fs.writeFileSync(path.join(project_dir, '.env.example'), sorted_env_example);
	fs.writeFileSync(path.join(project_dir, '.env'), sorted_env_example);
};
