<script>
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { createEventDispatcher, onMount } from 'svelte';
	import { setToast } from '$lib/utilities/utils';
	import CommentInput from '$lib/components/layouts/comments/commentinput.svelte';
	import { Pencil, Trash } from 'lucide-svelte'; // Import Trash icon from lucide-svelte
	import { updatePostComment, deletePostComment } from '$lib/dataservice/commentDataService.js';
	import CommentItem from '$lib/components/layouts/comments/commentitem.svelte'; // Import CommentItem for nested replies
	import EmojiSelector from '$lib/components/layouts/comments/emojiselector.svelte';

	export let isSaving; //holds the state of the comment saving
	export let comment;
	export let postID;
	export let onAddComment;

	const dispatch = createEventDispatcher();
	let isEditing = false;
	let editedText = comment.comment_text;
	let showEmojiPicker = false;

	const handleReply = () => {
		isEditing = false;
		comment.showReplyInput = !comment.showReplyInput;
	};

	const handleEdit = () => {
		isEditing = !isEditing;
		comment.showReplyInput = false;
	};

	const handleSaveEdit = async () => {
		if (editedText.trim() === '') return;

		if (editedText !== comment.comment_text) {
			const updatedComment = {
				id: comment.id,
				comment_text: editedText,
				version: comment.version
			};

			let response = await updatePostComment(updatedComment);
			if (!response.error) {
				comment.comment_text = editedText;
				// we update the version of the comment
				comment.version = response.version;
				console.log(
					'Comment updated successfully: ',
					comment.version,
					'|| Response version: ',
					response.version
				);
				isEditing = false;
			} else {
				// Handle error
				console.log('Error getting back comment update: ', response.error);
				isEditing = false;
				setToast(
					false,
					'An error occurred and we could not process your edited comment. Please try again later.'
				);
			}
		} else {
			isEditing = false;
		}
	};

	function onEmoji(event) {
		editedText += event.detail.emoji;
		showEmojiPicker = false;
	}
	function toggleEmojiPicker() {
		showEmojiPicker = !showEmojiPicker;
	}

	function handleClickOutside(event) {
		if (
			showEmojiPicker &&
			!event.target.closest('.emoji-picker-container') &&
			!event.target.closest('.emoji-toggle-button')
		) {
			showEmojiPicker = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	// Handle the addcomment event from the CommentInput component
	const handleAddComment = (event) => {
		console.log("event adding comment..");
		const newComment = event.detail;
		dispatch('addcomment', newComment);
		onAddComment(event); // Propagate the event to the parent component
	};

	// Handle the delete comment event from the CommentItem component
	const handleDelete = async () => {
        if (!comment || !comment.id) return;
        
		let response = await deletePostComment(comment.id);
		if (!response.error) {
			console.log("Dispatching deletecomment event..");
			dispatch('deletecomment', { id: comment.id });
			//comment.comment_text = '[deleted]';
			//comment.is_editable = false;
			setToast(true, 'Comment deleted successfully.');
		} else {
			console.log('Error deleting comment: ', response.error);
			setToast(
				false,
				'An error occurred and we could not delete your comment. Please try again later.'
			);
		}
	};

	const handleNestedDelete = (event) => {
        dispatch('deletecomment', event.detail);
    };
</script>

<li class="rounded-md bg-gray-100 p-4 shadow-md dark:bg-gray-700">
	<div class="mb-2">
		{#if isEditing}
			<div class="relative w-full">
				<Textarea
					bind:value={editedText}
					class="w-full rounded-md border p-2 dark:bg-gray-800 dark:text-gray-200"
				></Textarea>
				<button
					type="button"
					class="emoji-toggle-button absolute right-2 top-2"
					on:click={toggleEmojiPicker}
				>
					&#x1F448; <!-- Emoji icon -->
				</button>
				{#if showEmojiPicker}
					<div class="emoji-picker-container absolute right-2 top-10">
						<EmojiSelector on:emoji={onEmoji} />
					</div>
				{/if}
			</div>
			<button
				on:click={handleSaveEdit}
				class="mt-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">Save</button
			>
		{:else}
			<p class="text-gray-900 dark:text-gray-100">{comment.comment_text}</p>
			<div class="flex items-center space-x-2">
				<small class="text-gray-500 dark:text-gray-400">
					By {comment.user_name} on {new Date(comment.created_at).toLocaleString()}
				</small>
				{#if comment.version > 1}
					<small
						class="texs-xs rounded-full bg-red-100 px-2 py-1 text-red-500 dark:bg-red-800 dark:text-red-400"
						style="font-size: 10px;">Edited</small
					>
				{/if}
			</div>
		{/if}
	</div>

	<div class="flex space-x-4">
		{#if comment.is_editable}
			<button on:click={handleEdit} class="text-blue-500 hover:underline">
				<Pencil class="inline h-4 w-4" />
			</button>
			<button on:click={handleDelete} class="text-red-500 hover:underline">
				<Trash class="inline h-4 w-4" />
			</button>
		{/if}
		<button on:click={handleReply} class="text-blue-500 hover:underline">Reply</button>
	</div>

	{#if comment.showReplyInput}
		<CommentInput
			{postID}
			parentCommentId={comment.id}
			on:addcomment={handleAddComment}
			{isSaving}
		/>
	{/if}

	{#if comment.replies.length > 0}
		<ul class="ml-4 mt-2 space-y-2">
			{#each comment.replies as reply}
				<CommentItem {postID} comment={reply} {onAddComment} {isSaving} on:deletecomment={handleNestedDelete}/>
			{/each}
		</ul>
	{/if}
</li>
