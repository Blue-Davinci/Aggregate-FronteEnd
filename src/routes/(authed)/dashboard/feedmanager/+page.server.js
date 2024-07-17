import { VITE_API_BASE_URL_FEEDS_CREATED } from '$env/static/private';
import { checkAuthentication } from '$lib/utilities/auth.js';
import {getAllFeedsCreatedByUser} from '$lib/dataservice/feedManagerDataService.js';
import {processUpdateData, getChangedFields} from '$lib/utilities/utils.js';
import { fail, redirect} from '@sveltejs/kit';
import { feedSchema } from '$lib/utilities/auth.js';

export const load = async ({ fetch, cookies }) => {
    const response = await getAllFeedsCreatedByUser({ fetch, cookies });
    return response.data;
}


export const actions = {
	updatefeed: async ({ request, cookies}) => {
        let auth = checkAuthentication(cookies).user;
		if (!auth) {
			return redirect(303, `/login?redirectTo=/dashboard/feedmanager`);
		}
        const newFeed = Object.fromEntries(await request.formData());
        newFeed.is_hidden = newFeed.is_hidden === 'true';
        // first lets validate the data before we move on
        try {
			const result = feedSchema.parse(newFeed);
			console.log(result);
		} catch (err) {
			const fieldErrors = err.flatten();
			return fail(400, {
				description: 'an error occurred while processing your request',
				error: fieldErrors.fieldErrors
			});
		}
        // if everything is okay, lets get the new & old data
        let processedData = processUpdateData(newFeed);
        //console.log("Processed Data: ", processedData);
        // now let's get the changes, if any, on the 2 items
        let changes = getChangedFields(processedData.originalData, processedData.updatedData);
        //if no changes then we complain
        if (Object.keys(changes).length === 0) {
            return fail(400, {
                description: 'an error occurred while processing your request',
                error: {
                    fieldErrors: {
                        name: ['No changes were detected in the data provided.']
                    }
                }
            });
        }
        // check if the id's are similar, if not then there's an issue somewhere
        if(processedData.originalData.id !== processedData.updatedData.id){
            return fail(400, {
                description: 'an error occurred while processing your request',
                error: {
                    fieldErrors: {
                        name: ['The data provided does not match the expected values.']
                    }
                }
            });
        }
        // get the id of the feed
        const feedID = processedData.originalData.id;
        // get the update data from our form
        const url = `${VITE_API_BASE_URL_FEEDS_CREATED}/${feedID}`;
        try{
            let response = await fetch(url,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `ApiKey ${auth}`
                },
                body: JSON.stringify(changes)
            })
            if(response.ok){
                let data = await response.json();
                return data;
            }else{
                let errorData = await response.json();
                return {
                    error: errorData.error,
                    status: response.status
                };
            }
        }catch(err){
            console.log(err);
            return {
                status: 500,
                error: "An error occurred while processing your request"
            }
        }   
    }
}