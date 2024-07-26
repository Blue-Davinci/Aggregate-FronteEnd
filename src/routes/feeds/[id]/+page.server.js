import { redirect } from '@sveltejs/kit';
//import { checkAuthentication } from '$lib/utilities/auth.js';
import {VITE_API_BASE_URL_FEEDS} from '$env/static/private';

export const load = async({params}) =>{
    const feedID = params.id;

    //console.log("Params in [id]: ", feedID);
    // do a quick check on if it actually exists, if not we redirect to the dashboard
    if (!feedID) {
        redirect(303, `/feeds`);
    }
    let feeds_url = `${VITE_API_BASE_URL_FEEDS}/${feedID}`;
    const response = await fetch(feeds_url, {
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
    
}