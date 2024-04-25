<script>
	import { onMount } from 'svelte';

	// Select the circle element
	let circleElement;

	// Create objects to track mouse position and custom cursor position
	const mouse = { x: 0, y: 0 }; // Track current mouse position
	const previousMouse = { x: 0, y: 0 }; // Store the previous mouse position
	const circle = { x: 0, y: 0 }; // Track the circle position

	// Initialize variables to track scaling and rotation
	let currentScale = 0; // Track current scale value
	let currentAngle = 0; // Track current angle value

	const tick = () => {
		// MOVE
		// Calculate circle movement based on mouse position and smoothing
		circle.x += (mouse.x - circle.x) * speed;
		circle.y += (mouse.y - circle.y) * speed;
		// Create a transformation string for cursor translation
		const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

		// SQUEEZE
		// 1. Calculate the change in mouse position (deltaMouse)
		const deltaMouseX = mouse.x - previousMouse.x;
		const deltaMouseY = mouse.y - previousMouse.y;
		// Update previous mouse position for the next frame
		previousMouse.x = mouse.x;
		previousMouse.y = mouse.y;
		// 2. Calculate mouse velocity using Pythagorean theorem and adjust speed
		const mouseVelocity = Math.min(Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4, 150);
		// 3. Convert mouse velocity to a value in the range [0, 0.5]
		const scaleValue = (mouseVelocity / 150) * 0.5;
		// 4. Smoothly update the current scale
		currentScale += (scaleValue - currentScale) * speed;
		// 5. Create a transformation string for scaling
		const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

		// ROTATE
		// 1. Calculate the angle using the atan2 function
		const angle = (Math.atan2(deltaMouseY, deltaMouseX) * 180) / Math.PI;
		// 2. Check for a threshold to reduce shakiness at low mouse velocity
		if (mouseVelocity > 20) {
			currentAngle = angle;
		}
		// 3. Create a transformation string for rotation
		const rotateTransform = `rotate(${currentAngle}deg)`;

		// Apply all transformations to the circle element in a specific order: translate -> rotate -> scale
		circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;

		// Request the next frame to continue the animation
		window.requestAnimationFrame(tick);
	};
	const speed = 0.4;

	onMount(() => {
		tick();
	});

	let animationInProgress = false;
</script>

<svelte:window
	on:mousemove={(e) => {
		mouse.x = e.x;
		mouse.y = e.y;
	}}
	on:click={() => {
		if (!animationInProgress) {
			animationInProgress = true;

			// Trigger animation logic here
			circleElement.classList.add('animate');

			// Remove the 'animate' class after the animation completes
			setTimeout(() => {
				circleElement.classList.remove('animate');
				animationInProgress = false;
			}, 400); // Adjust the duration of your animation if needed
		}
	}}
/>

<div
	bind:this={circleElement}
	class="circle{animationInProgress ? ' animate' : ''}"
	style="--transform: translate({circle.x}px, {circle.y}px) rotate({{
		currentAngle
	}}deg) scale(${1 + currentScale}, ${1 - currentScale})"
></div>

<style>
	:global(.circle) {
		--circle-size: 40px;
		position: fixed;
		height: var(--circle-size);
		width: var(--circle-size);
		border: 1px solid white;
		border-radius: 100%;
		top: calc(var(--circle-size) / 2 * -1);
		left: calc(var(--circle-size) / 2 * -1);
		pointer-events: none;
		z-index: 10;
	}

	:global(.animate) {
		animation: customAnimation 400ms; /* Adjust duration as needed */
	}

	@keyframes customAnimation {
		0% {
		}
		30% {
			background-color: #47deb1f1;
		}
		40% {
			background-color: #00dbf0f1;
		}
		50% {
			background-color: #00cffff1;
		}
		60% {
			background-color: #8db4ff;
		}
		70% {
			background-color: #fa8cfa;
		}
		100% {
		}
	}
</style>
