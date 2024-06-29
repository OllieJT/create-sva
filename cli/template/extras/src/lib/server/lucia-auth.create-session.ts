import { lucia } from "$lib/server/auth";
import { type RequestEvent } from "@sveltejs/kit";
import type { Session } from "lucia";

type CreateNewSession = (props: {
	user_id: string;
	event: Pick<RequestEvent, "cookies">;
}) => Promise<Session>;

export const create_new_session = (async ({ event, user_id }) => {
	const session = await lucia.createSession(user_id, {
		// Session Attributes
	});
	const session_cookie = lucia.createSessionCookie(session.id);

	event.cookies.set(session_cookie.name, session_cookie.value, {
		path: ".",
		...session_cookie.attributes,
	});

	return session;
}) satisfies CreateNewSession;
