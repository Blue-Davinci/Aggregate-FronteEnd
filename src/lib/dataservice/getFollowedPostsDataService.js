import {buildFeedFollowUrl} from '$lib/utilities/utils.js';
// get our API KEY from getcookie function() and pass it to the fetch request
//  to get the followed posts
// This function will also be used to run periodic fetches from the Front end.
const getFollowedPostsDataService = async({ fetch: customFetch } = {}, page = 0, page_size = 0, name = '', feedID='')=>{
    let url = "/api/posts";
    let params = {
        name: name,
        page: page,
        page_size: page_size,
        feedID: feedID
    };
    let fetchFunc = customFetch || fetch; // Use custom fetch if provided, else use global fetch
    let endpoint_url = buildFeedFollowUrl(url, params);
    console.log("--- Post DS Built url: ", endpoint_url);
    console.log("Parameters: ", params);
    // get our api-key
    const response = await fetchFunc(`${endpoint_url}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        let data = await response.json();
        //console.log("Error: ", data.error, "URL: ", post_url);
        return {
            success: false,
            status: response.status,
            error: data
        }
    }
    return {
        success: true,
        status: response.status,
        data: await response.json(),
    };
}


export {
    getFollowedPostsDataService
}