<script>
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { inject } from '@vercel/analytics';
	injectSpeedInsights();
	inject();

	import { slide } from 'svelte/transition';
	// import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';

	import { handleAnchorClick } from '$lib/utils/smoothScroll.js';
	import logoDark from '$lib/assets/icons/LogoDark.svg';
	import langIcon from '$lib/assets/icons/langIconDark.svg';
	import XIcon from '$lib/socials/X.svelte';
	import TelegramIcon from '$lib/socials/Telegram.svelte';
	import InstagramIcon from '$lib/socials/Instagram.svelte';
	import FacebookIcon from '$lib/socials/Facebook.svelte';
	import LinkedInIcon from '$lib/socials/LinkedIn.svelte';

	import { languageData } from '$lib/utils/languageData.js';

	import { txt } from '$lib/utils/context.js';
	import { page } from '$app/stores';

	$: language = $page.params.slug;
	$: {
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('lang', language);
		}
	}
	$: txt.set(languageData[language]);

	let y = 0;
	let navSticky;
	let innerWidth;
	let navAnimate = false;

	$: if (y < 25 && innerWidth > 700) {
		navSticky = false;
	} else {
		navSticky = true;
	}
	$: if (innerWidth <= 700) {
		navAnimate = true;
	}

	let toggleMenu = false;
	let toggleBorder = false;

	$: if (innerWidth > 700) {
		toggleMenu = true;
	} else {
		toggleMenu = false;
	}
	let visible = false;
	// onMount(() => {
	// let browserLanguage = window.navigator.language;
	// console.log(browserLanguage);

	// });
	afterNavigate(({ from }) => {
		if (from === null) {
			visible = true;
		}
	});
</script>

<svelte:head>
	<title>{$txt.title}</title>
	<meta name="description" content={$txt.landing.heading2.replace('^', ' ')} />
