<script>
	import { txt } from '$lib/utils/context.js';
	import SilverPlanIcon from '$lib/assets/icons/SilverPlanIcon.svg';
	import GoldPlanIcon from '$lib/assets/icons/GoldPlanIcon.svg';
	import PlatinumPlanIcon from '$lib/assets/icons/PlatinumPlanIcon.svg';
	import { handleAnchorClickCenter } from '$lib/utils/smoothScroll.js';

	const icons = {
		0: SilverPlanIcon,
		1: GoldPlanIcon,
		2: PlatinumPlanIcon
	};
	const links = {
		0: '#silver-plan',
		1: '#gold-plan',
		2: '#platinum-plan'
	};
</script>

<div id="offers">
	<h1>{$txt.whatWeOffer.heading}</h1>
	<div class="cards">
		{#each $txt.whatWeOffer.cards as card, i}
			<div class="group">
				<div class={`vertical-line l${i}`}></div>
				<a href={links[i]} on:click={handleAnchorClickCenter}>
					<div class="card">
						<div><img src={icons[i]} alt={card.frontText} /></div>
						<span class="powerText frontText">{card.frontText}</span>
						<span class="backText">{card.backText}</span>
					</div>
				</a>
			</div>
		{/each}
	</div>
</div>

<style>
	#offers {
		background-color: var(--primary-color);
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 13vh;
	}
	h1 {
		align-self: center;
	}
	.cards {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
		align-items: center;
	}
	.group {
		position: relative;
		padding: 1em;
	}

	.card {
		width: 20rem;
		height: 30rem;
		border-style: solid;
		border-width: 1px;
		border-image: var(--card-border) 30;
		border-radius: 25px;
		text-align: center;
		background-color: var(--transparent-primary);
		backdrop-filter: blur(7px);
		display: flex;
		gap: 4vh;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: 0.4s all ease;
	}
	.card:hover {
		transition: 0.4s background-color scale ease;
		background-color: var(--card-color);
		scale: 1.05;
	}

	.card:hover::before {
		content: '';
		z-index: -1;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: var(--main-gradient);
		transform: translate3d(0px, 20px, 0) scale(0.95);
		filter: blur(20px);
		opacity: 0;
		animation: fadeIn 1s forwards;
		border-radius: inherit;
	}

	.card:hover::after {
		content: '';
		z-index: -1;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: inherit;
		border-radius: inherit;
	}

	.vertical-line {
		position: absolute;
		top: 0;
		bottom: 0;
		margin: auto;
		left: 50%;
		height: 40rem;
		width: 4px;
		background: var(--line-gradient);
	}
	.frontText {
		max-width: 100%;
		font-family: Raleway;
		font-size: 2rem;
		display: block;
	}
	.backText {
		display: none;
	}
	.card img {
		width: 75%;
	}
	img {
		max-width: 100%;
		height: auto;
	}

	.vertical-line::after {
		content: '';
		display: block;
		position: absolute;
		height: 45px;
		width: 4px;
		border-radius: 25%;
		top: -25%;
		left: 0;
		background: var(--secondary-color);
		opacity: 0;
	}
	.l0::after {
		animation-delay: 2.5s !important;
		animation-timing-function: cubic-bezier(0.4, 0.26, 0, 0.97) !important;
		animation: run 5s forwards infinite;
	}

	.l1::after {
		animation-delay: 2s !important;
		animation-timing-function: cubic-bezier(0.4, 0.26, 0, 0.97) !important;
		animation: run 5s forwards infinite;
	}

	.l2::after {
		animation-delay: 1s !important;
		animation-timing-function: cubic-bezier(0.4, 0.26, 0, 0.97) !important;
		animation: run 5s forwards infinite;
	}
	@keyframes run {
		0% {
			opacity: 0;
			top: -5%;
		}
		20% {
			opacity: 1;
		}
		70% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			top: 90%;
		}
	}

	@media only screen and (max-width: 500px) {
		.card {
			width: 80vw;
		}
	}
	@media only screen and (max-width: 700px) {
		.cards {
			flex-direction: column;
			gap: 20vh;
			width: 100%;
		}
	}
</style>
