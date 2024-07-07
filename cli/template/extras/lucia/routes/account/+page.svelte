<script lang="ts">
	import * as SVA from "$lib/sva";

	let { data } = $props();
</script>

<SVA.Page>
	<SVA.Header>
		<span>Account</span> <mark>{data.user.display_name}</mark>
	</SVA.Header>

	<SVA.Code data={data.user} />

	<form action="/account?/logout" method="post">
		<button
			type="submit"
			class="rounded-lg bg-rose-500/30 p-4 text-rose-300 ring-1 ring-rose-500/60 hover:bg-rose-700 hover:text-white hover:ring-transparent md:px-6"
			>Logout</button
		>
	</form>
</SVA.Page>
