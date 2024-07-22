import { checkAuthentication } from '$lib/utilities/auth.js';
import { json } from '@sveltejs/kit';
import {VITE_API_BASE_URL_FEED_FOLLOW_POSTS_COMMENTS_NOTIFICATIONS} from '$env/static/private';

// The delete method is used to clear the notification once a user clicks on it.
// We send a post ID instead of a comment ID as there is no need to keep clearing a single
// notification at a time especially if users have multiple comments. We clear all notifications
// for a post at once.The user just needs to yk, read them. simple right?
export const DELETE = async ({ cookies, url }) => {
    let post_id = url.searchParams.get('id');
    let auth = checkAuthentication(cookies).user;
	if (!auth) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}
    // minor check for the ID
    if (!post_id){
        return json({ error: 'Invalid Comment data' }, { status: 400 });
    }
    let clearcomment_url = `${VITE_API_BASE_URL_FEED_FOLLOW_POSTS_COMMENTS_NOTIFICATIONS}/${post_id}`;
    console.log("-----  URL: ", clearcomment_url);
    try {
        let response = await fetch(clearcomment_url, {
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
		console.log('[Server Clear notification] CRITICAL ERROR', err);
	}
}