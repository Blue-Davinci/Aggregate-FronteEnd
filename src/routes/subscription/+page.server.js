import { error } from '@sveltejs/kit';
import { VITE_API_BASE_URL_SUBSCRIPTIONS_PLANS } from '$env/static/private';

export const load = async ({ fetch }) => {
	const plans_url = `${VITE_API_BASE_URL_SUBSCRIPTIONS_PLANS}`;

	try {
		const response = await fetch(plans_url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
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
		console.log(err);
		error(500, {
			description: "an error occurred while processing your request",
			error: new Error('Internal Server Error')
		});
	}
};
