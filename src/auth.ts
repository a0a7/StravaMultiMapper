import { SvelteKitAuth } from '@auth/sveltekit';
import Strava from '@auth/sveltekit/providers/strava';
const STRAVA_ID = import.meta.env.VITE_STRAVA_ID, STRAVA_SECRET = import.meta.env.VITE_STRAVA_SECRET;

console.log(STRAVA_ID);
console.log(STRAVA_SECRET)
export const { handle } = SvelteKitAuth({
	providers: [Strava({ clientId: STRAVA_ID, clientSecret: STRAVA_SECRET })],
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
	}
});
