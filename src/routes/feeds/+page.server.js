import { error } from '@sveltejs/kit';
import { VITE_API_BASE_URL_FEEDS} from '$env/static/private';
import { checkAuthentication } from '$lib/utilities/auth.js';
import { getFeedsWithFollows } from '$lib/dataservice/feedfollowDataService.js';

// If a user isn't authenticated, we load all data from feeds
// otherwise we load all the data and also load followed feeds for the user with the api key
// after loading this data, for each feed, if the user follows the feed we add the boolean
// true e.g feed.id = xxxx, feed.followed = true
// that way, on the frontend we can also show whether a feed is followed or not
export const load = async ({ fetch, cookies }) => {
	let feed_url = `${VITE_API_BASE_URL_FEEDS}`;
	let auth = checkAuthentication(cookies).user;

	if (!auth) {
		// If not authenticated, show all feeds with no follow status
		return await getAllFeeds({ fetch }, feed_url);
	}
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

const getAllFeeds = async ({ fetch }, feed_url) => {
	const res = await fetch(feed_url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	if (res.ok) {
		return await res.json();
	} else {
		error(res.status, {
			title: 'Error loading Feeds',
			message: `Something happened and we Could not load any Feeds.`,
			info: "It's not you, it's us. Please try again later."
		});
	}
};

