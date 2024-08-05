import {VITE_API_BASE_URL_SUBSCRIPTIONS} from '$env/static/private';
import { checkAuthentication } from '$lib/utilities/auth.js';
import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';


export const load = async ({ fetch, cookies }) => {
    const auth = checkAuthentication(cookies).user;
    if (!auth) {
        return redirect(303, `/login?redirectTo=/dashboard/transactionhistory`);
    }
    const tranactionhistory_url = `${VITE_API_BASE_URL_SUBSCRIPTIONS}`;

    try{
        let response = await fetch(tranactionhistory_url, {
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
            title: 'Error Loading Transaction History',
            message: `Something happened and we could not load any transaction history.`,
            info: "It's not you, it's us. Please try again later."
        });
    }
}