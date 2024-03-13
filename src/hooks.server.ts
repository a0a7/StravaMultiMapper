import type { Handle } from '@sveltejs/kit';

const securityHeaders = {
	'X-Content-Type-Options': 'nosniff',
	'X-Frame-Options': 'DENY',
	'Content-Security-Policy':
		"default-src https: 'unsafe-eval' 'unsafe-inline'; object-src 'none'; frame-ancestors 'none'"
};

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	const url = new URL(event.request.url);
	if (url.hostname === 'stravamap.pages.dev') {
		Object.entries(securityHeaders).forEach(([header, value]) =>
			response.headers.set(header, value)
		);
	}

	return response;
};
