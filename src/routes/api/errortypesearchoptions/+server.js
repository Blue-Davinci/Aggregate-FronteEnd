import {VITE_API_BASE_URL_ADMIN_SEARCH_OPTIONS_ERROR_TYPES} from '$env/static/private';
import {checkAuthentication} from '$lib/utilities/auth';
import {json, redirect} from '@sveltejs/kit';

export const GET = async({cookies}) => {
    let auth = checkAuthentication(cookies).user;
    if (!auth){
        return redirect (303, `/login?redirectTo=/dashboard`);
    }
    let searchoption_feeds = `${VITE_API_BASE_URL_ADMIN_SEARCH_OPTIONS_ERROR_TYPES}`;
    try{
        let response = await fetch(searchoption_feeds, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `ApiKey ${auth}`
            }
        });
        if (response.ok){
            let data = await response.json();
            return json(data);
        }else{
            let data = await response.json();
            return json({error: data.error}, {status: response.status});
        }
    }catch(err){
        console.log("Admin Error Type Search Option End Point Error: ", err);
    }
}