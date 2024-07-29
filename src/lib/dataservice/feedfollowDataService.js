import {buildFeedFollowUrl} from '$lib/utilities/utils.js';

// addFeedFollow() sends feed data to our API endpoint.
// We send the feed's ID UUID via a POST Request, The expected object
// Is a success message or an error object message accessed via error.error
async function addFeedFollow(data) {
	try {
		let url = '/api/feedfollows';
		//console.log('Got: ', data);
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ feed_id: data })
		});
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			const errorData = await response.json();
			return errorData;
		}
	} catch (err) {
		console.log('sendData error: ', err);
	}
}

// unfollowFollowedFeed() sends the FOLLOW ID and not the FEED ID.
// the follow ID is a unique identifier for each followed feed rather that the feed itself.
// We send this follow id as a URL parameter and expect a success message or an error object 
// message accessed via error.error
async function unfollowFollowedFeed(data) {
	try {
		let url = `/api/feedfollows?id=${data}`;
		//console.log('Got: ', data, ' || url: ', url);
		const response = await fetch(url, {
			method: 'DELETE',
		});
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			const errorData = await response.json();
			return errorData;
		}
	} catch (err) {
		console.log('sendData error: ', err);
	}
}

async function getFeedsWithFollows({ fetch: customFetch } = {}, page = 0, page_size = 0, name = '', feed_type='') {
    let url = '/api/feedfollows';
    let params = {
        name: name,
        page: page,
        page_size: page_size,
		feed_type: feed_type
    };
    let fetchFunc = customFetch || fetch; // Use custom fetch if provided, else use global fetch
    let endpoint_url = buildFeedFollowUrl(url, params);
    //console.log("Built url: ", endpoint_url);
    try {
        const response = await fetchFunc(endpoint_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
		
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorData = await response.json();
            return errorData;
        }
    } catch (err) {
        console.log('sendData error: ', err);
        return { error: 'Fetch failed' };
    }
}
export { addFeedFollow, unfollowFollowedFeed, getFeedsWithFollows };
