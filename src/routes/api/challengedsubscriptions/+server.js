import {VITE_API_BASE_URL_SUBSCRIPTIONS_CHALLENGEDL} from '$env/static/private';
import { checkAuthentication } from '$lib/utilities/auth.js';
import { redirect } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const GET = async ({ cookies }) => {
    let auth = checkAuthentication(cookies).user;
    if (!auth) {
        return redirect (303, `/login?redirectTo=/dashboard`);
    }
    let challenged_subscription_url = `${VITE_API_BASE_URL_SUBSCRIPTIONS_CHALLENGEDL}`;
    try {
        let response = await fetch(challenged_subscription_url, {
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
            return json({error: errorData.error}, {status: response.status});
        }
    }catch(err) {
        console.log("Challenged Subscription End Point Error: ", err);
    }   
}
