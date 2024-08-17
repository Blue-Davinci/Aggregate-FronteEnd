
const addAdministrationUserPermission = async (user_id, permissions) => {
    // perform quick checks on the user_id and permissions
    if (!user_id || !permissions) {
        //console.log("Invalid User ID or Permissions");
        return {
            success: false,
            status: 400,
            error: "Invalid User ID or Permissions"
        };
    }
    if (permissions.length === 0){
        //console.log("No permissions provided");
        return {
            success: false,
            status: 400,
            error: "No permissions provided"
        };
    }
    let permission_url = `/api/userpermissions`;
    //console.log("Adding permissions for: ", user_id, " || Permissions: ", permissions)
    try{
        let response = await fetch(permission_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user_id, permissions})
        });
        if (response.ok){
            return {
                success: true,
                status: response.status,
                data: await response.json(),
            };
        }else{
            let errorData = await response.json();
            return {
                success: false,
                status: response.status,
                error: errorData.error
            }
        }
    }catch(err){
        return {
            success: false,
            status: 500,
            error: {message: err.message}
        }
    }
}

const updateAdministrationPermission = async(permission_id, permission)=>{
    if (!permission_id || !permission){
        return {
            success: false,
            status: 400,
            error: "Invalid Permission Details"
        };
    }
    let permission_url = `/api/permissions?id=${permission_id}`;
    try{
        let response = await fetch(permission_url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({permission})
        });

        if (response.ok){
            return {
                success: true,
                status: response.status,
                data: await response.json(),
            };
        }else{
            let errorData = await response.json();
            return {
                success: false,
                status: response.status,
                error: errorData.error
            }
        }

    }catch(err){
        return {
            success: false,
            status: 500,
            error: {message: err.message}
        }
    }
}

const deleteAdministrationUserPermission = async (user_id, permission_code) => {
    if(!user_id || !permission_code){
        return {
            success: false,
            status: 400,
            error: "Invalid User ID or Permission ID"
        };
    }
    let permission_url = `/api/userpermissions?user_id=${user_id}&permission_code=${permission_code}`;
    console.log("Deleting Permission: ", permission_url);
    try{
        let response = await fetch(permission_url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok){
            return {
                success: true,
                status: response.status,
                data: await response.json(),
            };
        }else{
            let errorData = await response.json();
            return {
                success: false,
                status: response.status,
                error: errorData.error
            }
        }
    }catch(err){
                return {
            success: false,
            status: 500,
            error: {message: err.message}
        }
    }
}
const deleteAdministrationPermission = async (permission_id) => {
    if(!permission_id){
        return {
            success: false,
            status: 400,
            error: "Invalid Permission ID"
        };
    }
    let permission_url = `/api/permissions?id=${permission_id}`;
    try{
        let response = await fetch(permission_url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok){
            return {
                success: true,
                status: response.status,
                data: await response.json(),
            };
        }else{
            let errorData = await response.json();
            return {
                success: false,
                status: response.status,
                error: errorData.error
            }
        }
    }catch(err){
                return {
            success: false,
            status: 500,
            error: {message: err.message}
        }
    }
}

export {
    addAdministrationUserPermission,
    deleteAdministrationPermission,
    updateAdministrationPermission,
    deleteAdministrationUserPermission
}