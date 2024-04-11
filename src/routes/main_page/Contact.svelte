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
		<input class="form__field" type="hidden" value="extraText" />

		<div class="form__group field">
			<input
				class="form__field"
				type="text"
				name={$txt.contact.name.key}
				placeholder={$txt.contact.name.placeholder}
				required
			/>
			<label class="form__label" for={$txt.contact.name.key}>{$txt.contact.name.placeholder}</label>
		</div>
		<div class="form__group field">
			<input
				class="form__field"
				type="text"
				name={$txt.contact.surname.key}
				placeholder={$txt.contact.surname.placeholder}
				required
			/>
			<label class="form__label" for={$txt.contact.surname.key}
				>{$txt.contact.surname.placeholder}</label
			>
		</div>
		<div class="form__group field">
			<input
				class="form__field"
				type="email"
				name={$txt.contact.email.key}
				placeholder={$txt.contact.email.placeholder}
				required
			/>
			<label class="form__label" for={$txt.contact.email.key}
				>{$txt.contact.email.placeholder}</label
			>
		</div>
		<div class="form__group field">
			<input
				class="form__field"
				type="text"
				name={$txt.contact.company.key}
				placeholder={$txt.contact.company.placeholder}
				required
			/>
			<label class="form__label" for={$txt.contact.company.key}
				>{$txt.contact.company.placeholder}</label
			>
		</div>

		<div class="form__group field">
			<input
				class="form__field"
				type="text"
				name={$txt.contact.website.key}
				placeholder={$txt.contact.website.placeholder}
			/>
			<label class="form__label" for={$txt.contact.website.key}
				>{$txt.contact.website.placeholder}</label
			>
		</div>

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
		padding-left: 12vw;
		padding-top: 17vh;
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
		padding: 8vh 10vw 10vh 12vw;
		width: 60vw;
		font-family: K2D;
	}

	button {
		/* width: 35%; */
		border-radius: 50px;
		/* height: 5vh; */
		border: none;
		z-index: 2;
		cursor: pointer;

		font-family: Raleway;
		font-size: 2em;
		color: var(--secondary-color);
		border-radius: 100px;
		padding: 0.5em 1.5em;
		background-image: var(--text-gradient);
		grid-column: span 2;
		justify-self: left;
		margin-top: 10px;
	}
	.form__group {
		position: relative;
		padding: 20px 0 0;
		width: 100%;
	}

	.form__field {
		background-color: var(--primary-color);
		color: var(--secondary-color);
		font-family: inherit;
		width: 100%;
		border: none;
		border-bottom: 2px solid var(--tertiary-color);
		outline: 0;
		font-size: 2em;
		padding: 7px 0;
		transition: border-color 0.2s;
	}

	.form__field::placeholder {
		color: transparent;
	}

	.form__field:placeholder-shown ~ .form__label {
		font-size: 2em;
		cursor: text;
		top: 20px;
	}

	.form__label {
		position: absolute;
		top: 0;
		display: block;
		transition: 0.2s;
		font-size: 1.5em;
		color: var(--nav-transparent);
		pointer-events: none;
	}

	.form__field:focus {
		padding-bottom: 6px;
		font-weight: 700;
		border-width: 3px;
		border-image: var(--text-gradient);
		border-image-slice: 1;
	}

	.form__field:focus ~ .form__label {
		position: absolute;
		top: 0;
		display: block;
		transition: 0.2s;
		font-size: 1.5em;
		background: var(--text-gradient);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		font-weight: 700;
	}

	/* reset input */
	.form__field:required,
	.form__field:invalid {
		box-shadow: none;
	}
</style>
