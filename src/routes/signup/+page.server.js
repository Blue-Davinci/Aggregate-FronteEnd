import { fail, redirect } from '@sveltejs/kit';
import { VITE_API_BASE_URL_SIGNUP } from '$env/static/private';
import { signupSchema } from '$lib/utilities/auth.js';

export const actions = {
	signup: async ({ fetch, request }) => {
		let signup_url = VITE_API_BASE_URL_SIGNUP;
		let signupData = await request.formData();
		const name = signupData.get('name');
		const email = signupData.get('email');
		const password = signupData.get('password');
		console.log('Name: ', name, '|| URL: ', signup_url);
		try {
			signupSchema.parse(Object.fromEntries(signupData));
		} catch (err) {
			const fieldErrors = err.flatten();
			return fail(400, {
				description: 'an error occurred while processing your request',
				error: fieldErrors.fieldErrors
			});
		}
		// send the data to the endpoint
		const response = await fetch(signup_url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, email, password })
		});
		if (response.ok) {
			const urlpath = '/signup/resend-activation?email=' + email;
			console.log('Response: ', response);
			return redirect(303, urlpath);
		} else {
			const errorData = await response.json();
			console.log('Error Data: ', errorData);
			return fail(response.status, {
				description: 'an error occurred while processing your request',
				error: errorData.error
			});
		}
	}
};
