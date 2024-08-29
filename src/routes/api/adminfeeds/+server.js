import {VITE_API_BASE_URL_ADMIN_FEEDS_APPROVALS} from '$env/static/private';
import {adminFeedSchema} from '$lib/utilities/auth.js';
import { checkAuthentication } from '$lib/utilities/auth.js';
import { json, redirect } from '@sveltejs/kit';

// PATCH: Updates a feed. This route supports partial updates
// so we can use it to do specific updates such as approving a feed
// or even setting it's priority. We will not need to provide full
// data here and check for updated fileds like we did in the normal user
// feed update. All we will need is to 
// The feed id is passed as a parameter in the URL
// The data to be updated is passed in the request body
export const PATCH = async ({ fetch, cookies, request, url }) => {
    let auth = checkAuthentication(cookies).user;
    if (!auth) {
        return redirect(303, `/login?redirectTo=/dashboard/feedmanager`);
    }
    // get the feed id from the URL
    let feed_id = url.query.get('id');
    // check if the UUID id is valid
    if (!feed_id) {
        return json({ error: 'Invalid feed ID' }, { status: 400 });
    }
    // get our data from the request
    let feedData = await request.json();
    // validate the data
    try {
        const result = adminFeedSchema.parse(feedData);
        console.log(result);
    } catch (err) {
        const fieldErrors = err.flatten();
        return json({ error: fieldErrors.fieldErrors }, { status: 400 });
    }
    // prepare the url
    let feed_url = `${VITE_API_BASE_URL_ADMIN_FEEDS_APPROVALS}/${feed_id}`;
    // make the request to the API
    try {
        let response = await fetch(feed_url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `ApiKey ${auth}`
                },
                body: JSON.stringify(feedData)
            });
        if (response.ok) {
            let data = await response.json();
            return json(data);
        }else{
            let errorData = await response.json();
                return {
                    error: errorData.error,
                    status: response.status
                };
        }
    }catch(err){
        console.log("End Point Error: ", err);
        return json({ error: 'Failed to update feed' }, { status: 500 });
    }
}