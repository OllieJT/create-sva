<script lang="ts">
	let { data } = $props();
</script>

<pre>{JSON.stringify(data.user, null, 2)}</pre>

<form action="/account?/logout" method="post">
	<button type="submit">Logout</button>
</form>
