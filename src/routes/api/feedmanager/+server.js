import { json } from '@sveltejs/kit';
import { VITE_API_BASE_URL_FEEDS_CREATED } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import { buildFeedFollowUrl } from '$lib/utilities/utils.js';
import { checkAuthentication } from '$lib/utilities/auth.js';

export const GET = async ({ cookies, url }) => {
	let params = {
		name: url.searchParams.get('name'),
		page: url.searchParams.get('page'),
		page_size: url.searchParams.get('page_size')
	};

	let createdfeeds_url = buildFeedFollowUrl(VITE_API_BASE_URL_FEEDS_CREATED, params);
	// check for auth, if none then redirect.
	let auth = checkAuthentication(cookies).user;
	if (!auth) {
		redirect(303, `/login?redirectTo=/dashboard`);
	}

	try {
		let response = await fetch(createdfeeds_url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `ApiKey ${auth}`
			}
		});
		if (response.ok) {
			let data = await response.json();
			return json(data);
		} else {
			let errorData = await response.json();
			return json({ error: errorData.error }, { status: response.status });
		}
	} catch (err) {
		console.log('End Point Error: ', err);
	}
};
