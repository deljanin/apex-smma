<script>
	import { handleAnchorClick } from '$lib/utils/smoothScroll.js';
	import Dots from './dots.svelte';
	import { txt } from '$lib/utils/context.js';
	import { onMount } from 'svelte';
	import AnimatedText from '$lib/animation/AnimatedText.svelte';
	import AnimatedPowerText from '$lib/animation/AnimatedPowerText.svelte';
	import SmoothAppear from '$lib/animation/SmoothAppear.svelte';

	let isVisible = false;
	onMount(() => {
		isVisible = true;
	});
</script>

{#if isVisible}
	<div id="landing">
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
			<button>
				<span class="text">{$txt.landing.buttonText}</span>
				<span class="effect"></span></button
			>
		</a>

		<div class="dots_wrapper">
			<Dots />
		</div>
	</div>
{/if}

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
		position: relative;
		border: none;
		z-index: 2;
		cursor: pointer;
		transform: translateY(13vh);
		font-family: Raleway;
		font-size: 2em;
		border-radius: 100px;
		padding: 0.5em 1.5em;
		color: var(--secondary-color);
		background-color: var(--nav-transparent);
		backdrop-filter: blur(12px);
		opacity: 0;
		animation: buttonAnimation 1s 5s forwards;
		transition: all 400ms;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 7px;
		overflow: hidden;
	}
	.text {
		z-index: 2;
	}
	button:hover {
		transition: all 400ms;
		box-shadow:
			0px 0px 5px #47deb1,
			0px 0px 15px #fa8cfa;
		transition-duration: 0.7s;
	}
	button:hover .effect {
		background-image: var(--text-gradient);
		transform: scale(18);
		transform-origin: center;
		opacity: 1;
		transition-duration: 0.5s;
	}
	.effect {
		position: absolute;
		width: 15px;
		height: 15px;
		background-image: var(--text-gradient-dark);
		border-radius: 50%;
		z-index: 1;
		opacity: 0;
		transition-duration: 0.5s;
	}
	button:active {
		scale: 0.9;
	}

	@keyframes buttonAnimation {
		from {
			opacity: 0;
			bottom: -2rem;
		}
		to {
			opacity: 1;
			bottom: 0;
		}
	}

	.dots_wrapper {
		filter: blur(4px);
		z-index: 0;
		position: absolute;
		top: 5%;
		max-width: 50rem;
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;
		opacity: 0;
		animation: fadeIn 2s forwards;
	}
	@media only screen and (max-width: 700px) {
		h1,
		h2 {
			margin: auto;
			max-width: 95%;
		}
		h1 {
			letter-spacing: normal;
		}
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
