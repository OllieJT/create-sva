<svelte:head>
	<title>SVA</title>
	<meta name="description" content="Svelte App Starter" />
</svelte:head>

<section>
	<h1>
		Lucia <mark>Login</mark>
	</h1>

	<h2>Providers</h2>

	<ul>
		<li><a href="/login/github"> Login with GitHub </a></li>
	</ul>
</section>

<style>
	h1 {
		width: 100%;
		color: white;
		font-size: 3rem;
		line-height: 1.05;
		font-weight: 600;
		margin: 1rem 0;
	}

	h1 mark {
		background: none;
		color: rgb(0, 255, 0);
	}

	h2 {
		color: rgba(255, 255, 255, 0.6);
		margin: 1rem 0;
	}

	ul {
		font-size: 1.5rem;
		line-height: 1.5;
	}
	ul a:hover {
		color: rgb(0, 255, 0);
		text-decoration: underline;
	}
</style>
