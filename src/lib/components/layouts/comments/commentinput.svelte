<script>
	import { createEventDispatcher } from 'svelte';

	export let isSaving; //holds the state of the comment saving
	export let parentCommentId = '00000000-0000-0000-0000-000000000000';
	export let postID = '';
	console.log('Psot Id: ', postID);
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
<svelte:head>
<link rel="stylesheet" href="/loader-button.css" />
</svelte:head>  
<div class="my-4">
	<textarea
		bind:value={commentText}
		placeholder="Add a comment..."
		class="w-full rounded-md border p-2 dark:bg-gray-800 dark:text-gray-200"
	></textarea>
	<button on:click={addComment} class="mt-2 flex justify-center items-center rounded-md bg-blue-500 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 px-4 py-2 text-white transition ease-in duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ">
		{#if isSaving}
    <svg width="20" height="20" fill="currentColor" class="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
      <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
      </path>
  </svg>
    Posting...
		{:else}
			Submit
		{/if}
	</button>
</div>
