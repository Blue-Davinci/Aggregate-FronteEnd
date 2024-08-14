import { checkAuthentication } from '$lib/utilities/auth.js';
import {VITE_API_BASE_URL_ADMIN_USERS} from '$env/static/private';
import { redirect, error } from '@sveltejs/kit';

// Load function to fetch data from the API
export const load = async ({fetch, cookies}) =>{
    const auth = checkAuthentication(cookies).user;
    if (!auth) {
        return redirect(303, `/login?redirectTo=/admin/users`);
    }
    const users_url = `${VITE_API_BASE_URL_ADMIN_USERS}`;
    try{
        let response = await fetch(users_url, {
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
            title: 'Error Loading Users',
            message: `Something happened and we could not load any users.`,
            info: "It's not you, it's us. Please try again later."
        });
    }
}