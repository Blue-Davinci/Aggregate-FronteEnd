<script>
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { createEventDispatcher, onMount } from 'svelte';
	import EmojiSelector from '$lib/components/layouts/comments/emojiselector.svelte';

	export let isSaving;
	export let parentCommentId = '00000000-0000-0000-0000-000000000000';
	export let postID = '';
	const dispatch = createEventDispatcher();
	let commentText = '';
	let showEmojiPicker = false;

	const addComment = () => {
		if (commentText.trim() === '') return;

		const comment = {
			post_id: postID,
			parent_comment_id: parentCommentId,
			comment_text: commentText,
			created_at: new Date().toISOString()
		};

		dispatch('addcomment', comment);
		commentText = '';
	};

	function onEmoji(event) {
		commentText += event.detail.emoji;
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
</script>

<svelte:head>
	<link rel="stylesheet" href="/loader-button.css" />
</svelte:head>

<div class="my-4">
	<div class="relative w-full">
		<Label for="comment">Your comment</Label>
		<Textarea
			id="comment"
			bind:value={commentText}
			placeholder="Add a comment..."
			class="w-full rounded-md border mt-1 p-2 dark:bg-gray-800 dark:text-gray-200"
		></Textarea>
		<button
			type="button"
			class="emoji-toggle-button absolute right-2 top-6"
			on:click={toggleEmojiPicker}
		>
			&#x1F642; <!-- Emoji icon -->
		</button>
		{#if showEmojiPicker}
			<div class="emoji-picker-container absolute right-1 top-10">
				<EmojiSelector on:emoji={onEmoji} />
			</div>
		{/if}
	</div>
	<button
		disabled={isSaving}
		on:click={addComment}
		class="mt-2 flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white shadow-md transition duration-200 ease-in hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200"
	>
		{#if isSaving}
			<svg
				width="20"
				height="20"
				fill="currentColor"
				class="mr-2 animate-spin"
				viewBox="0 0 1792 1792"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"
				>
				</path>
			</svg>
			Posting...
		{:else}
			Submit
		{/if}
	</button>
</div>
