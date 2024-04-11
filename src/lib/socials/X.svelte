<a href="/" target="_blank">
	<svg viewBox="0 0 54 54">
		<path
			d="M42.5332 0.625H50.7913L32.7498 21.275L53.9743 49.375H37.3531L24.3368 32.3325L9.44324 49.375H1.18012L20.4774 27.2875L0.119141 0.625H17.1572L28.9228 16.2025L42.5332 0.625ZM39.6349 44.425H44.2108L14.6732 5.315H9.76278L39.6349 44.425Z"
		/>

		<defs>
			<linearGradient
				id="gradient-x"
				x1="0%"
				x2="100%"
				y1="0"
				y2="0"
				gradientUnits="userSpaceOnUse"
			>
				<stop offset="0%" stop-color="var(--secondary-color)" />
				<stop offset="100%" stop-color="var(--secondary-color)" />
			</linearGradient>
		</defs>
	</svg>
</a>

<style>
	svg {
		width: auto;
		height: 40px;
		margin: 0 2px 0 2px;
	}
	path {
		fill: url('#gradient-x');
	}
	path ~ defs stop {
		transition: 0.4s;
	}

	a:hover path ~ defs stop:first-child {
		stop-color: #47deb1;
	}
	a:hover path ~ defs stop:last-child {
		stop-color: #fa8cfa;
	}
</style>
