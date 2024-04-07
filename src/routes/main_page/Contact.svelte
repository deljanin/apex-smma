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
	<h1>{$txt.contact.heading}</h1>
	<form on:submit|preventDefault={submitForm}>
		<input type="hidden" value="extraText" />
		<label for={$txt.contact.name.key}>{$txt.contact.name.placeholder}</label>
		<input
			type="text"
			name={$txt.contact.name.key}
			placeholder={$txt.contact.name.placeholder}
			required
		/>
		<label for={$txt.contact.surname.key}>{$txt.contact.surname.placeholder}</label>
		<input
			type="text"
			name={$txt.contact.surname.key}
			placeholder={$txt.contact.surname.placeholder}
			required
		/>
		<label for={$txt.contact.email.key}>{$txt.contact.email.placeholder}</label>
		<input
			type="email"
			name={$txt.contact.email.key}
			placeholder={$txt.contact.email.placeholder}
			required
		/>
		<label for={$txt.contact.company.key}>{$txt.contact.company.placeholder}</label>
		<input
			type="text"
			name={$txt.contact.company.key}
			placeholder={$txt.contact.company.placeholder}
			required
		/>
		<label for={$txt.contact.plan.key}>{$txt.contact.plan.placeholder}</label>
		<select type="text" name={$txt.contact.plan.key} placeholder={$txt.contact.plan.placeholder}>
			<option value="" disabled selected>{$txt.contact.plan.defaultText}</option>
			{#each $txt.whatWeOffer.cards as offer}
				<option>{offer.frontText}</option>
			{/each}
		</select>
		<label for={$txt.contact.website.key}>{$txt.contact.website.placeholder}</label>
		<input
			type="text"
			name={$txt.contact.website.key}
			placeholder={$txt.contact.website.placeholder}
		/>
		<label for={$txt.contact.explanation.key}>{$txt.contact.explanation.placeholder}</label>
		<textarea
			type="text"
			name={$txt.contact.explanation.key}
			placeholder={$txt.contact.explanation.placeholder}
		/>
		<button type="submit">{$txt.contact.submit.placeholder}</button>
	</form>
	<div class="footer"></div>
	<img src={ContactBackground} alt="Background vector triangle" />
</div>

<style>
	#contact {
		position: relative;
		height: 130vh;
		overflow-x: hidden;
	}
	h1 {
		padding-left: 10vw;
		padding-top: 13vh;
	}
	img {
		z-index: -1;
		position: absolute;
		bottom: 0;
	}
	form {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4vh;
		padding: 10vh 10vw;
		width: 60vw;
	}
	label {
	}

	input,
	select,
	textarea {
		height: 5vh;
		border-radius: 50px;
		outline: none;
		position: relative;
		background-color: var(--primary-color);
		color: var(--secondary-color);
		border: 2px solid var(--tertiary-color);
		text-indent: 15px;
		font-family: K2D;
	}
	select {
		text-indent: 10px;
	}
	input::placeholder,
	textarea::placeholder {
		position: absolute;
		top: 50%;
		/* left: 150px; */
		transform: translateY(-50%);
		font-family: K2D;
	}

	textarea {
		grid-column: span 2;
		width: 100%;
		resize: none;
		height: 8vh;
	}
	button {
		width: 35%;
		border-radius: 50px;
		height: 4vh;
		border: none;
		z-index: 2;
		cursor: pointer;

		font-family: Coolvetica;
		font-size: 1.5em;
		color: var(--secondary-color);
		border-radius: 100px;
		padding: 0.5em 1.5em;
		background-image: var(--text-gradient);
		grid-column: span 2;
	}
</style>
