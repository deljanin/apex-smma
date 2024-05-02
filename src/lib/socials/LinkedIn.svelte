<a href="/" target="_blank">
	<svg viewBox="0 0 50 50">
		<path
			d="M40.6223 0.5C41.9465 0.5 43.2164 1.02678 44.1528 1.96447C45.0891 2.90215 45.6151 4.17392 45.6151 5.5V40.5C45.6151 41.8261 45.0891 43.0979 44.1528 44.0355C43.2164 44.9732 41.9465 45.5 40.6223 45.5H5.67251C4.34833 45.5 3.07839 44.9732 2.14205 44.0355C1.20572 43.0979 0.679688 41.8261 0.679688 40.5V5.5C0.679688 4.17392 1.20572 2.90215 2.14205 1.96447C3.07839 1.02678 4.34833 0.5 5.67251 0.5H40.6223ZM39.3741 39.25V26C39.3741 23.8385 38.5167 21.7655 36.9904 20.2371C35.4642 18.7087 33.3942 17.85 31.2358 17.85C29.1138 17.85 26.6424 19.15 25.4441 21.1V18.325H18.4791V39.25H25.4441V26.925C25.4441 25 26.9919 23.425 28.9141 23.425C29.841 23.425 30.73 23.7937 31.3854 24.4501C32.0409 25.1065 32.4091 25.9967 32.4091 26.925V39.25H39.3741ZM10.3658 14.4C11.4781 14.4 12.5448 13.9575 13.3314 13.1698C14.1179 12.3822 14.5597 11.3139 14.5597 10.2C14.5597 7.875 12.6874 5.975 10.3658 5.975C9.24684 5.975 8.17374 6.42013 7.38253 7.21247C6.59133 8.00482 6.14683 9.07946 6.14683 10.2C6.14683 12.525 8.04411 14.4 10.3658 14.4ZM13.8358 39.25V18.325H6.92072V39.25H13.8358Z"
		/>
		<defs>
			<linearGradient
				id="gradient-linkedin"
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
		height: 35px;
		margin: 0 2px 0 2px;
	}
	path {
		fill: url('#gradient-linkedin');
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
	@media only screen and (max-width: 700px) {
		svg {
			height: 28px;
		}
	}
	@media only screen and (min-width: 700px) and (max-width: 1139px) {
		svg {
			height: 28px;
		}
	}
</style>
