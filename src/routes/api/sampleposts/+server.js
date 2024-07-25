import {VITE_API_BASE_URL_FEEDS_SAMPLE_POSTS} from '$env/static/private';
import {json} from '@sveltejs/kit'; 

// This gets the top x creators from the server
// We call it from the getTopStatsDataService.js
// You can set the x to limit the number of creators you want to get
// The default is 5 i.e Top 5 Creators.
export const GET = async({url}) => {
    let feedID = url.searchParams.get('feedID');
    let page_size = 3;
    let sample_posts_url = `${VITE_API_BASE_URL_FEEDS_SAMPLE_POSTS}/${feedID}?page_size=${page_size}`;
    console.log("URL: ", sample_posts_url);
    try{
        let response = await fetch(sample_posts_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok){
            let data = await response.json();
            //console.log("Data: ", data);
            return json(data);
        }else{
            let data = await response.json();
            return json({error: data.error}, {status: response.status});
        }
    }catch(err){
        console.log("End Point Error: ", err);
    }
}