import { json } from '@sveltejs/kit';
import {commentSchema, updateCommentSchema} from '$lib/utilities/auth.js';
import {VITE_API_BASE_URL_FEED_FOLLOW_POSTS_COMMENTS} from '$env/static/private';
import { redirect} from '@sveltejs/kit';
import { checkAuthentication } from '$lib/utilities/auth.js';


export const GET = async ({ cookies, url }) => {
    let postID = url.searchParams.get('postID');
    // If there's no postID, we have an issue
    if (!postID){
        return redirect (303,`/dashboard` );
    }
    let auth = checkAuthentication(cookies).user;
    if (!auth){
        return redirect (303, `/login?redirectTo=/dashboard/${postID}`);
    }
    let comments_url = `${VITE_API_BASE_URL_FEED_FOLLOW_POSTS_COMMENTS}/${postID}`;
    console.log("Comments Url:- ", comments_url);
    try{
        let response = await fetch(comments_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `ApiKey ${auth}`
            }
        })
        if (response.ok){
            let data = await response.json();
            return json(data);
        }else{
            let errorData = await response.json();
            return json({error: errorData.error}, {status: response.status});
        }
    }catch(err){
        console.log("End Point Error: ", err);
        return json({ error: 'An unexpected error occurred' }, { status: 500 });
    }

}

export const POST = async ({ cookies, request}) => {
    let auth = checkAuthentication(cookies).user;
    if (!auth){
        return redirect (303, `/login?redirectTo=/dashboard`);
    }
    // get our data
    let commentData = await request.json();
    // perform validation just incase
    try {
       commentSchema.parse(commentData);
    } catch (err) {
        const fieldErrors = err.flatten();
        return json({
            status: 400,
            body: {
                description: 'An error occurred while processing your request',
                error: fieldErrors
            }
        });
    }
    // now we ready the data for the endpoint, this is because our comment data
    // goes through a lot of trauma before it gets here.
    let finalCommentData = {
        post_id: commentData.post_id,
        parent_comment_id: commentData.parent_comment_id,
        comment_text: commentData.comment_text
    }
    console.log("Final Comment Data: ", finalCommentData);
    // we are good now we can send the data to the endpoint
    let comments_url = `${VITE_API_BASE_URL_FEED_FOLLOW_POSTS_COMMENTS}`;   
    try{
        let response = await fetch(comments_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `ApiKey ${auth}`
            },
            body: JSON.stringify(finalCommentData)
        });
        if (response.ok){
            let data = await response.json();
            return json(data);
        } else{
            let errorData = await response.json();
            return json({error: errorData.error}, {status: response.status});
        }
    }catch(err){
        console.log("End Point Error: ", err);
        return json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}

export const PATCH = async ({ cookies, request}) => {
    let auth = checkAuthentication(cookies).user;
    if (!auth){
        return redirect (303, `/login?redirectTo=/dashboard`);
    }
    // get our data
    let commentData = await request.json();
    //console.log(">>> SERVER Update Comment Data: ", commentData);
    // perform validation just incase
    try {
       updateCommentSchema.parse(commentData);
    } catch (err) {
        const fieldErrors = err.flatten();
        console.log(">>> SERVER Update Comment Error Data: ", fieldErrors);
        return json({
            status: 400,
            error: fieldErrors // Assuming fieldErrors is structured in a way that's meaningful to the client
        });
    }
    // send the data for an update
    let comments_url = `${VITE_API_BASE_URL_FEED_FOLLOW_POSTS_COMMENTS}`; 
    try{
        let response = await fetch(comments_url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `ApiKey ${auth}`
            },
            body: JSON.stringify(commentData)
        });
        if (response.ok){
            let data = await response.json();
            return json(data);
        } else{
            let errorData = await response.json();
            return json({error: errorData.error}, {status: response.status});
        }
    }catch(err){
        console.log("End Point Error: ", err);
        return json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}

// TODO CHANGE THIS FROM JSON BODY TO URL PARAMS
export const DELETE = async ({ cookies, url }) => {
    let comment_id = url.searchParams.get('id');
    let auth = checkAuthentication(cookies).user;
	if (!auth) {
		return redirect (303, `/login?redirectTo=/dashboard`);
	}
    // minor check for the ID
    if (!comment_id){
        return json({ error: 'Invalid Comment data' }, { status: 400 });
    }

        // send the data for an update
        let comments_url = `${VITE_API_BASE_URL_FEED_FOLLOW_POSTS_COMMENTS}/${comment_id}`;
        try{
            let response = await fetch(comments_url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `ApiKey ${auth}`
                },
                body: JSON.stringify({comment_id: comment_id})  
            });
            if (response.ok){
                let data = await response.json();
                return json(data);
            } else{
                let errorData = await response.json();
                return json({error: errorData.error}, {status: response.status});
            }
        }catch(err){
            console.log("End Point Error: ", err);
            return json({ error: 'An unexpected error occurred' }, { status: 500 });
        }
}