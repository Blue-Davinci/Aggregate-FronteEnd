import { error } from '@sveltejs/kit';
import { getFeedsWithFollows } from '$lib/dataservice/feedfollowDataService.js';

// If a user isn't authenticated, we load all data from feeds
// otherwise we load all the data and also load followed feeds for the user with the api key
// after loading this data, for each feed, if the user follows the feed we add the boolean
// true e.g feed.id = xxxx, feed.followed = true
// that way, on the frontend we can also show whether a feed is followed or not
export const load = async ({ fetch}) => {
	// otherwise we use
    //let response2 = await getAllFeeds({ fetch }, feed_url)
    //console.log("-- Respomse 2: ", response2);
	let response = await getFeedsWithFollows({ fetch },0,0,'');
    if(response.error){
        console.log("----- Error: ", response.error);
        error(response.status, {
            title: 'Error loading Feeds',
            message: `Something happened and we Could not load any Feeds.`,
            info: response.error
        });
    }else{
        //console.log(">>> Response: ", response);
        return response;
    }

};


