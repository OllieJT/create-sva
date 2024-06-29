<script lang="ts">
	import { page } from "$app/stores";
	import * as SVA from "$lib/sva";
</script>

<svelte:head>
	<title>Error {$page.status}</title>
</svelte:head>

<SVA.Page>
	<SVA.Header>
		<mark>Error {$page.status}</mark><br />
		<span>{$page.error?.message}</span>
	</SVA.Header>

	<SVA.Code data={$page} />
</SVA.Page>
