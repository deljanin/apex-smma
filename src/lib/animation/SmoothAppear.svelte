<script>
	export let delay = 0;
	export let duration = 400;
	let animate = false;

	setTimeout(() => {
		animate = true;
	}, delay);
</script>

<span class:animate class="block" style="--duration: {duration}">
	<slot />
</span>

<style>
	.block {
		opacity: 0;
	}
	.animate {
		animation: fadeIn var(--duration) forwards;
	}
</style>
