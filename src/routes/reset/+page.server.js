import { emailSchema } from '$lib/utilities/auth.js';
import { VITE_API_BASE_URL_PASSWORD_INITIAL } from '$env/static/private';
import { fail } from '@sveltejs/kit';
export const actions = {
	// {fetch, request}
	passwordResetRequest: async ({ fetch, request }) => {
		let reset_url = VITE_API_BASE_URL_PASSWORD_INITIAL;
		console.log('Reset URL: ', reset_url);
		let resetData = await request.formData();
		let email = resetData.get('email');
		console.log('Aquired: ', email);
		try {
			const result = emailSchema.parse(email);
			console.log(result);
		} catch (err) {
			const fieldErrors = err.flatten();
			return fail(400, {
				description: 'an error occurred while processing your request',
				error: fieldErrors
			});
		}
		// send the data to the endpoint
		let response = await fetch(reset_url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		});
		if (response.ok) {
			let data = await response.json();
			console.log('Data: ', data.message);
			return {
                flag: "success",
                status: response.status,
                data
            };
		} else {
			const errorData = await response.json();
            // we can get 3 main types of error, 1, an email one that tells a user
            // to "activate" their account, 2, a generic error that is about an email not
            // being found and really shouldn't be shown to the user, 3, a general server
            // error. We will return an fail error on the email errors and all the rest
            // will get a generic error message.
            if (errorData.error?.email){
                console.log("Email Error: ", errorData.error.email);
                return fail(response.status, {
                    description: 'an error occurred while processing your request',
                    error: errorData.error
                });
            }
            // And for all other errors we will return a generic error message
            let errormessage = "if we found a matching email address, we have sent password reset instructions to it";
			return {
                flag: "fail",
                status: response.status,
                error: errormessage
            };
		}
	}
};
