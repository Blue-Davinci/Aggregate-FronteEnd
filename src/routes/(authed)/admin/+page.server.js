import { checkAuthentication } from '$lib/utilities/auth.js';
import {VITE_API_BASE_URL_ADMIN_STATISTICS, VITE_API_BASE_URL_DEBUG_VARS} from '$env/static/private';
import { redirect, error } from '@sveltejs/kit';

// Load function to fetch data from the API
export const load = async ({fetch, cookies}) =>{
    const auth = checkAuthentication(cookies).user;
    if (!auth) {
        return redirect(303, `/login?redirectTo=/dashboard/transactionhistory`);
    }
    const statistsics_url = `${VITE_API_BASE_URL_ADMIN_STATISTICS}`;
    const debugVars = await getDebugVars({fetch, cookies});
    try{
        let response = await fetch(statistsics_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `ApiKey ${auth}`
            }
        });
        if (response.ok) {
            let data = await response.json();
            data.debugVars = debugVars
            return data;
        } else {
            let errorData = await response.json();
            return {
                error: errorData.error,
                status: response.status
            };
        }
    } catch(err){
        console.log('Error: ', err);
        error(500, {
            title: 'Error Loading Statistics',
            message: `Something happened and we could not load any statistics.`,
            info: "It's not you, it's us. Please try again later."
        });
    }
}

const getDebugVars = async ({fetch, cookies}) =>{
    const auth = checkAuthentication(cookies).user;
    const debug_vars_url = `${VITE_API_BASE_URL_DEBUG_VARS}`;
    try{
        let response = await fetch(debug_vars_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `ApiKey ${auth}`
            }
        });
        if (response.ok) {
            let data = await response.json();
            return data;
        } else {
            let errorData = await response.json();
            return {
                error: errorData.error,
                status: response.status
            };
        }
    } catch(err){
        console.log('Error: ', err);
        error(500, {
            title: 'Error Loading Debug Variables',
            message: `Something happened and we could not load any debug variables.`,
            info: "It's not you, it's us. Please try again later."
        });
    }
}