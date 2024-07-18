<script>
    import { createEventDispatcher } from 'svelte';
    import CommentInput from '$lib/components/layouts/comments/commentinput.svelte';
    import CommentItem from '$lib/components/layouts/comments/commentitem.svelte'; // Import CommentItem for nested replies

    export let comment;
    export let postID;
    export let onAddComment;

    const dispatch = createEventDispatcher();

    const handleReply = () => {
        comment.showReplyInput = !comment.showReplyInput;
    };
    // Handle the addcomment event from the CommentInput component
    const handleAddComment = (event) => {
        const newComment = event.detail;
        dispatch('addcomment', newComment);
        onAddComment(event); // Propagate the event to the parent component
    };
</script>

<li class="rounded-md bg-gray-100 p-4 shadow-md dark:bg-gray-700">
    <div class="mb-2">
        <p class="text-gray-900 dark:text-gray-100">{comment.comment_text}</p>
        <small class="text-gray-500 dark:text-gray-400">
            By {comment.user_name} on {new Date(comment.created_at).toLocaleString()}
        </small>
    </div>
    <button
        on:click={handleReply}
        class="text-blue-500 hover:underline"
    >
        Reply
    </button>
    {#if comment.showReplyInput}
        <CommentInput {postID} parentCommentId={comment.id} on:addcomment={handleAddComment} />
    {/if}
    {#if comment.replies.length > 0}
        <ul class="ml-4 mt-2 space-y-2">
            {#each comment.replies as reply}
                <CommentItem {postID} comment={reply} onAddComment={onAddComment} />
            {/each}
        </ul>
    {/if}
</li>
