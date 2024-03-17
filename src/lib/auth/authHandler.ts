import { SvelteKitAuth } from '@auth/sveltekit';
import Strava from '@auth/sveltekit/providers/strava';
import { PUBLIC_STRAVA_ID } from '$env/static/public';
import { STRAVA_SECRET } from '$env/static/private';
import { AUTH_SECRET } from '$env/static/private';

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [
		Strava({
			clientId: PUBLIC_STRAVA_ID,
			clientSecret: STRAVA_SECRET,
			authorization: { params: { scope: 'read,activity:read,activity:read_all' } }
		})
	],
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account.access_token;
			}
			return token;
		},
		async session({ session, token, user }) {
			// @ts-expect-error: access_token does not exist on the type of session
			session.access_token = token.accessToken;
			return session;
		}
	},
	basePath: '/auth',
	secret: AUTH_SECRET
});
