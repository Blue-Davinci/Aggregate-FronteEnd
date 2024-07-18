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


export{
    getCommentsForPost,
    savePostComment
}