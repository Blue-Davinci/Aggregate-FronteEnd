<script>
	import { onMount } from 'svelte';
	import { setToast } from '$lib/utilities/utils';
	import { savePostComment } from '$lib/dataservice/commentDataService.js';
	import CommentInput from '$lib/components/layouts/comments/commentinput.svelte';
	import CommentItem from '$lib/components/layouts/comments/commentitem.svelte';
	import { MessagesSquare } from 'lucide-svelte';

	export let username;
	export let comments = [];
	export let postID = '';

	let organizedComments = [];
	let isSaving = false;
	console.log('CommentList POST ID: ', comments);

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
			// The 000.. uuid represents the parent comment according to the backend api
			// so we handle this as a top-level comment
			if (comment.parent_comment_id === '00000000-0000-0000-0000-000000000000') {
				result.push(map[comment.id]);
			} else {
				const parent = map[comment.parent_comment_id];
				if (parent) {
					parent.replies.push(map[comment.id]);
				} else {
					// If the parent does not exist in the map, treat this comment as a top-level comment
					result.push(map[comment.id]);
				}
			}
		});

		return result;
	};

	const saveNewPostComment = async (newComment) => {
		let response = await savePostComment(newComment);
		return response;
	};

	const handleAddComment = async (event) => {
		isSaving = true;
		const newComment = event.detail;
		if (!newComment.created_at) {
			newComment.created_at = new Date().toISOString();
		}
		let response = await saveNewPostComment(newComment);
		if (response.error) {
			setToast(false, response.error, 3000);
			return;
		} else {
			setToast(true, 'Your comment has been saved', 2000);
		}
		let responseComment = response.data.comment;
		const structuredComment = {
			comment: {
				id: responseComment.id,
				post_id: responseComment.post_id,
				user_id: responseComment.user_id || '1',
				parent_comment_id: responseComment.parent_comment_id,
				comment_text: responseComment.comment_text,
				created_at: responseComment.created_at,
				is_editable: true,
				version: responseComment.version || 1
			},
			user_name: username
		};

		comments = [...comments, structuredComment];
		organizedComments = organizeComments(comments);
		isSaving = false;
	};

	const handleDeleteComment = (event) => {
		console.log('Handle delete..');
		const { id } = event.detail;

		const recursiveDelete = (comments, idToDelete) => {
			for (let i = 0; i < comments.length; i++) {
				if (comments[i].id === idToDelete) {
					// Instead of deleting, reassign child comments to top level
					const childComments = comments[i].replies;
					comments.splice(i, 1, ...childComments); // Remove the parent and add its children to the current level
					return true;
				} else if (comments[i].replies.length > 0) {
					if (recursiveDelete(comments[i].replies, idToDelete)) {
						return true;
					}
				}
			}
			return false;
		};

		organizedComments = structuredClone(organizedComments);
		recursiveDelete(organizedComments, id);
	};

	$: {
		organizedComments = organizeComments(comments);
	}
</script>

{#if organizedComments.length === 0}
	<div class="flex flex-col items-center justify-center py-8">
		<MessagesSquare class="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400" />
		<p class="text-lg text-gray-600 dark:text-gray-300">
			No comments yet. Be the first to share your thoughts!
		</p>
	</div>
{/if}

<CommentInput {postID} on:addcomment={handleAddComment} {isSaving} />
<ul class="mt-4 space-y-4">
	{#each organizedComments as comment}
		<CommentItem
			{postID}
			{comment}
			onAddComment={handleAddComment}
			{isSaving}
			on:deletecomment={handleDeleteComment}
		/>
	{/each}
</ul>
