<script lang="ts">
	import type { Snippet } from "svelte";

	let { children }: { children: Snippet } = $props();
</script>

<div
	id="sva-layout"
	class="relative z-0 flex h-auto min-h-svh w-full flex-col items-center justify-center gap-6 overflow-clip bg-gradient-to-b from-slate-900 to-slate-950 px-4 py-16 text-slate-100 md:gap-8 md:px-6 md:py-24"
>
	<div class="grid w-full max-w-xl flex-auto place-items-center">
		{@render children()}
	</div>

	<footer
		class="rounded-lg bg-slate-900/80 px-6 py-4 tracking-wide text-slate-300 ring-1 ring-slate-800 backdrop-blur"
	>
		<p>
			Built with <a
				class="font-medium text-slate-50 underline decoration-slate-600 decoration-2 underline-offset-4 hover:text-amber-500 hover:decoration-orange-500/50"
				href="https://github.com/OllieJT/create-sva">create sva</a
			>
		</p>
	</footer>
</div>

<style lang="postcss">
	:global(#sva-layout) {
		background-color: theme(colors.slate.950);
		--sva-color-1: #8537d1;
		--sva-color-2: #be3793;
		--sva-color-3: #e7445f;
		--sva-color-4: #fb5c28;
		--sva-color-5: #fe9737;
	}

	:global(#sva-layout mark) {
		background-size: 100% 100%;
		background-position: 0px 0px;
		background-image: linear-gradient(
			30deg,
			var(--sva-color-1),
			var(--sva-color-2),
			var(--sva-color-3),
			var(--sva-color-4),
			var(--sva-color-5)
		);
		/* Clip text */
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}
</style>
