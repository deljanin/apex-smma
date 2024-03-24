<script>
	import ContactBackground from '$lib/assets/ContactBackground.svg';
	import { txt } from '$lib/context.js';

	async function submitForm(event) {
		// Collect form data into an object
		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData.entries());
		await fetch('/api/sendmail', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
	}
</script>

<div id="contact">
	<img src={ContactBackground} alt="Background vector triangle" />
	<h1>{$txt.contact.heading}</h1>
	<form on:submit|preventDefault={submitForm}>
		{#each $txt.contact.inputs as input}
			{#if input.name === 'plan'}
				<select type="text" name={input.name} placeholder={input.placeholder} required>
					<option value="" disabled selected>{input.defaultText}</option>
					{#each $txt.whatWeOffer.cards as offer}
						<option>{offer.frontText}</option>
					{/each}
				</select>
			{:else if input.name === 'explanation'}
				<textarea type="text" name={input.name} placeholder={input.placeholder} required />
			{:else if input.name === 'submit'}
				<button type="submit">{input.placeholder}</button>
			{:else}
				<input type="text" name={input.name} placeholder={input.placeholder} required />
			{/if}
		{/each}
		<input type="hidden" />
	</form>
	<div class="footer"></div>
</div>

<style>
	#contact {
		position: relative;
		height: 130vh;
		overflow-x: hidden;
	}
	img {
		position: absolute;
		bottom: 0;
	}
	form {
		display: grid;
	}
</style>
