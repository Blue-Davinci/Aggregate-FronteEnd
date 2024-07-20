<script>
    import { createEventDispatcher } from 'svelte';
    import CommentInput from '$lib/components/layouts/comments/commentinput.svelte';
    import { Pencil } from 'lucide-svelte';
    import { updatePostComment } from '$lib/dataservice/commentDataService.js';
    import CommentItem from '$lib/components/layouts/comments/commentitem.svelte'; // Import CommentItem for nested replies

    export let isSaving; //holds the state of the comment saving
    export let comment;
    export let postID;
    export let onAddComment;

    const dispatch = createEventDispatcher();
    let isEditing = false;
    let editedText = comment.comment_text;

    const handleReply = () => {
        comment.showReplyInput = !comment.showReplyInput;
    };

    const handleEdit = () => {
        isEditing = !isEditing;
    };

    const handleSaveEdit = async () => {
        if (editedText.trim() === '') return;

        if (editedText !== comment.comment_text) {
            const updatedComment = {
                id: comment.id,
                comment_text: editedText,
            };

            let response = await updatePostComment(updatedComment);
            if (response.success) {
                comment.comment_text = editedText;
                isEditing = false;
            } else {
                // Handle error
            }
        } else {
            isEditing = false;
        }
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
        {#if isEditing}
            <textarea bind:value={editedText} class="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-gray-200"></textarea>
            <button on:click={handleSaveEdit} class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">Save</button>
        {:else}
            <p class="text-gray-900 dark:text-gray-100">{comment.comment_text}</p>
            <small class="text-gray-500 dark:text-gray-400">
                By {comment.user_name} on {new Date(comment.created_at).toLocaleString()}
            </small>
        {/if}
    </div>
    {#if comment.is_editable}
        <button on:click={handleEdit} class="text-blue-500 hover:underline">
            <Pencil class="inline w-4 h-4 mr-1" />
        </button>
    {/if}
    <button on:click={handleReply} class="text-blue-500 hover:underline">Reply</button>
    {#if comment.showReplyInput}
        <CommentInput {postID} parentCommentId={comment.id} on:addcomment={handleAddComment} {isSaving}/>
    {/if}
    {#if comment.replies.length > 0}
        <ul class="ml-4 mt-2 space-y-2">
            {#each comment.replies as reply}
                <CommentItem {postID} comment={reply} onAddComment={onAddComment} {isSaving} />
            {/each}
        </ul>
    {/if}
</li>
