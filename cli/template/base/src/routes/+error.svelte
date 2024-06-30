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
		<span>{$page.error?.title}</span>
	</SVA.Header>

	<p class="text-xl sm:text-2xl md:text-3xl">{$page.error?.message}</p>

	<SVA.Code data={$page} />
</SVA.Page>
