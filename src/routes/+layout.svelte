<script>
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	injectSpeedInsights();

	import { handleAnchorClick } from '$lib/smoothScroll.js';
	import logoDark from '$lib/assets/LogoDark.svg';
	import langIcon from '$lib/assets/langIcon.svg';

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
					<li><a href={link.link} on:click={handleAnchorClick}>{link.text}</a></li>
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
	a > img {
		width: 60px;
		height: auto;
	}
	img {
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
		font-family: 'Coolvetica';
		font-size: 1.8em;
		color: var(--primary-color);
		text-decoration: none;
		cursor: pointer;
		transition: color 0.4s;
	}
	li > a:hover {
		color: var(--secondary-color);
		transition: color 0.4s;
	}
	@media only screen and (max-width: 399px) {
	}
	@media only screen and (max-width: 400px) and (max-width: 649px) {
	}
	@media only screen and (min-width: 650px) and (max-width: 991px) {
	}
	@media only screen and (min-width: 992px) and (max-width: 1137px) {
	}
	@media only screen and (min-width: 1138px) and (max-width: 1360px) {
	}
	/* CHECK THIS */
	@media only screen and (min-width: 1361) {
	}
</style>
