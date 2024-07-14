import {VITE_API_BASE_URL_FEED_FOLLOW_POSTS} from '$env/static/private'
import { redirect } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import {checkAuthentication} from '$lib/utilities/auth.js';

export const GET= async({cookies})=>{
    let post_url = `${VITE_API_BASE_URL_FEED_FOLLOW_POSTS}`;
    // get our api-key
    let auth = checkAuthentication(cookies).user;
    if (!auth){
        redirect (303, `/login?redirectTo=/dashboard`);
    }
    try{
        const response = await fetch(`${post_url}`,{
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
            let errorData = await response.json();
            return json({error: errorData.error}, {status: response.status});
        }
    }catch(err){
        console.log("Server Error In Post Retrieving: ", err);
    }
}