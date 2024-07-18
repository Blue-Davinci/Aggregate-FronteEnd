<script>
    import { createEventDispatcher } from 'svelte';
  
    export let parentCommentId = "00000000-0000-0000-0000-000000000000";
    export let postID = "";
  
    const dispatch = createEventDispatcher();
    let commentText = '';	
    const addComment = () => {
    // check if there is really a comment, if not we return
      if (commentText.trim() === '') return;
  
      const comment = {
        post_id: postID, // Use dynamic post_id if needed
        parent_comment_id: parentCommentId,
        comment_text: commentText,
        created_at: new Date().toISOString()
      };
  
      dispatch('addcomment', comment);
      commentText = '';
    };
  </script>
  
  <div class="my-4">
    <textarea bind:value={commentText} placeholder="Add a comment..." class="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-gray-200"></textarea>
    <button on:click={addComment} class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">Submit</button>
  </div>
  