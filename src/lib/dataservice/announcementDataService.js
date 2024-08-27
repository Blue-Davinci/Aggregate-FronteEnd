
// getAnnouncementsForUser() is a function that fetches announcements from the server
// and returns the data to the caller.
const getAnnouncementsForUser = async() =>{
    let announcement_url = `/api/announcements`;
    try{
        let response = await fetch(announcement_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        //console.log("Response Status: ", response.status);
        if(response.ok){
            let data = await response.json();
            return {
                success: true,
                status: response.status,
                data: data
            }
        }else{
            let errorData = await response.json();
            console.error("Error Response Data: ", errorData);
            return {
                success: false,
                status: response.status,
                error: errorData.error
            }
        }
    }catch(err){
        console.log("Error: ", err);
        return {
            success: false,
            status: 500,
            error: {message: "Internal Server Error"}
        }
    }
}

// markAnnouncementAsRead() is a function that marks an announcement as read
// by sending a POST request to the server.
const markAnnouncementAsRead = async(announcement_id) =>{
    if(!announcement_id){
        return {
            success: false,
            status: 400,
            error: {message: "Invalid Announcement ID"}
        }
    }
    let mark_announcement_url = `/api/announcements`;
    try{
        let response = await fetch(mark_announcement_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({announcement_id})
        });
        //console.log("Response Status: ", response.status);
        if(response.ok){
            let data = await response.json();
            return {
                success: true,
                status: response.status,
                data: data
            }
        }else{
            let errorData = await response.json();
            console.error("Error Response Data: ", errorData);
            return {
                success: false,
                status: response.status,
                error: errorData.error
            }
        }
    }catch(err){
        console.log("Error: ", err);
        return {
            success: false,
            status: 500,
            error: {message: "Internal Server Error"}
        }
    }
}

// adminDeleteAnnouncement is an admin function responsible for deleting an
// existing announcement by setting the ID as a param in the URL
const adminDeleteAnnouncement = async(announcement_id) =>{
    if(!announcement_id){
        return {
            success: false,
            status: 400,
            error: {message: "Invalid Announcement ID"}
        }
    }
    let delete_announcement_url = `/api/announcements?id=${announcement_id}`;
    try{
        let response = await fetch(delete_announcement_url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        //console.log("Response Status: ", response.status);
        if(response.ok){
            let data = await response.json();
            return {
                success: true,
                status: response.status,
                data: data
            }
        }else{
            let errorData = await response.json();
            console.error("Error Response Data: ", errorData);
            return {
                success: false,
                status: response.status,
                error: errorData.error
            }
        }
    }catch(err){
        console.log("Error: ", err);
        return {
            success: false,
            status: 500,
            error: {message: "Internal Server Error"}
        }
    }
}

export {
    getAnnouncementsForUser,
    markAnnouncementAsRead,
    adminDeleteAnnouncement
}