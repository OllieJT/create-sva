<script lang="ts">
	// Any data structure will be accepted
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let { data }: { data: Record<string, any> } = $props();
</script>

<code class="overflow-auto rounded-lg bg-slate-900 p-4 ring-2 ring-slate-800 md:p-6">
	<pre>{JSON.stringify(data, null, 2)}</pre>
</code>
