<script lang="ts">
	import type { Snippet } from "svelte";

	let { children, href }: { children: Snippet; href?: string } = $props();

	const dest = $derived.by(() => {
		if (!href) return "";
		if (href.startsWith("/")) return href;

		try {
			const url = new URL(href);
			// remove www.
			const hostname = url.hostname.replace(/^www\./, "");
			// remove trailing slash
			const pathname = url.pathname.replace(/\/$/, "");

			return hostname + pathname;
		} catch {
			return "";
		}
	});

	$inspect(dest);
</script>

<li class="grid gap-2">
	<svelte:element
		this={href ? "a" : "div"}
		{href}
		class="group flex items-center justify-between gap-2 p-4 text-slate-400 hover:bg-slate-800/50 hover:text-white md:px-6"
		target={href?.startsWith("http") ? "_blank" : undefined}
	>
		<span class="shrink-0 grow-0">
			{@render children()}
		</span>

		<span
			class="ml-4 flex-auto truncate text-right font-mono text-xs tracking-wide text-slate-500 group-hover:text-slate-400"
		>
			{dest}
		</span>

		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="h-5 w-5 opacity-50 transition-transform duration-100 ease-out group-hover:translate-x-1 group-hover:opacity-100"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
		</svg>
	</svelte:element>
</li>
