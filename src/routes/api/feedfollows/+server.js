import { json } from '@sveltejs/kit';
import {VITE_API_BASE_URL_FEED_FOLLOW} from '$env/static/private';
import {checkAuthentication} from '$lib/utilities/auth.js';
//import { redirect } from '@sveltejs/kit';

/**
 * Handles POST requests to follow a feed.
 * 
 * This function processes a POST request to follow a specific feed. It first retrieves the feed ID from the request's body.
 * It then checks if the user is authenticated by examining the cookies. If the user is not authenticated, it returns an
 * unauthorized error response. If the user is authenticated, it proceeds to make a POST request to the feed follow URL
 * (specified by `VITE_API_BASE_URL_FEED_FOLLOW` environment variable) with the feed ID. The user's authentication token
 * is included in the request headers.
 * 
 * @param {Object} context - The request context, containing cookies and the request object.
 * @param {Object} context.cookies - The cookies object, used for checking user authentication.
 * @param {Object} context.request - The request object, used to extract the feed ID.
 * @returns {Promise<Object>} A promise that resolves to the response object. The response contains the result of the
 * feed follow operation. If the operation is successful, the response data from the server is returned. If the operation
 * fails, an error message and the corresponding status code are returned. In case of an exception during the request to
 * the feed follow URL, an internal server error response is returned.
 */
export const POST = async({cookies, request}) =>{
    let feedfollow_url = `${VITE_API_BASE_URL_FEED_FOLLOW}`;
    let feed_id = await request.json();
    console.log("In Post Request and Recieved: ", feed_id);
    let auth = checkAuthentication(cookies).user;
    if (!auth) {
		return json({error: "Unauthorized"}, {status: 401});
	}
    try{
        let response = await fetch(feedfollow_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `ApiKey ${auth}`
            },
            body: JSON.stringify(feed_id)
        })
        if (response.ok){
			let data = await response.json();
			return json(data);
        }else{
            let data = await response.json();
            //console.log("[Server Feed Follow] Error: ", data);
            return json({error: data.error}, {status: response.status});
        }
    }catch(err){
        console.log("End Point Error: ", err);
        return json({error: "Internal Server Error"}, {status: 500});
    }
}

/**
 * Handles DELETE requests to unfollow a feed.
 * 
 * This function processes a DELETE request to unfollow a specific feed identified by its Follow ID. The fOLLOW ID is obtained from
 * the URL's query parameters. It checks if the user is authenticated by examining the cookies. If the user is not authenticated,
 * it returns an unauthorized error response. If the user is authenticated, it proceeds to make a DELETE request to the feed
 * unfollow URL, constructed by appending the feed ID to the `VITE_API_BASE_URL_FEED_FOLLOW` environment variable. The user's
 * authentication token is included in the request headers.
 * 
 * @param {Object} context - The request context, containing cookies and the URL object.
 * @param {Object} context.cookies - The cookies object, used for checking user authentication.
 * @param {Object} context.url - The URL object, used to extract the feed ID from the query parameters.
 * @returns {Promise<Object>} A promise that resolves to the response object. The response contains the result of the
 * feed unfollow operation. If the operation is successful, the response data from the server is returned. If the operation
 * fails, an error message and the corresponding status code are returned. In case of an exception during the request to
 * the feed unfollow URL, a console log is made indicating a critical error, but no response is returned from the function.
 */
export const DELETE = async({cookies, url}) =>{
    let feed_id  = url.searchParams.get('id');
    let auth = checkAuthentication(cookies).user;
    if (!auth) {
		return json({error: "Unauthorized"}, {status: 401});
	}
    try{
        let feedunfollow_url = `${VITE_API_BASE_URL_FEED_FOLLOW}/${feed_id}`;
        console.log("In Delete Request and Recieved: ", feed_id, " || URL: ", feedunfollow_url);
        let response = await fetch(feedunfollow_url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `ApiKey ${auth}`
            }
        })
        if (response.ok){
            let data = await response.json();
            console.log(data.message);
            return json(data)
        }else{
            let data = await response.json();
            console.log(data.error);
            return json({ error: data.error }, { status: response.status });
        }
    }catch(err){
        console.log('[Server Unfollow] CRITICAL ERROR', err);
    }

}