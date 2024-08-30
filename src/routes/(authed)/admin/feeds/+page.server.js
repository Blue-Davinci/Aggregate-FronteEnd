import {VITE_API_BASE_URL_ADMIN_FEEDS} from '$env/static/private';
import {checkAuthentication} from '$lib/utilities/auth.js';
import { fail, redirect} from '@sveltejs/kit';

export const load = async ({ fetch, cookies }) => {
    const auth = checkAuthentication(cookies).user;
    if (!auth) {
        return redirect(303, `/login?redirectTo=/admin/feeds`);
    }
    const feedApprovalsUrl = `${VITE_API_BASE_URL_ADMIN_FEEDS}`;
    try{
        const response = await fetch(feedApprovalsUrl, {
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
        fail(500, {
            title: 'Error Loading Feed Approvals',
            message: `Something happened and we could not load any feed approvals.`,
            info: "It's not you, it's us. Please try again later."
        });
    }
}