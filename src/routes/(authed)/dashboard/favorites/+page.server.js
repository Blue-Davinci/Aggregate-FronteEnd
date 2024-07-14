import { VITE_API_BASE_URL_FEEDS_FAVORITES_POST } from '$env/static/private';
import { checkAuthentication } from '$lib/utilities/auth.js';
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export const load = async ({ fetch, cookies }) => {
	const favoritepost_url = `${VITE_API_BASE_URL_FEEDS_FAVORITES_POST}`;
	// check authentication 
	let auth = checkAuthentication(cookies).user;
	if (!auth) {
		redirect(303, `/login?redirectTo=/dashboard/favorites`);
	}
	const response = await fetch(favoritepost_url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
            Authorization: `ApiKey ${auth}`
		}
	});
	if (response.ok) {
		let data = await response.json();
        //console.log("--- Data: ",data.favorite_rss_posts);
		return data;
	} else {
		let errorData = await response.json();
        //console.log("Error: ", errorData);
		error(response.status, {
			title: 'Error loading Your Favorite Posts',
			message: errorData.message,
			info: "It's not you, it's us. Please try again later."
		});
	}
};
