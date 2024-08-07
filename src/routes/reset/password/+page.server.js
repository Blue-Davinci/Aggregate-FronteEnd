import {tokenSchema} from '$lib/utilities/auth.js';
import {passwordSchema} from '$lib/utilities/auth.js';
import {VITE_API_BASE_URL_UPDATE_PASSWORD} from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';

// This function is called when the user clicks on the link in the email. It extracts the token from the url
// we do not send this to the backend but rather export it as a prop to be used during
// the update password action.
export const load = async ({url}) => {
    const token = url.searchParams.get('token');
    console.log(">>> The token is: ", token);
    try{
        const result = tokenSchema.parse(token);
        console.log("Recieved Token:",result);
        return {token: token};
    }catch(err){
         const fieldErrors = err.flatten();
         console.log(fieldErrors);
         // if the validation for our token fails, then we will return an error to
         // be picked up by the frontend and redirect user back to the login with 
         // a toast notification.
         return {
            status: 400,
            error: {
                description: 'An error occurred while processing your request',
                details: fieldErrors
            }
        };
    }
    
}

// This function gets the passwords, confirmations and  token from the form and sends it to the backend
// for processing. If the passwords do not match, we return an error to the user. If the token is invalid
// we return an error to the user. If the request is successful, we redirect the user to the login page.
export const actions = {
    updatepassword: async ({request}) =>{
        console.log("Checking password");
        let updatepassword_url = VITE_API_BASE_URL_UPDATE_PASSWORD;
        let passwordUpdateData = await request.formData();
        let password = passwordUpdateData.get('password');
        let confirmPassword = passwordUpdateData.get('confirmpassword');
        let token = passwordUpdateData.get('token');
        console.log("Url : ", updatepassword_url);	
        if (confirmPassword !== password) {
            // we return a matching error body
            return fail(400, {
                description: 'an error occurred while processing your request',
                error: {
                    password: ['Password and Confirm Password must match'],
                    confirmpassword: ['Password and Confirm Password must match']
                }
            })
        }
        try{
            const result = passwordSchema.parse(Object.fromEntries(passwordUpdateData));
            console.log("Recieved Token:",result);
        }catch(err){
             const fieldErrors = err.flatten();
             console.log("Field Errors: ",fieldErrors.fieldErrors);
             // if the validation for our token fails, then we will return an error to
             // be picked up by the frontend and redirect user back to the login with 
             // a toast notification.
             return fail(400, {
                description: 'An error occurred while processing your request',
                error: fieldErrors.fieldErrors,
            }
            )
        }
        let response = await fetch(updatepassword_url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token, password })
        });

        if(response.ok){
            // return a redirect for a user to be redirected to the login page
            const urlpath = "/login";
            return redirect(303, urlpath);
        }else{
            let data = await response.json();
            return fail(response.status, {
                description: 'an error occurred while processing your request',
                error: data.error
            });
        }
    }
}