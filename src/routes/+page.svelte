<script>
	import Landing from './main_page/Landing.svelte';
	import HowItWorks from './main_page/HowItWorks.svelte';
	import Offers from './main_page/Offers.svelte';
	import Plans from './main_page/Plans.svelte';
	import Contact from './main_page/Contact.svelte';
	import CustomCursor from '$lib/components/customCursor.svelte';
	import { onMount } from 'svelte';
	let isPC = false;
	onMount(() => {
		isPC = window.innerWidth > 768;
	});
</script>

{#if isPC}
	<!-- <CustomCursor /> -->
{/if}

<Landing />
<!-- <HowItWorks /> -->
<Offers />
<!-- <Plans /> -->
<Contact />
