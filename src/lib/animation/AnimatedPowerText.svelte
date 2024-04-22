<script>
	export let txt;
	export let delay = 2;
</script>

<span class="mainText" style="--gradient-delay: {delay}s">
	{txt}
</span>

<style>
	.mainText {
		-webkit-animation:
			fadeIn 1s 0s forwards,
			gradientMove 2s var(--gradient-delay) forwards;
		-o-animation:
			fadeIn 1s 0s forwards,
			gradientMove 2s var(--gradient-delay) forwards;
		animation:
			fadeIn 1s 0s forwards,
			gradientMove 2s var(--gradient-delay) forwards;

		opacity: 0;
		background: -webkit-linear-gradient(0deg, #fff, #fff, #47deb1, #fa8cfa);

		background-size: 300% 100%;
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	@keyframes gradientMove {
		0% {
			background-position: top left;
		}
		100% {
			background-position: top left 100%;
		}
	}
</style>
