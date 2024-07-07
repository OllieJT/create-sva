import { z } from "zod";

const gh_email = z.object({
	email: z.string(),
	primary: z.boolean(),
	verified: z.boolean(),
	visibility: z.union([z.literal("private"), z.literal("public")]).nullable(),
});

const gh_user = z.object({
	login: z.string(),
	id: z.number(),
	name: z.string(),
	avatar_url: z.string().nullable(),
});

export const get_github_user_email = async ({ accessToken }: { accessToken: string }) => {
	const data = await fetch("https://api.github.com/user/emails", {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	})
		.then((res) => res.json())
		.then((res) => z.array(gh_email).parse(res));

	const verified_emails = data.filter((email) => email.verified === true);
	const email = data.find((email) => email.primary === true) || verified_emails[0];

	return email;
};

export const get_github_user_profile = async ({ accessToken }: { accessToken: string }) => {
	const data = await fetch("https://api.github.com/user", {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	})
		.then((res) => res.json())
		.then((res) => gh_user.safeParse(res));

	return data;
};

export const get_github_user = async ({ accessToken }) => {
	const github_user = await get_github_user_profile({ accessToken });
	const github_user_email = await get_github_user_email({ accessToken });

	// delete github_user.email;

	return {
		...github_user,
		email_verified: github_user_email.verified,
		email_address: github_user_email.email,
	};
};
