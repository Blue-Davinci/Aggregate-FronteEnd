import { checkAuthentication } from '$lib/utilities/auth.js';
import { json } from '@sveltejs/kit';
import {VITE_API_BASE_URL_FEED_FOLLOW_POSTS_COMMENTS} from '$env/static/private';


export const DELETE = async ({ cookies, url }) => {
    let comment_id = url.searchParams.get('id');
    let auth = checkAuthentication(cookies).user;
	if (!auth) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}
    // minor check for the ID
    if (!comment_id){
        return json({ error: 'Invalid Comment ID' }, { status: 400 });
    }
    let clearcomment_url = `${VITE_API_BASE_URL_FEED_FOLLOW_POSTS_COMMENTS}/${comment_id}`;
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