import {VITE_API_BASE_URL_ADMIN_ANNOUNCEMENTS} from '$env/static/private';
import {announcementSchema} from '$lib/utilities/auth.js';
import { checkAuthentication } from '$lib/utilities/auth.js';
import { redirect, error, fail } from '@sveltejs/kit';

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

export const actions = {
    // fetch
    add_announcement: async({request, cookies})=>{
        const auth = checkAuthentication(cookies).user;
        if (!auth){
            return redirect(303, `/login?redirectTo=/admin/permissions`);
        }
        const announcements_url = `${VITE_API_BASE_URL_ADMIN_ANNOUNCEMENTS}`;
        let announcementData = Object.fromEntries(await request.formData());
        // convert is active to boolean
        announcementData.is_active = announcementData.is_active === 'true';
        try{
            const result = announcementSchema.parse(announcementData);
            announcementData = result;
        } catch(err){
            const fieldErrors = err.flatten();
            console.log('Field Errors: ', fieldErrors);
            return fail(400, {
                title: 'Error Adding Announcement',
                message: `There was an error adding the announcement.`,
                info: 'Please check the fields and try again.'
            });
        }
        // save our data
        try{
            let response = await fetch(announcements_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `ApiKey ${auth}`
                },
                body: JSON.stringify(announcementData)
            });
            if (response.ok) {
                let data = await response.json();
                return data;
            } else {
                let errorData = await response.json();
                console.log('Error Data: ', errorData);
                return {
                    error: errorData.error,
                    status: response.status
                };
            }
        }catch(err){
            console.log('[Ad-Ann]Error: ', err);
            error(500, {
                title: 'Error Adding Announcement',
                message: `Something happened and we could not add the announcement.`,
                info: "It's not you, it's us. Please try again later."
            });
        }
    }
};