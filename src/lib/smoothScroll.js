export function handleAnchorClick(event) {
	event.preventDefault();
	const link = event.currentTarget;
	const anchorId = new URL(link.href).hash.replace('#', '');
	const anchor = document.getElementById(anchorId);
	window.scrollTo({
		top: anchor.offsetTop,
		behavior: 'smooth'
	});
}
// export function handleAnchorClickCenter(event) {
// 	event.preventDefault();
// 	const link = event.currentTarget;
// 	const anchorId = new URL(link.href).hash.replace('#', '');
// 	const anchor = document.getElementById(anchorId);
// 	anchor.scrollIntoView({
// 		behavior: 'smooth'
// 	});
// 	// setTimeout(() => {
// 	// 	window.scrollBy({
// 	// 		top: -200,
// 	// 		behavior: 'smooth'
// 	// 	});
// 	// }, 700);
// }
export function handleAnchorClickCenter(event) {
	event.preventDefault();
	const link = event.currentTarget;

	const anchorId = new URL(link.href).hash.replace('#', '');
	const anchor = document.getElementById('plans');
	console.log(anchor);
	let offset = 0;
	if (anchorId === 'gold-plan') {
		offset = (70 * window.innerHeight) / 100;
	} else if (anchorId === 'platinum-plan') {
		offset = (140 * window.innerHeight) / 100;
	}

	// Scroll to the calculated position
	window.scrollTo({ top: anchor.offsetTop + offset, behavior: 'smooth' });
}
