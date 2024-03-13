<script>
	import { slide } from 'svelte/transition';

	import { txt } from '$lib/context.js';
	import SilverPlanIcon from '$lib/assets/SilverPlanIcon.svg';
	import GoldPlanIcon from '$lib/assets/GoldPlanIcon.svg';
	import PlatinumPlanIcon from '$lib/assets/PlatinumPlanIcon.svg';

	import SocialMediaManagement from '$lib/assets/SocialManagement.svg';
	import EmailMarketing from '$lib/assets/EmailMarketing.svg';
	import SEO from '$lib/assets/SEO.svg';
	import ContentCreation from '$lib/assets/ContentCreation.svg';
	import WebDev from '$lib/assets/WebDev.svg';
	import CommunityManagement from '$lib/assets/CommunityManagement.svg';

	import v0 from '$lib/assets/Vector-0.svg';
	import v1 from '$lib/assets/Vector-1.svg';
	import v2 from '$lib/assets/Vector-2.svg';
	import v3 from '$lib/assets/Vector-3.svg';

	const icons = {
		0: SilverPlanIcon,
		1: GoldPlanIcon,
		2: PlatinumPlanIcon
	};
	const links = {
		0: 'silver-plan',
		1: 'gold-plan',
		2: 'platinum-plan'
	};
	const offerIcons = {
		0: SocialMediaManagement,
		1: EmailMarketing,
		2: SEO,
		3: ContentCreation,
		4: WebDev,
		5: CommunityManagement
	};

	$: openDescriptions = {
		'plan-group0': false,
		'plan-group1': false,
		'plan-group2': false,
		'plan-group3': false,
		'plan-group4': false,
		'plan-group5': false
	};

	function showDescription(id) {
		openDescriptions[id] = !openDescriptions[id];
	}
</script>

<div id="plans">
	<div class="plans-scroll">
		<img id="v0" src={v0} alt="Hand vector 1" />
		<img id="v1" src={v1} alt="Hand vector 2" />
		<img id="v2" src={v2} alt="Hand vector 3" />
		<img id="v3" src={v3} alt="Hand vector 4" />
		{#each $txt.whatWeOffer.cards as circle, i}
			<div class="plan-circle" id={links[i]}>
				<img src={icons[i]} alt={circle.frontText} />
				<span class="powerText">{circle.frontText}</span>
			</div>
		{/each}
	</div>
	<div class="plans-static">
		{#each $txt.whatWeOffer.offerings as offer, i}
			<div id={`plan-group${i}`} on:click={() => showDescription(`plan-group${i}`)}>
				<div>
					<img src={offerIcons[i]} alt={offer.title} />
					<h2>{offer.title}</h2>
				</div>
				{#if openDescriptions[`plan-group${i}`]}
					<p transition:slide>{offer.description}</p>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	#plans {
		margin-top: 35vh;
		width: 100%;
		height: 240vh;
		position: relative;
		display: flex;
		justify-content: space-evenly;
	}
	.plans-scroll {
		width: 33%;
		height: 240vh;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		user-select: none;
	}
	.plans-scroll > img {
		position: absolute;
	}

	#v0 {
		position: absolute;
		top: -5%;
		left: 25%;
	}
	#v1 {
		position: absolute;
		top: -13%;
		left: 0;
	}
	#v2 {
		position: absolute;
		bottom: -58vh;
		left: 0;
	}
	#v3 {
		position: absolute;
		top: 35%;
		left: 14%;
	}

	.plans-static {
		height: fit-content;
		width: 30vw;
		position: sticky;
		top: 24%;
		display: flex;
		flex-direction: column;
		gap: 2vh;
	}
	.plans-static > div {
		width: 30vw;
		cursor: pointer;
		user-select: none;
	}
	.plans-static > div div {
		display: flex;
		align-items: center;
		justify-content: baseline;
		gap: 5%;
	}
	p {
		cursor: default;
		padding-top: 1vh;
		font-family: K2D;
		font-size: 1.5em;
		width: 39vw;
	}
	.plans-static img {
		width: 12%;
		height: auto;
	}
	h2 {
		width: 100%;
		font-family: K2D;
		font-size: 2em;
	}

	.plan-circle {
		width: 17.5vw;
		height: 17.5vw;
		border: 1px solid var(--nav-transparent);
		text-align: center;
		border-radius: 50%;
		text-align: center;
		background-color: var(--transparent-primary);
		backdrop-filter: blur(3px);
		display: flex;
		gap: 1vh;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	span {
		font-family: Coolvetica;
		font-size: 2.5em;
		display: block;
	}
	.plan-circle img {
		width: 50%;
		height: auto;
	}
</style>
