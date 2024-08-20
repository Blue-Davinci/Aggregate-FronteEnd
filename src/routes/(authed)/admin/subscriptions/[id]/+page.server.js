import { VITE_API_BASE_URL_ADMIN_SUBSCRIPTIONS_CHALLENGED } from '$env/static/private';
import { checkAuthentication } from '$lib/utilities/auth.js';
import { redirect, error} from '@sveltejs/kit';

export const load = async({ fetch, params, cookies }) => {
    const auth = checkAuthentication(cookies).user;
	if (!auth) {
		return redirect(303, `/login?redirectTo=/admin/subscriptions`);
	}
    let subscriptionID = params.id;

    const subscriptions_url = `${VITE_API_BASE_URL_ADMIN_SUBSCRIPTIONS_CHALLENGED}/${subscriptionID}`;
    try {
        let response = await fetch(subscriptions_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `ApiKey ${auth}`
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
    }catch(err){
        console.log('Error: ', err);
        error(500, {
            title: 'Error Loading Subscriptions',
            message: `Something happened and we could not load any subscriptions.`,
            info: "It's not you, it's us. Please try again later."
        });
    }
}