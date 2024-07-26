import {deleteAuthentication} from '$lib/utilities/auth.js';
import {redirect,error} from '@sveltejs/kit';

export const actions = {
    default: ({cookies}) =>{
        if(deleteAuthentication(cookies)){
            console.log("logging out...")
            redirect(303, '/feeds');
        }else{
            error(400,{
                description: "an error occurred while processing your request",
                error: "could not log user out",
            });
        }
    }
}
