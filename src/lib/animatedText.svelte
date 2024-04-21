<script>
	import { onMount } from 'svelte';
	export let txt = 'Some random text string';
	export let duration = 0.5;
	export let delayDivisor = 10;
	export let animationDelay = 1000;
	let animate = false;

	let wordLength = txt.split(' ').map((word) => word.length);

	let counter = new Array(wordLength.length);
	counter[0] = wordLength[0];
	for (let i = 1; i < counter.length; i++) {
		counter[i] = wordLength[i] + counter[i - 1];
	}
	counter.unshift(0);
	counter.pop();

	onMount(() => {
		setTimeout(() => {
			animate = true;
		}, animationDelay);
	});
</script>

<span class:animate class="animatedText">
	{#each txt.split(' ') as word, i}
		{#if word.startsWith('[')}
			<span class="mainText" style="--gradient-delay: {3}s">
				{word.replace('[', '').replace(']', '')}
			</span>
		{:else}
			<span>
				{#each word as char, j}
					{#if char === '^'}
						<br />
					{:else if char === ' '}
						<span style="display: inline;">{char}</span>
					{:else}
						<span
							style="animation-delay: {0.5 +
								(j + counter[i]) / delayDivisor}s; --duration: {duration}s">{char}</span
						>
					{/if}
				{/each}
			</span>
		{/if}
	{/each}
</span>

<style>
	.animatedText {
		opacity: 0;
	}
	.animate {
		animation: fadeIn 0.4s forwards;
	}

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

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	.animatedText span span {
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
