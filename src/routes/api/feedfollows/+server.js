import { json } from '@sveltejs/kit';
import {VITE_API_BASE_URL_FEED_FOLLOW} from '$env/static/private';
import {checkAuthentication} from '$lib/utilities/auth.js';
//import { redirect } from '@sveltejs/kit';


export const POST = async({cookies, request}) =>{
   console.log(">>>>>>>>> In Server");
    let feedfollow_url = `${VITE_API_BASE_URL_FEED_FOLLOW}`;
    let feed_id = await request.json();
    console.log("In Post Request and Recieved: ", feed_id);
    console.log("[Server Feed Follow] Feed Follow Request: ", feed_id);
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