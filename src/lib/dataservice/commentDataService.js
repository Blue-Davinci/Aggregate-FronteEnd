// getCommentsForPost() takes a custom fetch and the postID, and we
// use it to get all comments for a post, passing the postID to the
// endpoint as a parameter.
const getCommentsForPost = async ({fetch: customFetch} = {}, postID) => {
    // if the postID is empty  then we have an issue
    //console.log("-- Post ID: ", postID);
    if (!postID) {
        return {
            success: false,
            status: 400,
            error: "postID is required"
        }
    }	
    let url = `/api/comments?postID=${postID}`;
    let fetchFunc = customFetch || fetch;
    const response = await fetchFunc(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        let data = await response.json();
        return {
            success: false,
            status: response.status,
            error: data
        }
    }
    return {
        success: true,
        status: response.status,
        data: await response.json(),
    };
}
// savePostComment() takes a post comment and sends this data to our 
const savePostComment = async (comment={}) => {
    //console.log("Comment in data service: ", comment);
    if (!comment.post_id || !comment.parent_comment_id || !comment.comment_text) {
        return {
            success: false,
            status: 400,
            error: "valid data is required"
        }
    }
    // if everything is ok then
    let url = `/api/comments`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment)
    });
    if (!response.ok) {
        let data = await response.json();
        return {
            success: false,
            status: response.status,
            error: data.error
        }
    }
    return {
        success: true,
        status: response.status,
        data: await response.json(),
    };
}

const clearCommentNotificationDataService = async(notificationPostID)=>{
    if (!notificationPostID){
        return {
            success: false,
            status: 400,
            error: {message: "Invalid Comment ID"}
        }
    }
    let url = `/api/notifications?id=${notificationPostID}`;
    try {
        let response = await fetch(url, {
            method: 'DELETE',
        });
        if (response.ok) {
            let data = await response.json();
            return data
        } else {
            let errorData = await response.json();
            return errorData.error
        }
    } catch (err) {
        console.log('Error: ', err);
        return {
            success: false,
            status: 500,
            error: {message: "Internal Server Error"}
        }
    }

}
const updatePostComment = async(updatedComment) => {
    //console.log("Editing the comment: ....: ", updatedComment);
    if (!updatedComment.id || !updatedComment.version || !updatedComment.comment_text){
        return {
            success: false,
            status: 400,
            error: {message: "Invalid Comment Data"}
        }
    }
    let url = `/api/comments`;
    try{
        let response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedComment)
        });
        if (response.ok){
            let data = await response.json();
            return data
        }else{
            let errorData = await response.json();
            console.log("Update comment DS Error Data: ", errorData);
            return errorData.error
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

const deletePostComment = async(commentID) => {
    console.log("Deleting the comment: ....: ", commentID);
    if (!commentID){
        return {
            success: false,
            status: 400,
            error: {message: "Invalid Comment ID"}
        }
    }
    let url = `/api/comments?id=${commentID}`;
    try {
        let response = await fetch(url, {
            method: 'DELETE',
        });
        if (response.ok) {
            let data = await response.json();
            return data
        } else {
            let errorData = await response.json();
            return errorData.error
        }
    } catch (err) {
        console.log('Error: ', err);
        return {
            success: false,
            status: 500,
            error: {message: "Internal Server Error"}
        }
    }

}
export{
    getCommentsForPost,
    savePostComment,
    updatePostComment,
    clearCommentNotificationDataService,
    deletePostComment
}