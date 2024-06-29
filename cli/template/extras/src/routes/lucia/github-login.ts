import { use_oauth } from '$src/lib/server/auth';
import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export async function GET(event: RequestEvent): Promise<Response> {
	const oauth = use_oauth({ event, provider_id: 'github' });
	const login_url = await oauth.get_login_url();

	redirect(302, login_url.toString());
}
