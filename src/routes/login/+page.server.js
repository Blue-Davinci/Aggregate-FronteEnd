import { fail, redirect } from '@sveltejs/kit';
import { VITE_API_BASE_URL_LOGIN } from '$env/static/private';
import { registrationSchema, saveAuthentication } from '$lib/utilities/auth.js';

// we set the default redirection path to the dashboard page
let redirectTo = '/dashboard';

// we capture the url path for redirection purposes
export const load = async ({ url }) => {
	const urlpath = url.searchParams.get('redirectTo');
	redirectTo = urlpath ? urlpath : '/dashboard';
	return {
		status: 200,
		redirectTo: redirectTo
	};
};
// successful authentication redirects the user back to the page they have come back
// from or to the dashboard page (about page for the debugging)
function successfulAuth() {
	console.log('[page.server.js LOGIN Url Path: ', redirectTo);
	return redirect(303, redirectTo);
}
// use actions to get the input and pass it to our endpoint
export const actions = {
	login: async ({ fetch, request, cookies }) => {
        console.log("Login action called");
		// retrieve our login url
		const login_url = `${VITE_API_BASE_URL_LOGIN}`;
		// fetch login data from frontend
		const loginData = await request.formData();
		// parse the data
		const email = loginData.get('email');
		const password = loginData.get('password');
		//console.log("Form Data ", loginData);
		// perform validation
		try {
			const result = registrationSchema.parse(Object.fromEntries(loginData));
			console.log(result);
		} catch (err) {
			const fieldErrors = err.flatten();
			return fail(400, {
				description: 'an error occurred while processing your request',
				error: fieldErrors.fieldErrors
			});
		}
		try {
            console.log("Sending login data to the endpoint");
			// send the data to the endpoint
			const res = await fetch(login_url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			});
            console.log("Response from the endpoint: ", res);
			if (res.ok) {
				// get response
				let result = await res.json();
				// before saving the user, we will include the role field inside it as well
				// this is to ensure that we have the role field in the user object
				result.user.role = result.role;
				//save authentication for the user
				console.log('User Info: ', result.user);
				let isSuccesfulAuth = saveAuthentication(cookies, result.api_key, result.user);
				if (isSuccesfulAuth) {
					successfulAuth();
				} else {
					return fail(res.status, {
						description: 'an error occurred while processing your request',
						error: 'could not presist authenticated user'
					});
				}
			} else {
                console.log("Error response from the endpoint: ", res);
				const errorData = await res.json();
				return fail(res.status, {
					description: 'an error occurred while processing your request',
					error: errorData.error
				});
			}
		} catch (err) {
			console.log('Error login client in:', err);
		}
	}
};
