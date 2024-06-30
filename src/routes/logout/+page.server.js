import {deleteAuthentication} from '$lib/utilities/auth.js';
import {redirect, fail} from '@sveltejs/kit';

export const actions = {
    default: ({cookies}) =>{
        if(deleteAuthentication(cookies)){
            return redirect(303, '/');
        }else{
            return fail(400,{
                description: "an error occurred while processing your request",
                error: "could not log user out",
            });
        }
    }
}