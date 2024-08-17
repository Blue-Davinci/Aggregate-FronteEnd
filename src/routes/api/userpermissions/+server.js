import { json } from '@sveltejs/kit';
import {redirect} from '@sveltejs/kit';
import {checkAuthentication} from '$lib/utilities/auth.js';
import {VITE_API_BASE_URL_ADMIN_PERMISSIONS_USERS} from '$env/static/private'; 

// and endpoint to Add permissions for the user
export const POST = async({cookies, request}) => {
    let permission_url = `${VITE_API_BASE_URL_ADMIN_PERMISSIONS_USERS}`;
    let {user_id, permissions} = await request.json();
    let auth = checkAuthentication(cookies).user;
    if (!auth) {
        return redirect('/login?redirect=/admin/users');
    }
    try{
        //console.log("Adding permissions for: ", user_id, " || Permissions: ", permissions)
        let response = await fetch(permission_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 Authorization: `ApiKey ${auth}`
            },
            body: JSON.stringify({user_id, permissions})
        });
        if (response.ok){
            let data = await response.json();
            return json(data);
        }else{
            let errorData = await response.json();
            console.log("Error: ", errorData.error);
            return json({error: errorData.error}, {status: response.status});
        }
    }catch(err){
        console.log("End Point Error: ", err);
    }
}

// http://localhost:4000/v1/admin/permissions/users/admin:write/14
export const DELETE = async({cookies, url}) => {
    let user_id = url.searchParams.get('user_id');
    let permission_code = url.searchParams.get('permission_code');
    let auth = checkAuthentication(cookies).user;
    if (!auth) {
        return redirect('/login?redirect=/admin/users');
    }
    let permission_url = `${VITE_API_BASE_URL_ADMIN_PERMISSIONS_USERS}/${permission_code}/${user_id}`;
    console.log("Deleting Permission: ", permission_url);
    try{
        let response = await fetch(permission_url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                 Authorization: `ApiKey ${auth}`
            }
        });
        if (response.ok){
            let data = await response.json();
            return json(data);
        }else{
            let errorData = await response.json();
            console.log("Error: ", errorData.error);
            return json({error: errorData.error}, {status: response.status});
        }
    }catch(err){
        console.log("End Point Error: ", err);
    }
}