<script>
	import "../app.pcss";

	let { children } = $props();
</script>

<div class="app">
	<main>
		{@render children()}
	</main>

	<footer>
		<p>Built with <a href="https://github.com/OllieJT/create-sva">create sva</a></p>
	</footer>

	<div class="background"></div>
</div>

<style>
	.app {
		--theme-color-1: #8537d1;
		--theme-color-2: #be3793;
		--theme-color-3: #e7445f;
		--theme-color-4: #fb5c28;
		--theme-color-5: #fe9737;
		--theme-gradient: conic-gradient(
			from 0deg at 50% 50%,
			var(--theme-color-1) 3%,
			var(--theme-color-2) 16%,
			var(--theme-color-3) 27%,
			var(--theme-color-4) 38%,
			var(--theme-color-5) 50%,
			var(--theme-color-4) 63%,
			var(--theme-color-3) 76%,
			var(--theme-color-2) 88%,
			var(--theme-color-1) 100%
		);

		display: flex;
		flex-direction: column;
		min-height: 100vh;
		position: relative;
		overflow: clip;
		z-index: 0;
		background-color: rgb(16, 16, 16);
		color: rgba(255, 255, 255, 0.8);
		text-align: center;
	}

	.background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-size: 100% 100%;
		background-position: 0px 0px;
		background-image: var(--theme-gradient);
		animation: Rotate 10s linear infinite;
		filter: blur(40px);
		mix-blend-mode: hue;
		z-index: 10;
		pointer-events: none;
	}

	@keyframes Rotate {
		from {
			transform: rotate(0deg) scale(2);
		}
		to {
			transform: rotate(360deg) scale(2);
		}
	}

	main {
		flex: 1;
		display: grid;
		place-items: center;
		width: 100%;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1.5rem 1rem;
		border-top: 2px solid rgba(0, 255, 0, 0.2);
		margin: 0 2rem;
	}

	footer a {
		color: rgb(0, 255, 0);
	}
	footer a:hover {
		text-decoration: underline;
	}
</style>
