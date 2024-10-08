import { VITE_API_BASE_URL_FEEDS } from '$env/static/private';
import { checkAuthentication } from '$lib/utilities/auth.js';
import { getFollowedPostsDataService } from '$lib/dataservice/getFollowedPostsDataService.js';
import { getPostNotificationDataService } from '$lib/dataservice/getPostNotificationsDataService.js';
import { feedSchema } from '$lib/utilities/auth.js';
import { fail, redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

// We recieve feedback as an object from the getFollowedPostsDataService
// If the response is an error and that error is an auth error we redirect
// to /login with a redirectTo query parameter back to this page, otherwise we
// panic and show an error message.
export const load = async ({ fetch, cookies }) => {
	const followedposts_response = await getFollowedPostsDataService({ fetch });
	const notifications = await getNotifications({ fetch, cookies });
	if (!followedposts_response.success && followedposts_response.status === 401) {
		return redirect(303, `/login?redirectTo=/dashboard`);
	}
	// Combine followed posts with favorite status to go
	//console.log(">> posts: ", followedposts_response.data.metadata);
	return {
		posts: followedposts_response.data,
		notifications: notifications
	};
};

const getNotifications = async ({ fetch, cookies }) => {
	const notification_response = await getPostNotificationDataService({ fetch, cookies });
	if (!notification_response.success && notification_response.status === 401) {
		return redirect(303, `/login?redirectTo=/dashboard`);
	}
	if (!notification_response.success) {
		console.log('Error: ', notification_response.error);
		// maybe handle this silently?
		error(notification_response.status, {
			title: 'Error Loading Notifications',
			message: `Something happened and we could not load any notifications.`,
			info: "It's not you, it's us. Please try again later."
		});
	}
	return notification_response.data;
};

export const actions = {
	addfeed: async ({ request, fetch, cookies }) => {
		// check authentication
		let auth = checkAuthentication(cookies).user;
		if (!auth) {
			return redirect(303, `/login?redirectTo=/dashboard`);
		}
		// Get the form data
		const addfeed_url = `${VITE_API_BASE_URL_FEEDS}`;
		const newFeed = Object.fromEntries(await request.formData());

		// Convert is_hidden to boolean
		newFeed.is_hidden = newFeed.is_hidden === 'true';
		// recieved data, now lets validate it
		try {
			const result = feedSchema.parse(newFeed);
			console.log(result);
		} catch (err) {
			const fieldErrors = err.flatten();
			return fail(400, {
				description: 'an error occurred while processing your request',
				error: fieldErrors.fieldErrors
			});
		}
		// validation complete, now we can save the data
		console.log('Data we recieved: ', newFeed);
		let response = await fetch(`${addfeed_url}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `ApiKey ${auth}`
			},
			body: JSON.stringify(newFeed)
		});
		if (response.ok) {
			let data = await response.json();
			return data;
		} else {
			let data = await response.json();
			return {
				error: data.error,
				status: response.status
			};
		}
	}
};
