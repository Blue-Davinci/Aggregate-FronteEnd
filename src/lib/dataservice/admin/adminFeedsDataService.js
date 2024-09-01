import {buildFeedFollowUrl} from '$lib/utilities/utils.js';

const adminGetAllFeedsWithParams = async({ fetch: customFetch } = {}, page = 0, page_size = 0, name = '', feed_type='', priority='') => {
    let url = '/api/adminfeeds';
    let params = {
        name: name,
        page: page,
        page_size: page_size,
        feed_type: feed_type,
        priority: priority
    };
    console.log("Params: ", params);
    let fetchFunc = customFetch || fetch; // Use custom fetch if provided, else use global fetch
    let endpoint_url = buildFeedFollowUrl(url, params);
    console.log("API Post URL: ", endpoint_url);
    // send data
    try {
        const response = await fetchFunc(`${endpoint_url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {
            return {
                success: true,
                status: response.status,
                data: await response.json(),
            };
        } else {
            let errorData = await response.json();
            return {
                success: false,
                status: response.status,
                error: errorData.error
            }
        }
    }catch (err){
        return {
            success: false,
            status: 500,
            error: { message: err.message }
        }
    }

}


const adminUpdateFeed = async (feedId, feedData) => {
    if (!feedId) {
        return {
            success: false,
            status: 400,
            error: "Invalid Feed ID"
        };
    }
    let feed_url = `/api/adminfeeds?id=${feedId}`;
    try {
        let response = await fetch(feed_url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedData)
        });
        if (response.ok) {
            return {
                success: true,
                status: response.status,
                data: await response.json(),
            };
        } else {
            let errorData = await response.json();
            return {
                success: false,
                status: response.status,
                error: errorData.error
            }
        }
    } catch (err) {
        return {
            success: false,
            status: 500,
            error: { message: err.message }
        }
    }
}

export {
    adminUpdateFeed,
    adminGetAllFeedsWithParams
}