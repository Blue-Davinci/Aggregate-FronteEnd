//import {fail, redirect} from '@sveltejs/kit';
export const actions ={
    //fetch, request, url, cookies
    default: async()=>{
        // retrieve our login url
        console.log("Got default request....")
        return {
            status: 200,
            body: {
                message: "Placeholder"
            }
        }
}}