import { TITLE_TEXT } from '$src/data/constants.js';
import gradient from 'gradient-string';

const theme = [
	'#8537D1',
	'#BE3793',
	'#E7445F',
	'#FB5C28',
	'#FE9737',
]

export const render_title = () => {
	const cli_gradient = gradient(theme);
	console.log(cli_gradient.multiline(TITLE_TEXT));
};
