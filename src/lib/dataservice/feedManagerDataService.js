import {buildFeedFollowUrl} from '$lib/utilities/utils.js';

const getAllFeedsCreatedByUser = async({ fetch: customFetch } = {}, page = 0, page_size = 0, name = '')=>{
    let url = "/api/feedmanager";
    let params = {
        name: name,
        page: page,
        page_size: page_size
    };
    let fetchFunc = customFetch || fetch; // Use custom fetch if provided, else use global fetch
    let endpoint_url = buildFeedFollowUrl(url, params);
    console.log("--- Created FEEDS Built url: ", endpoint_url);
    const response = await fetchFunc(`${endpoint_url}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        let data = await response.json();
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
    getAllFeedsCreatedByUser
}