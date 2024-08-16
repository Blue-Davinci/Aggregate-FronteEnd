import { checkAuthentication } from '$lib/utilities/auth.js';
import {isValidPermissionFormat} from '$lib/utilities/utils.js';
import {VITE_API_BASE_URL_ADMIN_PERMISSIONS, VITE_API_BASE_URL_ADMIN_PERMISSIONS_USERS} from '$env/static/private';
import { redirect, error } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';

export const load = async({fetch, cookies})=>{
    const auth = checkAuthentication(cookies).user;
    if (!auth) {
        return redirect(303, `/login?redirectTo=/admin/users`);
    }
    const permissions_url = `${VITE_API_BASE_URL_ADMIN_PERMISSIONS}`;
    const superUsers = await getSuperUsers({fetch, cookies});
    try{
        let response = await fetch(permissions_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `ApiKey ${auth}`
            }
        });
        if (response.ok) {
            let data = await response.json();
            data.superUsers = superUsers;
            console.log('Data: ', data);
            return data;
        } else {
            let errorData = await response.json();
            return {
                error: errorData.error,
                status: response.status
            };
        }
    }catch(err){
        console.log('Error: ', err);
        error(500, {
            title: 'Error Loading Permissions',
            message: `Something happened and we could not load any permissions.`,
            info: "It's not you, it's us. Please try again later."
        });
    }
}

const getSuperUsers = async({fetch, cookies})=>{
    const auth = checkAuthentication(cookies).user;
    const permissions_users_url = `${VITE_API_BASE_URL_ADMIN_PERMISSIONS_USERS}`;
    try{
        let response = await fetch(permissions_users_url, {
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
    }catch(err){
        console.log('Error: ', err);
        error(500, {
            title: 'Error Loading Permissions Users',
            message: `Something happened and we could not load any permissions users.`,
            info: "It's not you, it's us. Please try again later."
        });
    }
}

export const actions = {
    add_permission: async({request, fetch, cookies})=>{
        const auth = checkAuthentication(cookies).user;
        if (!auth){
            return redirect(303, `/login?redirectTo=/admin/permissions`);
        }
        let permissionData = await request.formData();
        let permission = permissionData.get('permission');
        let permission_url = `${VITE_API_BASE_URL_ADMIN_PERMISSIONS}`;
        // validate permissions
        if (!isValidPermissionFormat(permission)){
            return fail(400, {
                error: {
                    permission: ['Invalid permission format.']
                }
            });
        }
        try{
            let response = await fetch(permission_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `ApiKey ${auth}`
                },
                body: JSON.stringify({permission})
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
        }catch(err){
            console.log('Error: ', err);
            error(500, {
                title: 'Error Adding Permission',
                message: `Something happened and we could not add the permission.`,
                info: "It's not you, it's us. Please try again later."
            });
        }
    },
}