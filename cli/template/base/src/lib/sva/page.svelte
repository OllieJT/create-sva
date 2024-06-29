<script lang="ts">
	import type { Snippet } from "svelte";

	let { children }: { children: Snippet } = $props();
</script>

<main class="flex w-full flex-col items-stretch gap-6 md:gap-8">
	{@render children()}
</main>
