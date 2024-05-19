<script>
	import { onMount } from 'svelte';
	import { txt } from '$lib/utils/context.js';
	import background from '$lib/assets/howItWorksBg.svg';
</script>

<div id="services">
	<h1>{$txt.howItWorks.heading}</h1>
	{#each $txt.howItWorks.circles as circle, i}
		<div>
			<h2>
				{circle.mainText}
			</h2>
			<div class="circles"></div>
			<div class="vertical_line"></div>
			<p>
				{circle.subText}
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
	}
	h2,
	p {
		font-family: K2D;
		width: 17vw;
	}
	h2 {
		text-align: right;
	}
	p {
		text-wrap: pretty;
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
		height: 100%;
		position: absolute;
		z-index: -4;
		opacity: 0.2;
	}
	.dark_gradient {
		z-index: -1;
		position: absolute;
		width: 100%;
	}
	.dark_gradient.first {
		background: var(--shadow-gradient-top);
		height: 40vh;
		top: 0;
	}

	.dark_gradient.second {
		background: var(--shadow-gradient-bottom);
		bottom: 0;
		height: 25vh;
	}

	@media only screen and (max-width: 700px) {
		img {
			object-fit: cover;
		}
		div {
			width: 100%;
		}
		h2,
		p {
			width: 40%;
		}
		.circles {
			height: 1.5rem;
			width: 1.5rem;
		}
	}
	@media only screen and (min-width: 700px) and (max-width: 1139px) {
		img {
			object-fit: cover;
		}
		div {
			width: 100%;
		}
		h2,
		p {
			width: 33%;
		}
	}
</style>
