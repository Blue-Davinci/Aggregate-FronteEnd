//this route should do the following:
//  1. get the url from the browser
//  2. we'll be getting it with a parameter called token from the backend
//      The url will look like this: http://localhost:4000/verify?token=xxxxxxxx (probably add it to the backend as a flag when launching)
//  3. we send the data + token to the backend
//  4. get the data, diplay a success message and redirect to the login page
import {error} from '@sveltejs/kit';
import {tokenSchema} from '$lib/utilities/auth.js';
import  {VITE_API_BASE_URL_ACTIVATION} from '$env/static/private'

export const load =  async({url, fetch}) => {
    console.log("In Load");
    const activation_url = VITE_API_BASE_URL_ACTIVATION;
    console.log("Url: ", activation_url);
    const token = url.searchParams.get('token');
    if (token === null || token === '') {
        error (400,{
            title: "Verification Failed",
            message: "Token authentication failed",
            info: "Please recheck your token and try again"
        });
        
    }
    try{
        const result = tokenSchema.parse(token);
        console.log("Token Zod:",result);
    }catch(err){
         const fieldErrors = err.flatten();
         console.log(fieldErrors);
         error (400,{
            title: "Verification Failed",
            message: fieldErrors.formErrors,
            info: "Please recheck your token and try again"
        });
    }
    //console.log(">>>Token: ", token);
    let res = await fetch(`${activation_url}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
    });
    if (res.ok){
        let data = await res.json();
        let {user} = data;
        console.log("Verification success: ", data);
        return {user};
    }else{
        let data = await res.json();
        console.log("Back from API, we got an error: ", data);
        error (400,{
            title: "Verification Failed",
            message: data.error.token,
            info: "Please recheck your token and try again"
        });
    }

}