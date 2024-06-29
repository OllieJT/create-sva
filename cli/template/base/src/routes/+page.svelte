<script lang="ts">
	import * as SVA from "$lib/sva";
</script>

<svelte:head>
	<title>SVA</title>
	<meta name="description" content="Svelte App Starter" />
</svelte:head>

<SVA.Page>
	<SVA.Header>
		<span>Great Work.</span>
		<br />
		<mark>You're all set!</mark>
	</SVA.Header>

	<SVA.ListContainer title="Pages">
		<SVA.ListItem href="/account">User Account</SVA.ListItem>
		<SVA.ListItem href="/login">Login</SVA.ListItem>
	</SVA.ListContainer>

	<SVA.ListContainer title="Useful Documentation">
		<SVA.ListItem href="https://github.com/OllieJT/create-sva">create-sva</SVA.ListItem>
		<SVA.ListItem href="https://svelte.dev/">Svelte</SVA.ListItem>
		<SVA.ListItem href="https://kit.svelte.dev/">SvelteKit</SVA.ListItem>
		<SVA.ListItem href="https://www.typescriptlang.org/">Typescript</SVA.ListItem>
		<SVA.ListItem href="https://tailwindcss.com">Tailwind CSS</SVA.ListItem>
		<SVA.ListItem href="https://lucia-auth.com/">Lucia</SVA.ListItem>
		<SVA.ListItem href="https://orm.drizzle.team/">Drizzle</SVA.ListItem>
		<SVA.ListItem href="https://typicode.github.io/husky/">Husky</SVA.ListItem>
		<SVA.ListItem href="https://prettier.io/">Prettier</SVA.ListItem>
		<SVA.ListItem href="https://eslint.org/">ESLint</SVA.ListItem>
	</SVA.ListContainer>
</SVA.Page>
