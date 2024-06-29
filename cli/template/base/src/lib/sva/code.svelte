<script lang="ts">
	let { data }: { data: Record<string, any> } = $props();
</script>

<code class="overflow-auto rounded-lg bg-slate-900 p-4 ring-2 ring-slate-800 md:p-6"
	><pre>{JSON.stringify(data, null, 2)}</pre></code
>
