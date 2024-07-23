import {VITE_API_BASE_URL_SIGNUP} from '$env/static/private';
// This will handle updates for the user accounts.
// We will use one method to serve both updates for the user's name or the avatar.
async function updateUserInformation(fetchFunc, userData = {}, auth) {
    console.log("UserData recieved: ", userData);
    // Check if the user data is empty
    if (!userData) {
        return {
            status: 400,
            message: 'User information is empty.'
        };
    }
    // if it's okay then we send it to our account endpoint
    try{
        let url = `${VITE_API_BASE_URL_SIGNUP}`;
        const response = await fetchFunc(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `ApiKey ${auth}`
            },
            body: JSON.stringify(userData)
        });
        if (response.ok){
            const data = await response.json();
            return data;
        }else{
            const errorData = await response.json();
            return errorData;
        }
        
    }catch(err){
        console.log("Error sending user updating data: ", err);
    }
}

export { updateUserInformation };
