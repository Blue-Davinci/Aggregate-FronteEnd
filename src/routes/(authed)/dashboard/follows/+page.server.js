import { VITE_API_BASE_URL_FEED_FOLLOW_LIST } from '$env/static/private';
import { checkAuthentication } from '$lib/utilities/auth.js';
import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

//TODO: This should rely on the backend incase feeds are too
// many to be fetched at once. This will be a temporary solution
export const load = async ({ fetch, cookies }) => {
	// check authentication
	let auth = checkAuthentication(cookies).user;
	if (!auth) {
		redirect(303, `/login?redirectTo=/dashboard/follows`);
		return
	} 
	let followed = await getFeedFollows({ fetch }, auth);
	//console.log(followed);
	return followed;
};
// Fetch all followed feeds
const getFeedFollows = async ({ fetch }, auth) => {
	console.log("Accessing URL: ", `${VITE_API_BASE_URL_FEED_FOLLOW_LIST}`);
	const res = await fetch(`${VITE_API_BASE_URL_FEED_FOLLOW_LIST}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `ApiKey ${auth}`
		}
	});
	if (res.ok) {
		return await res.json();
	} else {
		error(res.status, {
			title: 'Error loading Feeds',
			message: `Something happened and we Could not load Followed Feeds.`,
			info: "It's not you, it's us. Please try again later."
		});
	}
};
