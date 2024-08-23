import {VITE_API_BASE_URL_ADMIN_ERRORS} from '$env/static/private';
import { checkAuthentication } from '$lib/utilities/auth.js';
import { redirect, error} from '@sveltejs/kit';

// Load function to get all scraper errors from the database
export const load = async({ fetch, cookies }) => {
    const auth = checkAuthentication(cookies).user;
    if (!auth) {
        return redirect(303, `/login?redirectTo=/admin/errors`);
    }

    const errors_url = `${VITE_API_BASE_URL_ADMIN_ERRORS}`;
    try {
        let response = await fetch(errors_url, {
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
        console.log('Scraper Log Error: ', err);
        error(500, {
            title: 'Error Loading Errors',
            message: `Something happened and we could not load any errors.`,
            info: "It's not you, it's us. Please try again later."
        });
    }
}

export const actions = {
    resolveerror: async ({request, fetch, cookies}) => {
        const auth = checkAuthentication(cookies).user;
        if (!auth) {
            return redirect(303, `/login?redirectTo=/admin/errors`);
        }
        let errorData = await request.formData();
        let error_id = errorData.get('id');
        let admin_notified = errorData.get('admin_notified') === "true";
        let resolved = errorData.get('resolved') === "true";
        let resolution_notes = errorData.get('resolution_notes');

        //console.log(">>Admin: ", admin_notified, "Resolved: ", resolved, "Resolution Notes: ", resolution_notes, "Error ID: ", error_id);
        if (!error_id) {
            return {
                error: "Invalid Error ID",
                status: 400
            };
        }
        const resolve_url = `${VITE_API_BASE_URL_ADMIN_ERRORS}/${error_id}`;
        console.log('Resolve URL: ', resolve_url);
        try {
            let response = await fetch(resolve_url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `ApiKey ${auth}`
                },
                body: JSON.stringify({admin_notified, resolved, resolution_notes})
            });
            if (response.ok) {
                return {
                    success: true,
                    status: response.status,
                    data: await response.json()
                };
            } else {
                let errorData = await response.json();
                return {
                    success: false,
                    status: response.status,
                    error: errorData.error
                };
            }
        } catch (err) {
            console.log('Error Resolving Error: ', err);
            return {
                success: false,
                status: 500,
                error: { message: err.message }
            };
        }
    }
}