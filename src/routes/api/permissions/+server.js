import { json } from '@sveltejs/kit';
import {redirect} from '@sveltejs/kit';
import {checkAuthentication} from '$lib/utilities/auth.js';
import {VITE_API_BASE_URL_ADMIN_PERMISSIONS} from '$env/static/private'

// Deletes permission for a specific permission code
export const DELETE = async({url, cookies})=>{
    let permission_id = url.searchParams.get('id');
    let auth = checkAuthentication(cookies).user;
	if (!auth) {
		return redirect (303, `/login?redirectTo=/admin/permissions`);
	}
    if(!permission_id){
        return json({error: "Invalid Permission ID"}, {status: 400});
    }

    let permission_url = `${VITE_API_BASE_URL_ADMIN_PERMISSIONS}/${permission_id}`;
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
            return json({error: errorData.error}, {status: response.status});
        }
    }catch(err){
        console.log("End Point Error: ", err);
    }
}

export const PUT = async({url, request, cookies})=>{
    let permission_id = url.searchParams.get('id');
    let auth = checkAuthentication(cookies).user;
    if (!auth) {
        return redirect (303, `/login?redirectTo=/admin/permissions`);
    }
    if(!permission_id){
        return json({error: "Invalid Permission ID"}, {status: 400});
    }
    let {permission} = await request.json();
    let permission_url = `${VITE_API_BASE_URL_ADMIN_PERMISSIONS}/${permission_id}`;
    try{
        let response = await fetch(permission_url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `ApiKey ${auth}`
            },
            body: JSON.stringify({permission})
        });
        if (response.ok){
            let data = await response.json();
            return json(data);
        }else{
            let errorData = await response.json();
            return json({error: errorData.error}, {status: response.status});
        }
    }catch(err){
        console.log("End Point Error: ", err);
    }
}