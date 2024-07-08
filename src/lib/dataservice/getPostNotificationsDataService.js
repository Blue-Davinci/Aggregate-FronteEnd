import {VITE_API_BASE_URL_NOTIFICATIONS} from '$env/static/private'
import {checkAuthentication} from '$lib/utilities/auth.js';


// get our API KEY from getcookie function() and pass it to the fetch request
//  to get the notifications. This URL allows us to also get notifications
// over longer timelines rather than the default 10 min.. i.e between 1-100minutes
// which you can specify by adding the parameter: ?interval={int}
const getPostNotificationDataService = async({fetch, cookies})=>{
    let notification_url = `${VITE_API_BASE_URL_NOTIFICATIONS}`;
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
    const response = await fetch(`${notification_url}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `ApiKey ${auth}`
        }
    });
    console.log("Token in : ", auth);
    if (!response.ok) {
        let data = await response.json();
        console.log("Error: ", data.error, "URL: ", notification_url);
        return {
            success: false,
            status: response.status,
            error: data
        }
    }
    return {
        success: true,
        status: response.status,
        data: await response.json()
    };
}

export {
    getPostNotificationDataService
}