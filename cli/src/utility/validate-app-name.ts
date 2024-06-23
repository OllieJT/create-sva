import { remove_trailing_slash } from './remove-trailing-slash.js';

const validation_reg_exp = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;

//Validate a string against allowed package.json names
export const validate_app_name = (rawInput: string) => {
	const input = remove_trailing_slash(rawInput);
	const paths = input.split('/');

	// If the first part is a @, it's a scoped package
	const index_of_delimiter = paths.findIndex((p) => p.startsWith('@'));

	let app_name = paths[paths.length - 1];
	if (paths.findIndex((p) => p.startsWith('@')) !== -1) {
		app_name = paths.slice(index_of_delimiter).join('/');
	}

	if (input === '.' || validation_reg_exp.test(app_name ?? '')) {
		return;
	} else {
		return "App name must consist of only lowercase alphanumeric characters, '-', and '_'";
	}
};
