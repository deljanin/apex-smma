<script>
	import { slide, scale } from 'svelte/transition';
	import { txt } from '$lib/utils/context.js';
	import viewport from '$lib/utils/observer.js';

	import SilverPlanIcon from '$lib/assets/icons/SilverPlanIcon.svg';
	import GoldPlanIcon from '$lib/assets/icons/GoldPlanIcon.svg';
	import PlatinumPlanIcon from '$lib/assets/icons/PlatinumPlanIcon.svg';

	import SocialMediaManagement from '$lib/assets/icons/SocialManagement.svg';
	import EmailMarketing from '$lib/assets/icons/EmailMarketing.svg';
	import SEO from '$lib/assets/icons/SEO.svg';
	import ContentCreation from '$lib/assets/icons/ContentCreation.svg';
	import WebDev from '$lib/assets/icons/WebDev.svg';
	import CommunityManagement from '$lib/assets/icons/CommunityManagement.svg';

	import v0 from '$lib/assets/Vector-0.svg';
	import v1 from '$lib/assets/Vector-1.svg';
	import v2 from '$lib/assets/Vector-2.svg';
	import v3 from '$lib/assets/Vector-3.svg';

	const icons = {
		0: SilverPlanIcon,
		1: GoldPlanIcon,
		2: PlatinumPlanIcon
	};
	const links = ['silver-plan', 'gold-plan', 'platinum-plan'];
	const offerIcons = {
		0: SocialMediaManagement,
		1: EmailMarketing,
		2: CommunityManagement,
		3: ContentCreation,
		4: WebDev,
		5: SEO
	};

	$: descriptions = [];
	$: for (let i = 0; i < Object.keys($txt.whatWeOffer.offerings).length; i++) {
		descriptions[i] = false;
	}
	$: openDescription = null;

	function showDescription(id) {
		if (openDescription !== id) {
			descriptions[openDescription] = false;
			descriptions[id] = true;
			openDescription = id;
		} else {
			descriptions[openDescription] = !descriptions[openDescription];
		}
	}
	$: isVisibleSilverPlan = false;
	$: isVisibleGoldPlan = false;
	$: isVisiblePlatinumPlan = false;

	function changeVisible(plan, visible) {
		switch (plan) {
			case links[0]:
				visible ? (isVisibleSilverPlan = true) : '';
				break;
			case links[1]:
				visible ? (isVisibleGoldPlan = true) : '';
				break;
			case links[2]:
				visible ? (isVisiblePlatinumPlan = true) : '';
				break;
			case 'magicDiv':
				if (visible) {
					isVisibleSilverPlan = false;
					isVisibleGoldPlan = false;
					isVisiblePlatinumPlan = false;
				}
				break;
		}
	}
</script>

<div
	class="magicDiv"
	use:viewport
	on:enterViewport={() => {
		changeVisible('magicDiv', true);
	}}
	on:exitViewport={() => {
		changeVisible('magicDiv', false);
	}}
></div>
<div id="plans">
	<div class="plans-scroll">
		<img id="v0" src={v0} alt="Hand vector 1" />
		<img id="v1" src={v1} alt="Hand vector 2" />
		<img id="v2" src={v2} alt="Hand vector 3" />
		<img id="v3" src={v3} alt="Hand vector 4" />
		{#each $txt.whatWeOffer.cards as circle, i}
			<div
				class="plan-circle"
				id={links[i]}
				use:viewport
				on:enterViewport={() => {
					changeVisible(links[i], true);
				}}
				on:exitViewport={() => {
					changeVisible(links[i], false);
				}}
			>
				<img src={icons[i]} alt={circle.frontText} />
				<span class="powerText">{circle.frontText}</span>
			</div>
		{/each}
	</div>
	<div class="plans-static">
		{#each $txt.whatWeOffer.offerings as offer, i}
			{#if (i === 0 || i === 1) && isVisibleSilverPlan}
				<button id={`plan-group${i}`} on:click={() => showDescription(i)} transition:scale>
					<div>
						<img src={offerIcons[i]} alt={offer.title} />
						<h2>{offer.title}</h2>
					</div>
					{#if descriptions[i]}
						<p transition:slide>{@html offer.description}</p>
					{/if}
				</button>
			{:else if (i === 2 || i === 3) && isVisibleGoldPlan}
				<button id={`plan-group${i}`} on:click={() => showDescription(i)} transition:scale>
					<div>
						<img src={offerIcons[i]} alt={offer.title} />
						<h2>{offer.title}</h2>
					</div>
					{#if descriptions[i]}
						<p transition:slide>{@html offer.description}</p>
					{/if}
				</button>
			{:else if (i === 4 || i === 5) && isVisiblePlatinumPlan}
				<button id={`plan-group${i}`} on:click={() => showDescription(i)} transition:scale>
					<div>
						<img src={offerIcons[i]} alt={offer.title} />
						<h2>{offer.title}</h2>
					</div>
					{#if descriptions[i]}
						<p transition:slide>{@html offer.description}</p>
					{/if}
				</button>
			{/if}
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
	.plans-static > button {
		width: 30vw;
		cursor: pointer;
		user-select: none;
	}
	.plans-static > button div {
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
		font-family: Raleway;
		font-size: 2rem;
		display: block;
	}
	.plan-circle img {
		width: 50%;
		height: auto;
	}
	@media only screen and (max-width: 1139px) {
		.plans-scroll > img {
			display: none;
		}
	}
</style>
