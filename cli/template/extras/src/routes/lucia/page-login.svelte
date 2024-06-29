<script lang="ts">
	import * as SVA from "$lib/sva";
</script>

<svelte:head>
	<title>SVA</title>
	<meta name="description" content="Svelte App Starter" />
</svelte:head>

<SVA.Page>
	<SVA.Header>
		<span>Lucia</span> <mark>Login</mark>
	</SVA.Header>

	<SVA.ListContainer title="Pages">
		<SVA.ListItem href="/account">User Account</SVA.ListItem>
	</SVA.ListContainer>

	<SVA.ListContainer title="Providers">
		<SVA.ListItem href="/login/github">Login with GitHub</SVA.ListItem>
	</SVA.ListContainer>
</SVA.Page>
