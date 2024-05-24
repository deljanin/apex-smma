import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export function load({ url }) {
	switch (url.pathname) {
		case '/':
			throw redirect(301, '/en');
			break;
		case '/sr':
			break;
		case '/en':
			break;
		default:
			throw error(404, 'Page not found! <a href="/" style="color: #fff">Go back to home page?</a>');
	}
}
