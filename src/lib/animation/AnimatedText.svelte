<script>
	export let txt = 'Some random text string';
	export let initialDelay = 0;
	export let duration = 0.5;
	export let delayDivisor = 10;
	initialDelay = initialDelay / 1000;
</script>

{#each txt.split('') as char, i}
	{#if char === '^'}
		<br />
	{:else if char === ' '}
		<span style="display: inline;">{char}</span>
	{:else}
		<span
			style="animation-delay: {initialDelay + (0.5 + i / delayDivisor)}s; --duration: {duration}s"
			>{char}</span
		>
	{/if}
{/each}

<style>
	span {
		display: inline-block;
		position: relative;
		animation: textAnimation var(--duration) forwards;
		bottom: -1em;
		opacity: 0;
	}
	@keyframes textAnimation {
		0% {
			transform: rotate(45deg);
			bottom: -0.2em;
			opacity: 0;
			color: #47deb1;
		}

		20% {
			color: #00dbf0;
		}
		40% {
			color: #00cfff;
		}
		50% {
			bottom: 0.2em;
		}
		60% {
			color: #8db4ff;
		}
		80% {
			color: #fa8cfa;
		}

		100% {
			transform: rotate(0deg);

			bottom: 0;
			opacity: 1;
			color: var(--secondary-color);
		}
	}
</style>
