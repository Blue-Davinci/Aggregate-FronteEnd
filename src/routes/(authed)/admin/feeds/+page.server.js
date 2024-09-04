import { adminGetAllFeedsWithParams } from '$lib/dataservice/admin/adminFeedsDataService.js';
import {checkAuthentication} from '$lib/utilities/auth.js';
import { fail, redirect} from '@sveltejs/kit';

export const load = async ({ fetch, cookies, url }) => {
    const auth = checkAuthentication(cookies).user;
    if (!auth) {
        return redirect(303, `/login?redirectTo=/admin/feeds`);
    }
    // check for a searchOption parameter
    let searchOption = url.searchParams.get('searchOption') ?? '';
    // let response = await adminGetAllFeedsWithParams({}, page, pageSize, searchQuery, feedType, priority);
    const response = await adminGetAllFeedsWithParams({ fetch }, 0, 0, searchOption, '', '');
    if (response.error) {
        console.log("----- Error: ", response.error);
        fail(response.status, {
            title: 'Error loading Feeds',
            message: `Something happened and we Could not load any Feeds.`,
            info: response.error
        });
    } else {
        //console.log(">>> Response: ", response);
        return response.data;
    }
}