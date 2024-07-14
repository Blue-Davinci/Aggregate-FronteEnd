// get our API KEY from getcookie function() and pass it to the fetch request
//  to get the followed posts
// This function will also be used to run periodic fetches from the Front end.
const getFollowedPostsDataService = async({fetch})=>{
    let post_url = "/api/posts";
    // get our api-key
    const response = await fetch(`${post_url}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        let data = await response.json();
        console.log("Error: ", data.error, "URL: ", post_url);
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