import {getFollowedPostsDataService} from '$lib/dataservice/getFollowedPostsDataService.js';
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

// We recieve feedback as an object from the getFollowedPostsDataService
// If the response is an error and that error is an auth error we redirect
// to /login with a redirectTo query parameter back to this page, otherwise we 
// panic and show an error message.
export const load = async({fetch, cookies}) =>{
    const response = await getFollowedPostsDataService({fetch, cookies});
    switch (response){
        case !response.success && response.status === 401:
            return redirect(303, `/login?redirectTo=/dashboard`);
        case !response.success:
            console.log("Error: ", response.error);
            error(response.status, {
                title: "Error Loading Posts",
                message: `Something happened and we could not load any posts.`,
                info: "It's not you, it's us. Please try again later."
            });
    }
    return response.data;
}