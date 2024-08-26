import {VITE_API_BASE_URL_ADMIN_ANNOUNCEMENTS} from '$env/static/private';
import { checkAuthentication } from '$lib/utilities/auth.js';
import { redirect, error } from '@sveltejs/kit';

// Load function to fetch data from the API
export const load = async ({fetch, cookies}) =>{
    const auth = checkAuthentication(cookies).user;
    if (!auth) {
        return redirect(303, `/login?redirectTo=/admin/announcements`);
    }
    const announcements_url = `${VITE_API_BASE_URL_ADMIN_ANNOUNCEMENTS}`;
    try{
        let response = await fetch(announcements_url, {
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
    } catch(err){
        console.log('Error: ', err);
        error(500, {
            title: 'Error Loading Announcements',
            message: `Something happened and we could not load any announcements.`,
            info: "It's not you, it's us. Please try again later."
        });
    }
}