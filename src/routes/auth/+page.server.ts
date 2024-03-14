import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
  default: async ({ request, cookies }) => {
    const form = await request.formData();
    const token = form.get('token');
    if (!token || typeof token !== 'string') {
      throw redirect(303, '/auth');
    }
    // Cookie notice not necessary because cookie is necessary for a service (logging in) explicitly requested by the user.
    cookies.set('auth', JSON.stringify({ token: token }));
    throw redirect(303, '/');
  }
} satisfies Actions;