import {VITE_API_BASE_URL_ANNOUNCEMENTS} from '$env/static/private';
import { checkAuthentication } from '$lib/utilities/auth.js';
import { json, redirect } from '@sveltejs/kit';

// Fetches all announcements, not read for the user, from the API
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
                'Content-Type': 'application/json',
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

// Allows mark as read. Users who have read the announcement will not see it again.
export const POST = async ({ fetch, cookies, request }) => {
    let auth = checkAuthentication(cookies).user;
    if (!auth) {
        return redirect(303, `/login?redirectTo=/dashboard`);
    }

    let announcements_url = `${VITE_API_BASE_URL_ANNOUNCEMENTS}`;
    // get our data from the request
    let announcementData = await request.json();
    let announcement_id = announcementData.announcement_id;
    // parse announcement id to an int
    announcement_id = parseInt(announcement_id);
    if (isNaN(announcement_id) || announcement_id <= 0) {
        return json({ error: 'Invalid announcement ID' }, { status: 400 });
    }
    // make the request to the API
    try {
        let response = await fetch(announcements_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `ApiKey ${auth}`
            },
            body: JSON.stringify({ announcement_id })
        });
        // return the response
        if (response.ok) {
            let data = await response.json();
            return json(data);
        } else {
            let errorData = await response.json();
            console.error("Error Response Data: ", errorData);
            return json({ error: errorData.error }, { status: response.status });
        }
    }catch(err){
        console.log("End Point Error: ", err);
        return json({ error: 'Failed to post announcement' }, { status: 500 });
    }
}