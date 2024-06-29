<script lang="ts">
	import { page } from "$app/stores";
	import type { Snippet } from "svelte";

	let { children }: { children: Snippet } = $props();

	const breadcrumbs = $derived.by(() => $page.url.pathname.split("/").filter(Boolean));
</script>

{#snippet breadcrumb({ href, label }: { label: string; href: string })}
	<li class="flex items-center gap-1.5">
		<span>/</span>
		<a class="hover:text-amber-400" {href}>{label}</a>
	</li>
{/snippet}

<header class="flex flex-col items-stretch gap-2">
	<ul
		class="flex items-center gap-1.5 text-sm font-medium leading-normal tracking-wide text-slate-400"
	>
		{@render breadcrumb({ href: "/", label: "Homepage" })}
		{#each breadcrumbs as crumb, i}
			{@render breadcrumb({ href: "/" + breadcrumbs.slice(0, i + 1).join("/"), label: crumb })}
		{/each}
	</ul>
	<h1 class="text-3xl font-bold sm:text-4xl md:text-5xl">{@render children()}</h1>
</header>
