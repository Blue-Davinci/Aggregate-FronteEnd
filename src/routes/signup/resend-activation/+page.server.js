import { VITE_API_BASE_URL_PASSWORD_RESEND_ACTIVATION } from '$env/static/private';
import { emailSchema } from '$lib/utilities/auth.js';
import { fail} from '@sveltejs/kit';

export const actions = {
	resend_activation: async ({ fetch, request }) => {
		let resendactivation_url = `${VITE_API_BASE_URL_PASSWORD_RESEND_ACTIVATION}`;
		const resendActivationData = await request.formData();
		const email = resendActivationData.get('email');
		try {
			const result = emailSchema.parse(email);
			console.log(result);
		} catch (err) {
			const fieldErrors = err.flatten();
            console.log("Field Errors: ", fieldErrors);
			return fail(400, {
				description: 'an error occurred while processing your request',
				error: fieldErrors
			});
		}
        // send the data to the endpoint
        try{
            let response = await fetch(resendactivation_url, {
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
                return {
                    flag: "fail",
                    status: response.status,
                    error: errorData.error
                };
            }
        }catch(err){
            console.log("Error: ", err);
            
        }
	}
};
