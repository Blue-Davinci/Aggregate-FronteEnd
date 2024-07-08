import {VITE_API_BASE_URL_FEED_FOLLOW_POSTS, VITE_API_BASE_URL_FEEDS_FAVORITES } from '$env/static/private'
import {checkAuthentication} from '$lib/utilities/auth.js';


// get our API KEY from getcookie function() and pass it to the fetch request
//  to get the followed posts
// This function will also be used to run periodic fetches from the Front end.
const getFollowedPostsDataService = async({fetch, cookies})=>{
    let post_url = `${VITE_API_BASE_URL_FEED_FOLLOW_POSTS}`;
    // get our api-key
    let auth = checkAuthentication(cookies).user;
    // if api key is not present, return an error with status 401
    if (!auth){
        return {
            success: false,
            status: 401,
            error: {message: "Unauthorized Access"}
        }
    }
    const response = await fetch(`${post_url}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `ApiKey ${auth}`
        }
    });
    console.log("Token: ", auth);
    if (!response.ok) {
        let data = await response.json();
        console.log("Error: ", data.error, "URL: ", post_url);
        return {
            success: false,
            status: response.status,
            error: data
        }
    }
    // Aggregation
    //let data = ;
    let favoriteposts = await getFavoritePostsDataService({fetch}, auth);
    /*
    console.log("============================================");
    console.log("Favorite Posts: ", favoriteposts.data);
    console.log("Followed Posts: haloooo>>");
    console.log("============================================");
    */
    return {
        success: true,
        status: response.status,
        data: await response.json(),
        favorites: favoriteposts.data
    };
}

const getFavoritePostsDataService = async({fetch}, auth) => {
    let favorites_url = `${VITE_API_BASE_URL_FEEDS_FAVORITES}`;
    const response = await fetch(`${favorites_url}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `ApiKey ${auth}`
        }
    });
    if (!response.ok) {
        let data = await response.json();
        console.log("Error: ", data.error, "URL: ", favorites_url);
        return {
            success: false,
            status: response.status,
            error: data
        }
    }
    let favorites = await response.json();
    return {
        success: true,
        status: response.status,
        data: favorites
    };

}


export {
    getFollowedPostsDataService
}