<script lang="ts">
	import type { Snippet } from "svelte";

	let { children, title }: { children: Snippet; title: string } = $props();
</script>

<div class="rounded-lg bg-slate-900/75 ring-1 ring-slate-800">
	<div class="p-4 pt-6 md:p-6 md:pb-4">
		<h2 class="text-xs font-medium uppercase tracking-wider text-slate-400">{title}</h2>
	</div>
	<ul class="flex flex-col items-stretch divide-y divide-slate-800/50 border-t border-slate-800/50">
		{@render children()}
	</ul>
</div>
