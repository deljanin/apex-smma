<script>
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	injectSpeedInsights();

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
	$: if (y < 25) {
		navSticky = '';
	} else {
		navSticky = 'navSticky';
	}
</script>

<svelte:window bind:scrollY={y} />

<nav class={navSticky}>
	<div>
		<a href="/">
			<img src={logoDark} alt="Logo" />
		</a>

		<ul>
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
		<img src={langIcon} on:click={handleLanguageChange} alt="Language change button" />
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

		<a href="/privacy_policy">{$txt.footer.ppolicy}</a>
		<a href="/terms_and_conditions">{$txt.footer.terms}</a>

		<div>
			{$txt.footer.rights}
		</div>
	</div>
</div>

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
	div {
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

	/* DO 320 Treba ici */
	@media only screen and (max-width: 399px) {
	}
	@media only screen and (max-width: 400px) and (max-width: 649px) {
	}
	@media only screen and (min-width: 320px) and (max-width: 679px) {
		div {
			width: 90%;
			height: 60px;
		}

		a > img {
			width: 45px;
		}
	}
	@media only screen and (min-width: 680px) and (max-width: 1139px) {
		div {
			width: 85%;
		}
	}
	@media only screen and (min-width: 1140px) and (max-width: 1360px) {
	}
	/* CHECK THIS */
	@media only screen and (min-width: 1361) {
	}
</style>
