
const addAdministrationPermission = async (user_id, permissions) => {
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
    let permission_url = `/api/permissions`;
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
        console.log("End Point Error: ", err);
    }
}

export {
    addAdministrationPermission
}