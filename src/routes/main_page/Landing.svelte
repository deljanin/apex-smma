<script>
	import { handleAnchorClick } from '$lib/smoothScroll.js';
	import Dots from './dots.svelte';
	import { txt } from '$lib/context.js';
	import { onMount } from 'svelte';
	import AnimatedText from '$lib/animation/AnimatedText.svelte';
	import AnimatedPowerText from '$lib/animation/AnimatedPowerText.svelte';
	import SmoothAppear from '$lib/animation/SmoothAppear.svelte';

	$: animate = false;
	onMount(() => {
		animate = true;
	});
</script>

<div id="landing">
	{#if animate}
		<SmoothAppear>
			<h1>
				<AnimatedPowerText
					txt={$txt.landing.heading1[0]}
					duration={1}
					delayDivisor="50"
					animationDelay="100"
				/>
				<AnimatedText
					txt={$txt.landing.heading1[1]}
					duration={1}
					delayDivisor="50"
					animationDelay="500"
				/>
			</h1>
		</SmoothAppear>
		<SmoothAppear delay={1000}>
			<h2>
				<AnimatedText
					txt={$txt.landing.heading2}
					duration={1}
					delayDivisor="50"
					initialDelay={500}
				/>
			</h2>
		</SmoothAppear>

		<a href="#contact" on:click={handleAnchorClick}>
			<button>{$txt.landing.buttonText}</button>
		</a>

		<div class="dots_wrapper">
			<Dots />
		</div>
	{/if}
</div>

<style>
	#landing {
		position: relative;
		width: 100%;
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	h1 {
		margin-bottom: 0.7rem;
	}
	h1,
	h2 {
		z-index: 1;
		color: var(--secondary-color);
		text-align: center;
		cursor: default;
		user-select: none;
	}

	a {
		z-index: 2;
	}
	button {
		border: none;
		z-index: 2;
		cursor: pointer;
		transform: translateY(13vh);

		font-family: Raleway;
		font-size: 2em;
		color: var(--secondary-color);
		border-radius: 100px;
		padding: 0.5em 1.5em;
		background-image: var(--text-gradient);
	}

	.dots_wrapper {
		filter: blur(4px);
		z-index: 0;
		position: absolute;
		top: 5%;
		max-width: 50em;
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;
	}
	@media only screen and (max-width: 700px) {
		#landing {
			overflow-x: hidden;
		}
		.dots_wrapper {
			width: 650px;

			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>
