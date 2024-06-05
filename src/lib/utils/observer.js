let intersectionObserver;

function useIntersectionObserver() {
	if (intersectionObserver) return;

	intersectionObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				const eventName = entry.isIntersecting ? 'enterViewport' : 'exitViewport';
				entry.target.dispatchEvent(new CustomEvent(eventName));
			});
		},
		{ threshold: 1 }
	);
}

export default function viewport(element) {
	useIntersectionObserver();

	intersectionObserver.observe(element);

	return {
		destroy() {
			intersectionObserver.unobserve(element);
		}
	};
}
