import { TITLE_TEXT } from '$src/data/constants.js';
import gradient from 'gradient-string';

const theme = {
	purple: '#9933FF',
	indigo: '#5E5EED',
	blue: '#30ABE8',
	mint: '#1AFFB2',
};

export const render_title = () => {
	const svapp_gradient = gradient(Object.values(theme));
	console.log(svapp_gradient.multiline(TITLE_TEXT));
};
