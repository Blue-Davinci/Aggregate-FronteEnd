import {redirect} from '@sveltejs/kit';
import {checkAuthentication} from '$lib/utilities/auth.js';

export function load({cookies, url}){
    if(!checkAuthentication(cookies)){
        redirect(303, `/login?redirectTo=${url.pathname}`)
    }
}