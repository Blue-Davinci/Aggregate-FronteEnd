<script>
    import { onMount } from 'svelte';
    import {setToast} from '$lib/utilities/utils'
    import {savePostComment} from '$lib/dataservice/commentDataService.js';
    import CommentInput from '$lib/components/layouts/comments/commentinput.svelte';
    import CommentItem from '$lib/components/layouts/comments/commentitem.svelte';
    import { invalidateAll } from '$app/navigation';

    export let comments = [];
    export let postID = "";
    let organizedComments = [];

    onMount(() => {
        organizedComments = organizeComments(comments);
    });

    const organizeComments = (comments) => {
        const map = {};

        // Sort comments by created_at in descending order
        comments.sort((a, b) => new Date(b.comment.created_at) - new Date(a.comment.created_at));

        // Organize comments by id and prepare for nesting
        comments.forEach(({ comment, user_name }) => {
            map[comment.id] = { ...comment, user_name, replies: [] };
        });

        const result = [];

        // Build the nested structure
        comments.forEach(({ comment }) => {
            if (comment.parent_comment_id === '00000000-0000-0000-0000-000000000000') {
                result.push(map[comment.id]);
            } else {
                const parent = map[comment.parent_comment_id];
                if (parent) {
                    parent.replies.push(map[comment.id]);
                }
            }
        });

        return result;
    };

    const saveNewPostComment = async (newComment) => {
        let response = await savePostComment(newComment);
        return response;
    }

    const handleAddComment = async (event) => {
        const newComment = event.detail;
        ///console.log("Our cNew Comment: ", newComment);
        // Ensure newComment has the correct structure
        if (!newComment.created_at) {
            newComment.created_at = new Date().toISOString();
        }
        //before we update anything, we save this comment
        let response = await saveNewPostComment(newComment)
        if (response.error){
            setToast(false, response.error, 3000);
            return;
        }else{
            console.log("Response Data: ", response.data.comment);
            setToast(true, "Your comment has been saved", 2000);
        }
        let responseComment = response.data.comment;
        // make a similar structure comment
        const structuredComment = {
            comment: {
                id: responseComment.id, // Generate an id if not present
                post_id: responseComment.post_id,
                user_id: responseComment.user_id || '1', // Replace with actual user id
                parent_comment_id: responseComment.parent_comment_id,
                comment_text: responseComment.comment_text,
                created_at: responseComment.created_at
            },
            user_name: 'You' // Replace with actual user's name
        };

        comments = [...comments, structuredComment];
        organizedComments = organizeComments(comments);
    };
</script>

<CommentInput {postID} on:addcomment={handleAddComment} />

<ul class="mt-4 space-y-4">
    {#each organizedComments as comment}
        <CommentItem {postID} {comment} onAddComment={handleAddComment} />
    {/each}
</ul>
