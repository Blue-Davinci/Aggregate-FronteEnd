import {VITE_API_BASE_URL_ANNOUNCEMENTS} from '$env/static/private';
import { checkAuthentication } from '$lib/utilities/auth.js';
import { json, redirect } from '@sveltejs/kit';

export const GET = async ({ fetch, cookies }) => {
    let auth = checkAuthentication(cookies).user;
    if (!auth) {
        return redirect(303, `/login?redirectTo=/dashboard`);
    }

    let announcements_url = `${VITE_API_BASE_URL_ANNOUNCEMENTS}`;
    try {
        let response = await fetch(announcements_url, {
            method: 'GET',
            headers: {
                Authorization: `ApiKey ${auth}`
            }
        });

        console.log("Response Status: ", response.status);

        if (response.ok) {
            let data = await response.json();
            return json(data);
        } else {
            let errorData = await response.json();
            console.error("Error Response Data: ", errorData);
            return json({ error: errorData.error }, { status: response.status });
        }
    } catch (err) {
        console.log("Announcements End Point Error: ", err);
        return json({ error: 'Failed to fetch announcements' }, { status: 500 });
    }
}
