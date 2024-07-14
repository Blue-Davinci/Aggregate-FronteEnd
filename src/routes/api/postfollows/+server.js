import {VITE_API_BASE_URL_FEEDS_FAVORITES} from '$env/static/private';
import { json } from '@sveltejs/kit';
import {checkAuthentication} from '$lib/utilities/auth.js';

// This serves as the handler for POST requests to add a feed to the user's favorites.
export const POST = async({cookies, request}) => {
    let favoritepost_url = `${VITE_API_BASE_URL_FEEDS_FAVORITES}`;
    let {post_id, feed_id} = await request.json();
    console.log("In Post Request and Recieved: ", post_id, " || ", feed_id);
    let auth = checkAuthentication(cookies).user;
    if (!auth) {
		return json({error: "Unauthorized"}, {status: 401});
	}
    try{
        let response = await fetch(favoritepost_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `ApiKey ${auth}`
            },
            body: JSON.stringify({post_id, feed_id})
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
    }
}

export const DELETE = async({cookies, url}) => {
    let post_id = url.searchParams.get('id');
    let auth = checkAuthentication(cookies).user;
    if (!auth) {
		return json({error: "Unauthorized"}, {status: 401});
	}
    try{
        let unfavorite_url = `${VITE_API_BASE_URL_FEEDS_FAVORITES}/${post_id}`;
        let response = await fetch(unfavorite_url, {
            method: 'DELETE',
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
            console.log("Server/API Delete Favorite: ",data.error);
            return json({error: data.error}, {status: response.status});
        }
        
    }catch(err){
        console.log("End Point Error: ", err);
    }
}