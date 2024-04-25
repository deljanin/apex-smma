<script>
	import ContactBackground from '$lib/assets/ContactBackground.svg';
	import { txt } from '$lib/utils/context.js';
	import { scale } from 'svelte/transition';

	$: response = null;
	let modalOpen = false;
	let modalHeading = 'Hello';
	let modalText = 'Some text';
	async function submitForm(event) {
		// Collect form data into an object
		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData.entries());
		response = await fetch('/api/sendmail', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		switch (response.status) {
			case 200:
				modalOpen = true;
				modalHeading = $txt.modal.success.heading;
				modalText = $txt.modal.success.text;
				break;
			case 403:
				break;
			case 500:
				modalOpen = true;
				modalHeading = $txt.modal.fail.heading;
				modalText = $txt.modal.fail.text;
				break;
		}
		event.target.reset();
	}
</script>

<div id="contact">
	{#if modalOpen}
		<div class="modal" transition:scale>
			<h2>{modalHeading}</h2>
			<p>{modalText}</p>
			<button
				on:click={() => {
					modalOpen = false;
				}}
			>
				<span class="text">{$txt.modal.buttonText}</span>
				<span class="effect"></span>
			</button>
		</div>
	{/if}

	<h1>{$txt.contact.heading}</h1>
	<form on:submit|preventDefault={submitForm} autocomplete="off">
		<input class="form__field" type="hidden" value="extraText" autocomplete="off" />

		<div class="form__group field">
			<input
				class="form__field"
				type="text"
				name={$txt.contact.name.key}
				placeholder={$txt.contact.name.placeholder}
				required
				autocomplete="off"
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
				autocomplete="off"
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
				autocomplete="off"
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
				autocomplete="off"
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
				autocomplete="off"
			/>
			<label class="form__label" for={$txt.contact.website.key}
				>{$txt.contact.website.placeholder}</label
			>
		</div>

		<button type="submit"
			><span class="text">{$txt.contact.submit.placeholder}</span><span class="effect"
			></span></button
		>
	</form>
	<img src={ContactBackground} alt="Background vector triangle" />
</div>

<style>
	#contact {
		position: relative;
		height: 130vh;
		overflow-x: hidden;
	}

	.modal {
		z-index: 5;
		width: 40vw;
		height: 30vh;
		background-color: var(--transparent-primary);
		border-radius: 50px;
		border: 1px solid var(--nav-transparent);
		backdrop-filter: blur(3px);
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		/* opacity: 0;
		animation: fadeIn 0.4s forwards; */
	}
	.modal p {
		text-align: center;
		width: 80%;
		font-family: K2D;
		font-size: 1.5em;
	}
	.modal button {
		font-size: 1.5rem;
	}
	.modal button:hover .effect {
		transform: scale(20);
	}
	.modal .effect {
		width: 8px;
		height: 8px;
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
		border-radius: 50px;
		border: none;
		z-index: 2;
		cursor: pointer;

		font-family: Raleway;
		font-size: 2em;
		color: var(--secondary-color);
		border-radius: 100px;
		padding: 0.5em 1.5em;
		background-image: var(--text-gradient-dark);
		grid-column: span 2;
		justify-self: left;
		margin-top: 10px;
		position: relative;
		transition: all 400ms;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 7px;
		overflow: hidden;
	}
	.text {
		z-index: 2;
	}
	button:hover {
		transition: all 400ms;
		box-shadow:
			0px 0px 5px #47deb1,
			0px 0px 15px #fa8cfa;
		transition-duration: 0.7s;
	}
	button:hover .effect {
		background-image: var(--text-gradient);
		transform: scale(18);
		transform-origin: center;
		opacity: 1;
		transition-duration: 0.5s;
	}
	.effect {
		position: absolute;
		width: 20px;
		height: 20px;
		background-image: var(--text-gradient-dark);
		border-radius: 50%;
		z-index: 1;
		opacity: 0;
		transition-duration: 0.5s;
	}
	button:active {
		scale: 0.9;
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
		font-size: 1.5em;
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
