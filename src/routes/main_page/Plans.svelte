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

	let innerWidth;

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

	$: descriptions = {};
	$: openDescription = null;

	function showDescription(id) {
		if (openDescription !== id) {
			if (openDescription !== null) {
				descriptions[openDescription] = false;
			}
			descriptions[id] = true;
			openDescription = id;
		} else {
			descriptions[id] = !descriptions[id];
			if (!descriptions[id]) {
				openDescription = null;
			}
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

<svelte:window bind:innerWidth />
{#if innerWidth > 1200}
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
					<button
						id={`plan-group-${i}`}
						on:click={() => showDescription(`silver-${i}`)}
						transition:scale
					>
						<div>
							<img src={offerIcons[i]} alt={offer.title} />
							<h2>{offer.title}</h2>
						</div>
						{#if descriptions[`silver-${i}`]}
							<p transition:slide>{@html offer.description[0]}</p>
						{/if}
					</button>
				{:else if (i === 2 || i === 3) && isVisibleGoldPlan}
					<button
						id={`plan-group-${i}`}
						on:click={() => showDescription(`gold-${i}`)}
						transition:scale
					>
						<div>
							<img src={offerIcons[i]} alt={offer.title} />
							<h2>{offer.title}</h2>
						</div>
						{#if descriptions[`gold-${i}`]}
							<p transition:slide>
								{@html offer.description[0]}
								<span class="description-tiny-text">{offer.description[1]}</span>
							</p>
						{/if}
					</button>
				{:else if (i === 4 || i === 5) && isVisiblePlatinumPlan}
					<button
						id={`plan-group-${i}`}
						on:click={() => showDescription(`platinum-${i}`)}
						transition:scale
					>
						<div>
							<img src={offerIcons[i]} alt={offer.title} />
							<h2>{offer.title}</h2>
						</div>
						{#if descriptions[`platinum-${i}`]}
							<p transition:slide>
								{@html offer.description[0]}
								<span class="description-tiny-text">{offer.description[1]}</span>
							</p>
						{/if}
					</button>
				{/if}
			{/each}
		</div>
	</div>
{:else}
	<div class="mobile-container">
		{#each $txt.whatWeOffer.cards as circle, i}
			<div class="plan-circle" id={links[i]}>
				<img src={icons[i]} alt={circle.frontText} />
				<span class="powerText">{circle.frontText}</span>
			</div>
			<div class="mobile-plan-group">
				{#each $txt.whatWeOffer.offerings as offer, j}
					{#if i === 0 && [0, 1].includes(j)}
						<button
							id={`plan-group-${i}-${j}`}
							on:click={() => showDescription(`mobile-silver-${i}-${j}`)}
							transition:scale
						>
							<div class="mobile-offer">
								<img class="graphics" src={offerIcons[j]} alt={offer.title} />
								<h2>{offer.title}</h2>
							</div>
							{#if descriptions[`mobile-silver-${i}-${j}`]}
								<p transition:slide>{@html offer.description[0]}</p>
							{/if}
						</button>
					{:else if i === 1 && [0, 1, 2, 3].includes(j)}
						<button
							id={`plan-group-${i}-${j}`}
							on:click={() => showDescription(`mobile-gold-${i}-${j}`)}
							transition:scale
						>
							<div class="mobile-offer">
								<img class="graphics" src={offerIcons[j]} alt={offer.title} />
								<h2>{offer.title}</h2>
							</div>
							{#if descriptions[`mobile-gold-${i}-${j}`]}
								<p transition:slide>{@html offer.description[0]}</p>
							{/if}
						</button>
					{:else if i === 2}
						<button
							id={`plan-group-${i}-${j}`}
							on:click={() => showDescription(`mobile-platinum-${i}-${j}`)}
							transition:scale
						>
							<div class="mobile-offer">
								<img class="graphics" src={offerIcons[j]} alt={offer.title} />
								<h2>{offer.title}</h2>
							</div>
							{#if descriptions[`mobile-platinum-${i}-${j}`]}
								<p transition:slide>{@html offer.description[0]}</p>
							{/if}
						</button>
					{/if}
				{/each}
			</div>
		{/each}
	</div>
{/if}

<style>
	#plans {
		margin-top: 35vh;
		width: 100%;
		min-height: 240vh;
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
		font-size: 1.5rem;
		width: 39vw;
	}
	p span {
		cursor: default;
		padding-top: 1vh;
		font-family: K2D;
		font-size: 1.25rem;
		opacity: 0.3;
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
		width: 37vh;
		height: 37vh;
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

	.mobile-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 5vh;
		padding-top: 15vh;
		background-color: var(--primary-color);
	}
	.graphics {
		width: 75px;
		height: auto;
	}
	.mobile-plan-group {
		width: 80%;
		display: flex;
		flex-direction: column;
		gap: 1.5vh;
	}
	.mobile-plan-group p {
		width: 100%;
	}
	.mobile-offer {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	@media only screen and (max-width: 1139px) {
		.plans-scroll > img {
			display: none;
		}
	}
</style>
