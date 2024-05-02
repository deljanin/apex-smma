<script>
	export let delay = 0;
	export let duration = 400;
	let animate = false;

	setTimeout(() => {
		animate = true;
	}, delay);
</script>

<span class:animate style="--duration: {duration}">
	<slot />
</span>

<style>
	span {
		opacity: 0;
	}
	.animate {
		animation: fadeIn var(--duration) forwards;
	}
</style>
