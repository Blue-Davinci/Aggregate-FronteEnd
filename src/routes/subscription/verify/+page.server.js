import { checkAuthentication } from '$lib/utilities/auth.js';
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { VITE_API_BASE_URL_SUBSCRIPTIONS_VERIFY } from '$env/static/private';

export const load = async ({ fetch, cookies, url }) => {
	let plan_id = url.searchParams.get('plan_id');
	let reference = url.searchParams.get('reference');
	let auth = checkAuthentication(cookies).user;
	// parse the plan_id to an integer
	plan_id = parseInt(plan_id, 10);
	// check if the plan_id is a number & present and if the reference is not empty
	if (isNaN(plan_id) || !plan_id || !reference) {
		return redirect(303, '/subscription');
	}
    console.log('plan_id: ', plan_id);
    console.log('reference: ', reference);
    // check if the user is authenticated if not redirect to the login page
	if (!auth) {
		return redirect(
			303,
			`/login?redirectTo=/subscription/verify?plan_id=${plan_id}&reference=${reference}`
		);
	}
	let verification_url = `${VITE_API_BASE_URL_SUBSCRIPTIONS_VERIFY}`;
	try {
		let response = await fetch(verification_url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `ApiKey ${auth}`
			},
			body: JSON.stringify({ plan_id, reference})
		});
		if (response.ok) {
			let data = await response.json();
			return data;
		} else {
			let errorData = await response.json();
			return {
				error: errorData.error,
				status: response.status
			};
		}
	} catch (err) {
        console.log('Subscription verification Error: ', err);
		error(500, {
			title: 'Error Verifying Subscription',
			message: `Something happened and we could not verify your subscription`,
			info: "It's not you, it's us. Please try again later."
		});
	}
};
