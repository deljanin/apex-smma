<script>
	export let txt = 'Some random text string';
	export let initialDelay = 0;
	export let duration = 0.5;
	export let delayDivisor = 10;

	initialDelay = initialDelay / 1000;

	let wordLength = txt.split(' ').map((word) => word.length);
	let counter = new Array(wordLength.length);
	counter[0] = wordLength[0];
	for (let i = 1; i < counter.length; i++) {
		counter[i] = wordLength[i] + counter[i - 1];
	}
	counter.unshift(0);
	counter.pop();
</script>

{#each txt.split(' ') as word, i}
	{#if word.includes('^')}
		{@const words = word.split('^')}
		<span>
			{#each words[0] as char, j}
				<span
					style="animation-delay: {0.5 + (j + counter[i]) / delayDivisor}s; --duration: {duration}s"
					>{char}</span
				>
			{/each}
		</span>
		<br />
		<span>
			{#each words[1] as char, j}
				<span
					style="animation-delay: {0.5 + (j + counter[i]) / delayDivisor}s; --duration: {duration}s"
					>{char}</span
				>
			{/each}
		</span>
	{:else}
		<span>
			{#each word as char, j}
				<span
					style="animation-delay: {0.5 + (j + counter[i]) / delayDivisor}s; --duration: {duration}s"
					>{char}</span
				>
			{/each}
		</span>
	{/if}

	<span style="display: inline;"> </span>
{/each}

<style>
	span {
		z-index: inherit;
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
			color: #fa8cfa;
		}

		20% {
			color: #8db4ff;
		}
		40% {
			color: #00cfff;
		}
		50% {
			bottom: 0.2em;
		}
		60% {
			color: #00dbf0;
		}
		80% {
			color: #47deb1;
		}

		100% {
			transform: rotate(0deg);
			bottom: 0;
			opacity: 1;
			color: var(--secondary-color);
		}
	}
</style>
