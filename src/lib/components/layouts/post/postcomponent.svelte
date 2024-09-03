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
	import { Image, Bookmark, Aperture, Quote, Table, Tag, FileText } from 'lucide-svelte';

	export let username;
	export let fetchedData;
	let post;
	let htmlstatus;
	let htmlstatuscontent;
	let isLoading = true;
	let isFollowed = false;
	let data = {};
	let channelTitleSplit;
	$: postcomments = data?.comments ?? [];

	onMount(() => {
		post = getSessionPostData('rssFeed');
		try {
			if (post) {
				htmlstatus = post.htmlstatus;
				htmlstatuscontent = post.htmlstatuscontent;
				isFollowed = post.isFollowed;
				isLoading = false;
			}
			post = {
				info: fetchedData.feed,
				htmlstatus: checkForHTMLTags(fetchedData.feed.Channel.Item[0].Description),
				htmlstatuscontent: checkForHTMLTags(fetchedData.feed.Channel.Item[0].Content),
				isFollowed: fetchedData.isFollowed
			};
			saveSessionData('rssFeed', post);
			fetchPostComments(post.info.id);
			channelTitleSplit = post.info.Channel.Title.split(' ')[0];
		} catch (err) {
			console.log('Error: ', err);
		} finally {
			isLoading = false;
			console.log('Post: ', post);
		}
	});

	async function fetchPostComments(postID) {
		let response = await getCommentsForPost({}, postID);
		data = { ...response.data };
		await tick();
	}
</script>

<div class="container mx-auto p-4" in:fly={{ x: 200, duration: 1000 }} out:fade>
	<div class="mb-4 flex items-center justify-between">
		<h1 class="text-2xl font-bold">Post Details</h1>
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
			<p class="mt-2 text-gray-600 dark:text-gray-400">Loading Post...</p>
		</div>
	{:else if post}
		{#if !isFollowed}
			<div
				class="mb-6 flex animate-pulse items-center justify-between rounded-lg border border-red-500 bg-gradient-to-r from-red-100 to-red-200 p-4 text-red-700 dark:from-red-800 dark:to-red-900 dark:text-red-300"
			>
				<p class="font-semibold">
					You are not following this feed. Follow to get the latest updates!
				</p>
				<a
					href={`/feeds?searchOption=${channelTitleSplit}`}
					class="ml-4 rounded-full bg-red-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-red-600"
				>
					Follow Now
				</a>
			</div>
		{/if}

		{#if post}
			<div class="mb-4 flex space-x-2" in:fly={{ x: -200, duration: 1000 }} out:fade>
				<!-- Enhanced Tag Icon -->
				<Tag
					class="h-6 w-6 transform text-indigo-500 transition-transform duration-200 hover:scale-105 hover:text-indigo-700"
				/>

				<!-- Follow status badge -->
				<span
					class="hover:scale-102 transform rounded-full px-3 py-1 text-sm font-semibold transition-transform duration-200
					{isFollowed
						? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800'
						: 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800'}"
				>
					{isFollowed ? 'Feed Followed' : 'Not Followed'}
				</span>

				<!-- Language badge -->
				<span
					class="hover:scale-102 transform rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700
				transition-transform duration-200 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
				>
					{post.info.Channel.Language}
				</span>

				<!-- HTML content badge (generic) -->
				{#if htmlstatus || htmlstatuscontent}
					<span
						class="hover:scale-102 transform rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700
					transition-transform duration-200 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-800"
					>
						Formatted Content
					</span>
				{/if}
			</div>
		{/if}

		<div
			class="relative rounded-lg bg-white p-6 shadow-md dark:bg-gray-800"
			in:fly={{ x: 200, duration: 1000 }}
			out:fade
		>
			<h2 class="mb-4 flex items-center text-xl font-semibold text-gray-800 dark:text-gray-200">
				<Aperture class="mr-2 text-blue-500" size="24" />{post.info.Channel.Title}
			</h2>
			<a href={post.info.Channel.Link} class="mb-4 block text-blue-500 hover:underline"
				>{post.info.Channel.Link}</a
			>
			<p class="mb-6 text-gray-600 dark:text-gray-400">{post.info.Channel.Description}</p>

			<Separator class="my-4" />

			{#each post.info.Channel.Item as item}
				<div class="mb-8">
					{#if item.ImageURL}
						<!-- Main Image with Hover Effect -->
						<div
							class="mb-4 flex transform justify-center transition-transform duration-300 hover:scale-105"
						>
							<img
								src={item.ImageURL}
								alt={item.Title}
								class="h-auto max-w-full rounded-md shadow-lg"
							/>
						</div>
					{/if}

					<h3 class="mb-2 text-lg font-bold text-gray-800 dark:text-gray-200">{item.Title}</h3>
					<div class="mb-2 flex items-center justify-between">
						<a href={item.Link} class="text-blue-500 hover:underline">{item.Link}</a>
						<p class="text-sm text-gray-500 dark:text-gray-400">{item.PubDate}</p>
					</div>

					<div
						class="mb-4 flex items-center justify-between italic text-gray-600 dark:text-gray-400"
					>
						<p>Published on: {item.PubDate}</p>
						<p>Updated on: {post.info.updated_at}</p>
					</div>

					<div class="rounded-md bg-gray-50 p-4 dark:bg-gray-900">
						<h4 class="flex items-center text-base font-semibold text-gray-700 dark:text-gray-300">
							<Quote class="mr-2" size="24" />
							Description:
						</h4>

						{#if item.Description}
							{#if htmlstatus}
								<div class="mt-2 text-gray-800 dark:text-gray-200">{@html item.Description}</div>
							{:else}
								<p class="mt-2 text-gray-800 dark:text-gray-200">{item.Description}</p>
							{/if}
						{:else}
							<!-- No Description Available -->
							<div
								class="mt-4 flex h-40 flex-col items-center justify-center text-gray-500 dark:text-gray-400"
							>
								<FileText class="mb-2" size="24" />
								<span>No Description Available</span>
							</div>
						{/if}
					</div>

					<Separator class="my-4" />

					<div class="rounded-md bg-gray-50 p-4 dark:bg-gray-900">
						<h4 class="flex items-center text-base font-semibold text-gray-700 dark:text-gray-300">
							<Table class="mr-2 text-blue-500" size="24" />
							Content:
						</h4>

						{#if item.Content}
							{#if htmlstatuscontent}
								<div class="mt-2 text-gray-800 dark:text-gray-200">{@html item.Content}</div>
							{:else}
								<p class="mt-2 text-gray-800 dark:text-gray-200">{item.Content}</p>
							{/if}
						{:else}
							<!-- No Content Available -->
							<div
								class="mt-4 flex h-40 flex-col items-center justify-center text-gray-500 dark:text-gray-400"
							>
								<FileText class="mb-2" size="24" />
								<span>No Content Available</span>
							</div>
						{/if}
					</div>

					<Separator class="my-4" />

					<div class="flex justify-center">
						<Sharecomponent
							channelTitle={post.info.Channel.Title}
							imgURL={post.info.Channel.Item[0].ImageURL}
						/>
					</div>
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
		<p class="text-gray-600 dark:text-gray-400">No post data available.</p>
		<Separator class="my-4" />
	{/if}
</div>

<style>
	.container {
		max-width: 800px;
	}
</style>
