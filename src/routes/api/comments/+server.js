import { json } from '@sveltejs/kit';
import {commentSchema} from '$lib/utilities/auth.js';
import {VITE_API_BASE_URL_FEED_FOLLOW_POSTS_COMMENTS} from '$env/static/private';
import { redirect, fail } from '@sveltejs/kit';
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
        return fail(400, {
            description: 'an error occurred while processing your request',
            error: fieldErrors
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
    }
}