<script>
	import { onMount } from 'svelte';
	import { txt } from '$lib/context.js';
	import background from '$lib/assets/howItWorksBg.svg';

	let spans = [[], [], [], []];
	function animateTextOnScroll() {
		for (let x = 0; x < spans.length; x++)
			for (let i = 0; i < spans[x].length; i++) {
				if (spans[x][i].parentElement.getBoundingClientRect().top < window.innerHeight / 2) {
					let { left, top } = spans[x][i].getBoundingClientRect();
					top = top - window.innerHeight * 0.5;
					let opacityValue =
						1 - (top * 0.02 + left * 0.001) < 0.3
							? 0.3
							: 1 - (top * 0.02 + left * 0.001).toFixed(3);
					opacityValue = opacityValue > 1 ? 1 : opacityValue.toFixed(3);
					spans[x][i].style.opacity = opacityValue;
				}
			}
	}
</script>

<svelte:window on:scroll={animateTextOnScroll} />
<div id="services">
	<h1>{$txt.howItWorks.heading}</h1>
	{#each $txt.howItWorks.circles as circle, i}
		<div>
			<h2>{circle.mainText}</h2>
			<div class="circles"></div>
			<div class="vertical_line"></div>
			<p>
				{#each circle.subText as char, j}
					<span bind:this={spans[i][j]} class="char">{char}</span>
				{/each}
			</p>
		</div>
	{/each}

	<div class="dark_gradient first"></div>
	<div class="dark_gradient second"></div>
	<div class="imgContainer">
		<img src={background} alt="Curved 3d lines background with gradient colors" />
	</div>
</div>

<style>
	#services {
		width: 100%;
		padding-top: 5vh;
		height: 155vh;
		display: flex;
		align-items: center;
		flex-direction: column;
		position: relative;
	}
	div {
		position: relative;
		display: flex;
		justify-content: space-evenly;
		width: 60vw;
		height: 30vh;
	}
	.circles {
		height: 2em;
		width: 2em;
		border-radius: 100%;
		background-image: var(--text-gradient);
		position: sticky;
		top: 40%;
		z-index: -2;
	}
	.vertical_line {
		position: absolute;
		background-color: var(--secondary-color);
		opacity: 0.5;
		height: 100%;
		width: 6px;
		z-index: -3;
	}
	h1 {
		height: 30vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	h2,
	p {
		font-family: K2D;
		width: 17vw;
	}
	h2 {
		font-size: 2.5em;
		text-align: right;
	}
	p {
		font-size: 1.5em;
		text-wrap: pretty;
	}
	p span {
		opacity: 0.3;
	}

	.imgContainer {
		position: absolute;
		height: 100%;
		width: 100%;
		overflow: hidden;
	}
	img {
		top: 20vh;
		width: 115%;
		height: auto;
		position: absolute;
		z-index: -4;
		/* opacity: 0.15; */
		opacity: 0.2;
	}
	.dark_gradient {
		z-index: -1;
		position: absolute;
		width: 100%;
	}
	.dark_gradient.first {
		background: var(--shadow-gradient-top);
		height: 35vh;
		top: 0;
	}

	.dark_gradient.second {
		background: var(--shadow-gradient-bottom);
		bottom: 0;
		height: 25vh;
	}
</style>
