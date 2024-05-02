<script>
	import ContactBackground from '$lib/assets/ContactBackground.svg';
	import { txt } from '$lib/utils/context.js';
	import { scale } from 'svelte/transition';

	$: response = null;
	let modalOpen = false;
	let modalHeading = 'Message sent';
	let modalText =
		'Thank you for contacting us. We will send you a confirmation email with additional information shortly.';
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
		<input class="formField" type="hidden" value="extraText" autocomplete="off" />
		<div class="formGroup field">
			<input
				class="formField"
				type="text"
				name={$txt.contact.name.key}
				placeholder={$txt.contact.name.placeholder}
				required
				autocomplete="off"
			/>
			<label class="formLabel" for={$txt.contact.name.key}>{$txt.contact.name.placeholder}</label>
		</div>
		<div class="formGroup field">
			<input
				class="formField"
				type="text"
				name={$txt.contact.surname.key}
				placeholder={$txt.contact.surname.placeholder}
				required
				autocomplete="off"
			/>
			<label class="formLabel" for={$txt.contact.surname.key}
				>{$txt.contact.surname.placeholder}</label
			>
		</div>
		<div class="formGroup field">
			<input
				class="formField"
				type="email"
				name={$txt.contact.email.key}
				placeholder={$txt.contact.email.placeholder}
				required
				autocomplete="off"
			/>
			<label class="formLabel" for={$txt.contact.email.key}>{$txt.contact.email.placeholder}</label>
		</div>
		<div class="formGroup field">
			<input
				class="formField"
				type="text"
				name={$txt.contact.company.key}
				placeholder={$txt.contact.company.placeholder}
				required
				autocomplete="off"
			/>
			<label class="formLabel" for={$txt.contact.company.key}
				>{$txt.contact.company.placeholder}</label
			>
		</div>

		<div class="formGroup field">
			<input
				class="formField"
				type="text"
				name={$txt.contact.website.key}
				placeholder={$txt.contact.website.placeholder}
				autocomplete="off"
			/>
			<label class="formLabel" for={$txt.contact.website.key}
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
		height: auto;
		min-height: 130vh;
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
		border-radius: 50px;
		border: none;
		z-index: 2;
		cursor: pointer;
		font-family: Raleway;
		font-size: clamp(1.5rem, 1.5rem + 1vw, 2rem);
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
		text-align: center;
	}
	.text {
		z-index: 2;
	}
	button:hover,
	button:focus {
		transition: all 400ms;
		box-shadow:
			0px 0px 5px #47deb1,
			0px 0px 15px #fa8cfa;
		transition-duration: 0.7s;
	}
	button:hover .effect,
	button:focus .effect {
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
	.formGroup {
		position: relative;
		padding: 20px 0 0;
		width: 100%;
	}

	.formField {
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

	.formField::placeholder {
		color: transparent;
	}

	.formField:placeholder-shown ~ .formLabel {
		font-size: 2em;
		cursor: text;
		top: 20px;
	}

	.formLabel {
		position: absolute;
		top: 0;
		display: block;
		transition: 0.2s;
		font-size: 1.5em;
		color: var(--nav-transparent);
		pointer-events: none;
	}

	.formField:focus {
		padding-bottom: 6px;
		font-weight: 700;
		border-width: 3px;
		border-image: var(--text-gradient);
		border-image-slice: 1;
	}

	.formField:focus ~ .formLabel {
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
	.formField:required,
	.formField:invalid {
		box-shadow: none;
	}
	.modal {
		z-index: 5;
		width: 40vw;
		height: 30vh;
		background-color: var(--transparent-primary);
		border-radius: 50px;
		border: 1px solid var(--nav-transparent);
		backdrop-filter: blur(5px);
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
	}
	.modal p {
		text-align: center;
		width: 80%;
		height: auto;
		font-family: K2D;
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

	@media only screen and (max-width: 700px) {
		#contact {
			/* min-height: 150vh; */
			min-height: 1300px;
		}
		form {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-evenly;
		}
		.modal {
			height: 60vh;
			width: 80%;
		}
	}
	@media only screen and (min-width: 700px) and (max-width: 1139px) {
		form {
			width: 100%;
		}
		.modal {
			height: 50vh;
		}
	}
	@media only screen and (min-width: 1140px) and (max-width: 1500px) {
		form {
			width: 80%;
		}
	}
</style>