</svelte:head>
<svelte:window bind:scrollY={y} bind:innerWidth />
{#if visible}
	<nav class:navSticky class:navAnimate>
		<div class:toggleBorder>
			<a class="logo" href={language === 'en' ? '/en' : '/sr'}>
				<img src={logoDark} alt="Logo" />
			</a>

			{#if toggleMenu}
				<ul transition:slide={{ axis: 'x' }}>
					{#if $page.url.pathname === '/terms-and-conditions' || $page.url.pathname === '/privacy-policy'}
						{#each $txt.navbarAlt as link}
							<li><a href={link.link}>{link.text}</a></li>
						{/each}
					{:else}
						{#each $txt.navbar as link}
							<li>
								<a
									href={link.link}
									on:mousedown={handleAnchorClick}
									on:mousedown={() => {
										toggleMenu = !toggleMenu;
									}}>{link.text}</a
								>
							</li>
						{/each}
					{/if}
				</ul>
			{/if}
			<div>
				<a class="langauge" href={language === 'en' ? '/sr' : '/en'}>
					<img src={langIcon} alt="Language change button" />
				</a>
				{#if innerWidth < 701}
					<div class="menuButton">
						<input
							type="checkbox"
							id="checkbox"
							on:mousedown={() => {
								toggleMenu = !toggleMenu;
								toggleBorder = !toggleBorder;
							}}
							bind:checked={toggleMenu}
						/>
						<label for="checkbox" class="toggle">
							<div class="bar bar-top"></div>
							<div class="bar bar-middle"></div>
							<div class="bar bar-bottom"></div>
						</label>
					</div>
				{/if}
			</div>
		</div>
	</nav>

	<slot />

	<div class="footer">
		<div>
			<div>
				<InstagramIcon />
				<TelegramIcon />
				<FacebookIcon />
				<LinkedInIcon />
				<XIcon />
			</div>
			<!-- <a href="/privacy_policy"> -->
			<span>{$txt.footer.ppolicy}</span>
			<!-- </a> -->
			<!-- <a href="/terms_and_conditions"> -->
			<span>{$txt.footer.terms}</span>
			<!-- </a> -->

			{$txt.footer.rights}
		</div>
	</div>
{/if}

<style>
	.navAnimate {
		opacity: 0;
		animation: navbarAnimation 1s 6s forwards;
	}
	.navSticky {
		position: fixed;
		background-color: var(--nav-transparent);
		backdrop-filter: blur(12px);
		transition: background-color 0.4s;
		height: 70px;
	}
	.navSticky > div {
		position: fixed;
		top: 0;
		background-color: unset;
		backdrop-filter: unset;
		transition: background-color 0.4s;
	}

	nav {
		z-index: 5;
		position: relative;
		top: 0;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.4s;
	}
	nav > div {
		position: absolute;
		top: 25px;
		padding: 20px;
		border-radius: 15px;
		width: 50%;
		height: 70px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--nav-transparent);
		backdrop-filter: blur(15px);
		transition: all 0.4s;
		opacity: 0;
		animation: navbarAnimation 1s 6s forwards;
	}
	@keyframes navbarAnimation {
		from {
			top: -0.2rem;
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	.logo {
		width: 55px;
		height: auto;
	}
	nav img {
		cursor: pointer;
	}
	ul {
		width: 70%;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}
	li {
		list-style: none;
	}

	li > a {
		font-family: K2D;
		font-weight: bold;
		font-size: clamp(0.5rem, 1rem + 1vw, 1.8em);
		color: var(--primary-color);
		text-decoration: none;
		cursor: pointer;
		transition: color 0.4s;
	}
	li > a:hover {
		color: var(--secondary-color);
		transition: color 0.4s;
	}
	.langauge {
		height: 50px;
	}
	.langauge img {
		height: 50px;
	}
	nav > div > div {
		display: flex;
		align-items: center;
		gap: 1em;
	}

	.toggleBorder {
		border-bottom-right-radius: 0;
	}

	.menuButton {
		display: none;
	}

	.footer {
		position: relative;
		width: 100%;
		height: 0;
		font-family: K2D;
		font-size: 1rem;
	}
	.footer > div {
		width: 80%;
		height: 10vh;
		position: absolute;
		bottom: 25px;
		left: 0;
		right: 0;
		margin: 0 auto 0 auto;
		border: 1px solid var(--nav-transparent);
		text-align: center;
		border-radius: 25px;
		text-align: center;
		background-color: var(--transparent-primary);
		backdrop-filter: blur(10px);
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}

	/* Toggle styles */
	#checkbox {
		display: none;
	}

	.toggle {
		position: relative;
		width: 40px;
		cursor: pointer;
		margin: auto;
		display: block;
		height: calc(4px * 3 + 11px * 2);
	}

	.bar {
		position: absolute;
		left: 0;
		right: 0;
		height: 4px;
		border-radius: calc(4px / 2);
		background: var(--primary-color);
		color: inherit;
		opacity: 1;
		transition: none 0.35s cubic-bezier(0.5, -0.35, 0.35, 1.5) 0s;
	}

	/***** Spin Animation *****/

	.bar-top {
		bottom: calc(50% + 11px + 4px / 2);
		transition-property: bottom, transform;
		transition-delay: calc(0s + 0.35s), 0s;
	}

	.bar-middle {
		top: calc(50% - 4px / 2);
		transition-property: opacity;
		transition-delay: calc(0s + 0.35s);
	}

	.bar-bottom {
		top: calc(50% + 11px + 4px / 2);
		transition-property: top, transform;
		transition-delay: calc(0s + 0.35s), 0s;
	}

	#checkbox:checked + .toggle .bar-top {
		bottom: calc(50% - 4px / 2);
		transform: rotate(135deg);
		transition-delay: 0s, calc(0s + 0.35s);
	}

	#checkbox:checked + .toggle .bar-middle {
		opacity: 0;
		transition-duration: 0s;
		transition-delay: calc(0s + 0.35s);
	}

	#checkbox:checked + .toggle .bar-bottom {
		top: calc(50% - 4px / 2);
		transform: rotate(225deg);
		transition-delay: 0s, calc(0s + 0.35s);
	}
	/* Navbar only! */
	@media only screen and (max-width: 700px) {
		ul {
			position: fixed;
			right: 0;
			left: 0;
			width: 100%;
			top: 50vh;
			height: 50vh;
			background-color: #585858;
			z-index: 15;
			display: flex;
			flex-direction: column;
			border-top-left-radius: 25px;
			border-top-right-radius: 25px;
			padding-bottom: 10vh;
		}
		li > a {
			color: var(--secondary-color);
		}

		.menuButton {
			display: block;
		}
		nav > div {
			width: 100%;
		}

		nav a > img {
			width: 50px;
		}
	}

	/* MIN 320 */
	@media only screen and (max-width: 519px) {
		.footer > div {
			height: auto;
			width: 100%;
			bottom: 0;
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
			border-left: none;
			border-right: none;
			border-bottom: none;
			flex-direction: column;
			justify-content: space-evenly;
			gap: 1vh;
			padding: 3vh 0 3vh 0;
		}
	}
	@media only screen and (min-width: 520px) and (max-width: 700px) {
		.footer > div {
			width: 100%;
			bottom: 0;
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
			border-left: none;
			border-right: none;
			border-bottom: none;
		}
	}
	@media only screen and (min-width: 700px) and (max-width: 1139px) {
		nav > div {
			width: 85%;
		}
	}
	@media only screen and (min-width: 1140px) and (max-width: 1360px) {
	}
	/* CHECK THIS */
	@media only screen and (min-width: 1361) {
	}
</style>
