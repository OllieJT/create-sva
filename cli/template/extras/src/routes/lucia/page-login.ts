import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	if (event.locals.user) throw redirect(302, '/account');

	return {};
}) satisfies PageServerLoad;
