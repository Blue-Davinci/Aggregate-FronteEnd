import {VITE_API_BASE_URL_FEED_FOLLOW_POSTS} from '$env/static/private'
import {buildFeedFollowUrl} from '$lib/utilities/utils.js';
import { redirect } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import {checkAuthentication} from '$lib/utilities/auth.js';

export const GET= async({cookies, url})=>{
    	// get our parameters
	let params = {
		name: url.searchParams.get('name'),
		page: url.searchParams.get('page'),
		page_size: url.searchParams.get('page_size')
	};
    let post_url = buildFeedFollowUrl(VITE_API_BASE_URL_FEED_FOLLOW_POSTS, params);
    console.log("API Post URL: ", post_url);
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