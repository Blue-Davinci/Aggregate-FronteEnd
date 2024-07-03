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
export { addFeedFollow, unfollowFollowedFeed };
