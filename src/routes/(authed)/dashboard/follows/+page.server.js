import { VITE_API_BASE_URL_FEED_FOLLOW } from '$env/static/private';
import { VITE_API_BASE_URL_FEEDS } from '$env/static/private';
import { checkAuthentication } from '$lib/utilities/auth.js';
import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch, cookies }) => {
	// check authentication
	let auth = checkAuthentication(cookies).user;
	if (!auth) {
		return redirect(303, `/login?redirectTo=/dashboard/follows`);
	} else {
		let allfeeds = await getAllFeeds({ fetch });
		let followed = await getFeedFollows({ fetch }, auth);
		// Filter allfeeds based on followed.feed_ids
		if (allfeeds.feeds && Array.isArray(allfeeds.feeds) && followed.feed_follows) {
			allfeeds.feeds = allfeeds.feeds.filter((feed) => {
				return followed.feed_follows.some((f) => f.feed_id === feed.id);
			});
		}
		//console.log(allfeeds);
		return allfeeds;
	}
};

const getAllFeeds = async ({ fetch }) => {
	const res = await fetch(`${VITE_API_BASE_URL_FEEDS}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	if (res.ok) {
		return await res.json();
	} else {
		throw error(res.status, {
			title: 'Error loading Feeds',
			message: `Something happened and we Could not load any Feeds.`,
			info: "It's not you, it's us. Please try again later."
		});
	}
};

const getFeedFollows = async ({ fetch }, auth) => {
	const res = await fetch(`${VITE_API_BASE_URL_FEED_FOLLOW}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `ApiKey ${auth}`
		}
	});
	if (res.ok) {
		return await res.json();
	} else {
		throw error(res.status, {
			title: 'Error loading Feeds',
			message: `Something happened and we Could not load any Feeds.`,
			info: "It's not you, it's us. Please try again later."
		});
	}
};
