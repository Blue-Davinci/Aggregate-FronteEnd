import {VITE_API_BASE_URL_FEEDS} from '$env/static/private';
import {checkAuthentication} from '$lib/utilities/auth.js';
import {getFollowedPostsDataService} from '$lib/dataservice/getFollowedPostsDataService.js';
import  {feedSchema} from '$lib/utilities/auth.js';
import { fail,redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

// We recieve feedback as an object from the getFollowedPostsDataService
// If the response is an error and that error is an auth error we redirect
// to /login with a redirectTo query parameter back to this page, otherwise we 
// panic and show an error message.
export const load = async ({ fetch, cookies }) => {
    const response = await getFollowedPostsDataService({ fetch, cookies });

    if (!response.success && response.status === 401) {
        return redirect(303, `/login?redirectTo=/dashboard`);
    }

    if (!response.success) {
        console.log("Error: ", response.error);
         error(response.status, {
            title: "Error Loading Posts",
            message: `Something happened and we could not load any posts.`,
            info: "It's not you, it's us. Please try again later."
        });
    }

    return response.data;
};
export const actions ={
    addfeed: async({request, fetch, cookies})=>{
        // check authentication
        let auth = checkAuthentication(cookies).user;
        if (!auth){
            return redirect(303, `/login?redirectTo=/dashboard`);
        }
        // get the form Data
        const addfeed_url = `${VITE_API_BASE_URL_FEEDS}`;
        let newFeed = await request.formData();
        // recieved data, now lets validate it
        try{
            const result = feedSchema.parse(Object.fromEntries(newFeed));
			console.log(result);
        }catch(err){
            const fieldErrors = err.flatten();
            return fail (400,{
				description: "an error occurred while processing your request",
				error: fieldErrors.fieldErrors,
			});
        }
        //console.log("Data we recieved: ", newFeed);
        // validation complete, now we can save the data
        let response = await fetch(`${addfeed_url}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `ApiKey ${auth}`
            },
            body: JSON.stringify(Object.fromEntries(newFeed))
        })
        if (response.ok){
            let data = await response.json();
            return data;
        }else{
            let data = await response.json();
            return {
                error: data.error,
                status: response.status
            }
        }
    }
}