<script>
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	injectSpeedInsights();

	import { slide } from 'svelte/transition';

	import { handleAnchorClick } from '$lib/smoothScroll.js';
	import logoDark from '$lib/assets/icons/LogoDark.svg';
	import langIcon from '$lib/assets/icons/langIconDark.svg';
	import XIcon from '$lib/socials/X.svelte';
	import TelegramIcon from '$lib/socials/Telegram.svelte';
	import InstagramIcon from '$lib/socials/Instagram.svelte';
	import FacebookIcon from '$lib/socials/Facebook.svelte';
	import LinkedInIcon from '$lib/socials/LinkedIn.svelte';

	import { languageData } from '$lib/languageData.js';

	import { txt } from '$lib/context.js';
	import { page } from '$app/stores';
	var lng = 'en';
	function handleLanguageChange() {
		lng = lng === 'en' ? 'sr' : 'en';
		txt.set(languageData[lng]);
	}
	let y = 0;
	let navSticky;
	let innerWidth;
	$: if (y < 25 && innerWidth > 700) {
		navSticky = '';
	} else {
		navSticky = 'navSticky';
	}

	let toggleMenu = false;
	let toggleBorder = false;

	$: if (innerWidth > 700) {
		toggleMenu = true;
	} else {
		toggleMenu = false;
	}
</script>

<svelte:window bind:scrollY={y} bind:innerWidth />

<nav class={navSticky}>
	<div class:toggleBorder>
		<a href="/">
			<img src={logoDark} alt="Logo" />
		</a>
		{#if toggleMenu}
			<ul transition:slide>
				{#if $page.url.pathname === '/terms_and_conditions' || $page.url.pathname === '/privacy_policy'}
					{#each $txt.navbarAlt as link}
						<li><a href={link.link}>{link.text}</a></li>
					{/each}
				{:else}
					{#each $txt.navbar as link}
						<li><a href={link.link} on:click={handleAnchorClick}>{link.text}</a></li>
					{/each}
				{/if}
			</ul>
		{/if}
		<div>
			<button on:click={handleLanguageChange}>
				<img src={langIcon} alt="Language change button" />
			</button>
			{#if innerWidth < 701}
				<!-- Ova vrednost je 701 zbog dropdowna koji ne postoji na sirini od 700px inace -->
				<div class="menuButton">
					<input
						type="checkbox"
						id="checkbox"
						on:click={() => {
							toggleMenu = !toggleMenu;
							toggleBorder = !toggleBorder;
						}}
					/>
					<label for="checkbox" class="toggle">
						<div class="bar bar--top"></div>
						<div class="bar bar--middle"></div>
						<div class="bar bar--bottom"></div>
					</label>
				</div>
			{/if}
		</div>
	</div>
</nav>
<slot />

<!--
<div class="footer">
	<div>
		<div>
			<InstagramIcon />
			<TelegramIcon />
			<FacebookIcon />
			<LinkedInIcon />
			<XIcon />
		</div>
		<a href="/privacy_policy">{$txt.footer.ppolicy}</a>
		<a href="/terms_and_conditions">{$txt.footer.terms}</a>
		<div>
			{$txt.footer.rights}
		</div>
	</div>
</div>
-->
<style>
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
		z-index: 3;
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
	}
	nav a > img {
		width: 60px;
		height: auto;
	}
	nav img {
		cursor: pointer;
		width: 50px;
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
	nav button {
		height: 50px;
	}
	nav > div > div {
		display: flex;
		align-items: center;
		gap: 1em;
	}

	.toggleMenu {
		display: none;
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

	.bar--top {
		bottom: calc(50% + 11px + 4px / 2);
		transition-property: bottom, transform;
		transition-delay: calc(0s + 0.35s), 0s;
	}

	.bar--middle {
		top: calc(50% - 4px / 2);
		transition-property: opacity;
		transition-delay: calc(0s + 0.35s);
	}

	.bar--bottom {
		top: calc(50% + 11px + 4px / 2);
		transition-property: top, transform;
		transition-delay: calc(0s + 0.35s), 0s;
	}

	#checkbox:checked + .toggle .bar--top {
		bottom: calc(50% - 4px / 2);
		transform: rotate(135deg);
		transition-delay: 0s, calc(0s + 0.35s);
	}

	#checkbox:checked + .toggle .bar--middle {
		opacity: 0;
		transition-duration: 0s;
		transition-delay: calc(0s + 0.35s);
	}

	#checkbox:checked + .toggle .bar--bottom {
		top: calc(50% - 4px / 2);
		transform: rotate(225deg);
		transition-delay: 0s, calc(0s + 0.35s);
	}
	/* Navbar only! */
	@media only screen and (max-width: 700px) {
		ul {
			position: absolute;
			right: 0;
			max-width: 30vw;
			bottom: -30vh;
			height: 30vh;
			background-color: var(--nav-transparent);
			display: flex;
			flex-direction: column;
			border-bottom-left-radius: 25px;
			border-bottom-right-radius: 25px;
		}

		.menuButton {
			display: block;
		}
	}

	/* MIN 320 */
	@media only screen and (max-width: 700px) {
		nav > div {
			width: 100%;
		}

		nav a > img {
			width: 50px;
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
