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
		// case '/en/terms-and-conditions':
		// 	break;
		// case '/en/privacy-policy':
		// 	break;
		default:
			throw error(404, 'Page not found!');
	}
}
