import {VITE_API_BASE_URL_ADMIN_ERRORS} from '$env/static/private';
import { checkAuthentication } from '$lib/utilities/auth.js';
import { json } from '@sveltejs/kit';


export const DELETE = async ({ cookies, url }) => {
    let error_id = url.searchParams.get('id');
    let auth = checkAuthentication(cookies).user;
    if (!auth) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }
    // minor check for the ID
    if (!error_id){
        return json({ error: 'Invalid Error data' }, { status: 400 });
    }
    let clearerror_url = `${VITE_API_BASE_URL_ADMIN_ERRORS}/${error_id}`;
    console.log("-----  URL: ", clearerror_url);
    try {
        let response = await fetch(clearerror_url, {
            method: 'DELETE',
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
            return json({ error: errorData.error }, { status: response.status });
        }
    } catch (err) {
        console.log('[Server Clear error] CRITICAL ERROR', err);
    }
}