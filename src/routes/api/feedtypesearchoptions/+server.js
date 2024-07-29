import {VITE_API_BASE_URL_SEARCH_OPTIONS_FEED_TYPES} from '$env/static/private';
import {json} from '@sveltejs/kit'; 

export const GET = async() => {
    let searchoption_feeds = `${VITE_API_BASE_URL_SEARCH_OPTIONS_FEED_TYPES}`;
    console.log("Feed Type search options url: ", searchoption_feeds);
    try{
        let response = await fetch(searchoption_feeds, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (response.ok){
            let data = await response.json();
            return json(data);
        }else{
            let data = await response.json();
            return json({error: data.error}, {status: response.status});
        }
    }catch(err){
        console.log("End Point Error: ", err);
    }
}