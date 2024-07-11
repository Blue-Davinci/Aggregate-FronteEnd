import {VITE_API_BASE_URL_STATS_TOP_FEEDS} from '$env/static/private';
import {json} from '@sveltejs/kit'; 


// This gets the top x feeds from the server
// We call it from the getTopStatsDataService.js
// You can set the x to limit the number of feeds you want to get
// The default is 5 i.e Top 5 feeds.
export const GET = async() => {
    let page_size = 5;
    let gettop_feeds_url = `${VITE_API_BASE_URL_STATS_TOP_FEEDS}?page_size=${page_size}`;
    try{
        let response = await fetch(gettop_feeds_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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