<script lang="ts">
	import * as SVA from "$lib/sva";
	import "../app.pcss";

	let { children } = $props();
</script>

<SVA.Layout>
	{@render children()}
</SVA.Layout>
