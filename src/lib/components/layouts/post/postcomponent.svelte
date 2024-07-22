<script>
	import { getCommentsForPost } from '$lib/dataservice/commentDataService.js';
	import Downloadoptions from '../download/downloadoptions.svelte';
	import Commentlist from '$lib/components/layouts/comments/commentlist.svelte';
	import Sharecomponent from '../general/sharecomponent.svelte';
	import { onMount, tick } from 'svelte';
	import { checkForHTMLTags } from '$lib/utilities/utils.js';
	import { getSessionPostData, saveSessionData } from '$lib/store/sessionStore.js';
	import { fly, fade } from 'svelte/transition';
	import { Separator } from '$lib/components/ui/separator';

	export let username;
	export let fetchedData;
	let post;
	let htmlstatus;
	let isLoading = true;
	let data = {};
	$: postcomments = data?.comments ?? [];

	onMount(() => {
		post = getSessionPostData('rssFeed');
		try {
			if (post) {
				htmlstatus = post.htmlstatus;
				isLoading = false;
			}
			post = {
				info: fetchedData.feed,
				htmlstatus: checkForHTMLTags(fetchedData.feed.Channel.Item[0].Description)
			};
			saveSessionData('rssFeed', post);
			fetchPostComments(post.info.id);
		} catch (err) {
			console.log('Error: ', err);
		} finally {
			isLoading = false;
		}
	});

	async function fetchPostComments(postID) {
		let response = await getCommentsForPost({}, postID);
		data = { ...response.data };
		await tick();
	}
</script>

<div class="container mx-auto p-4" in:fly={{ x: 200, duration: 1000 }} out:fade>
	<div class="flex items-center justify-between mb-4">
		<h1 class="text-2xl font-bold">Post Details</h1>
		<!-- Download Options Placement -->
		<div class="ml-4">
			<Downloadoptions {post} />
		</div>
	</div>
	
	{#if isLoading}
		<div class="py-20 text-center">
			<div class="saving-container">
				<span class="loader"></span>
				<span class="saving">Loading Post..</span>
			</div>
			<p class="mt-2 text-gray-600">Loading Post...</p>
		</div>
	{:else if post}
		<div class="relative rounded-lg p-6 shadow-md">
			<h2 class="mb-4 text-xl font-semibold">{post.info.Channel.Title}</h2>
			<a href={post.info.Channel.Link} class="mb-4 block text-blue-500 hover:underline"
				>{post.info.Channel.Link}</a
			>
			<p class="mb-6">{post.info.Channel.Description}</p>

			<Separator class="my-4" />

			{#each post.info.Channel.Item as item}
				<div class="mb-8">
					{#if item.ImageURL}
						<div class="flex justify-center">
							<img src={item.ImageURL} alt={item.Title} class="h-auto max-w-full rounded-md" />
						</div>
						<Separator class="my-4" />
					{/if}
					<div class="flex justify-center">
						<Sharecomponent
							channelTitle={post.info.Channel.Title}
							imgURL={post.info.Channel.Item[0].ImageURL}
						/>
					</div>
					<div>
						<h3 class="mb-2 text-lg font-bold">{item.Title}</h3>
						<a href={item.Link} class="mb-2 block text-blue-500 hover:underline">{item.Link}</a>
						<div class="mb-4 flex items-center justify-between">
							<p class="italic">Published on: {item.PubDate}</p>
							<p class="italic">Updated on: {post.info.updated_at}</p>
						</div>
						{#if htmlstatus}
							<div class="text-base">{@html item.Description}</div>
						{:else}
							<p class="text-base">{item.Description}</p>
						{/if}
					</div>
					<Separator class="my-4" />
				</div>
			{/each}
			{#if postcomments.length > 0}
				<Commentlist postID={post.info.id} comments={postcomments} {username} />
			{:else}
				<Commentlist postID={post.info.id} {username} />
			{/if}
			<div class="mt-5 text-center">
				<a href="/dashboard" class="text-blue-500 hover:underline">Go Back</a>
			</div>
		</div>
	{:else}
		<Separator class="my-4" />
		<p class="text-gray-600">No post data available.</p>
		<Separator class="my-4" />
	{/if}
</div>

<style>
	.container {
		max-width: 800px;
	}
</style>
