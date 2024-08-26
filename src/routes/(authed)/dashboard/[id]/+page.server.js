//import {postDetail} from '$lib/store/postDetailStore.js';
import { redirect } from '@sveltejs/kit';
import { checkAuthentication } from '$lib/utilities/auth.js';
import {VITE_API_BASE_URL_FEED_FOLLOW_POSTS} from '$env/static/private';

export const load = async({params, cookies}) =>{
    const postId = params.id;
    let auth = checkAuthentication(cookies).user;
    if (!auth) {
         return redirect(303, `/login?redirectTo=/dashboard/${postId}`);
    }
    console.log("Params in [id]: ", postId); 
    // do a quick check on if it actually exists, if not we redirect to the dashboard
    if (!postId) {
       return redirect(303, `/dashboard`);
    }

    let rssfeedpost_url = `${VITE_API_BASE_URL_FEED_FOLLOW_POSTS}/${postId}`;
    const response = await fetch(rssfeedpost_url, {
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
}