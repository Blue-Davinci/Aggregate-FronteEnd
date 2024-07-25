<script>
	import { onMount } from 'svelte';
	import { AlertTriangle, Loader } from 'lucide-svelte';
	import { checkForHTMLTags } from '$lib/utilities/utils.js';
	import { getSampleRSSPostsForFeed } from '$lib/dataservice/samplesDataService';
	export let feedID;

	let rssPosts = [];
	let isLoading = true;

	onMount(() => {
		getRSSPosts();
	});

	async function getRSSPosts() {
		try {
			let data = await getSampleRSSPostsForFeed(feedID);
			rssPosts = data.rss_posts;
			checkHTML();
		} catch (err) {
			console.error(err);
		} finally {
			isLoading = false;
		}
	}

	function checkHTML() {
		// Add isHTMLDescription field to each item
		rssPosts = rssPosts.map((post) => {
			post.Channel.Item = post.Channel.Item.map((item) => {
				item.isHTMLDescription = checkForHTMLTags(item.Description);
				return item;
			});
			return post;
		});
	}

	function format(str) {
		let convertedStr = str.replace(/<\/?[^>]+(>|$)/g, '');
		return convertedStr.slice(0, 20) + '...';
	}
</script>

{#if isLoading}
	<div class="flex flex-col items-center justify-center h-full p-6 text-center text-gray-600 dark:text-gray-300">
		<Loader class="w-12 h-12 mb-4 animate-spin text-blue-500" />
		<p class="text-lg font-semibold">Loading posts...</p>
	</div>
{:else}
	{#if rssPosts.length === 0}
		<div class="flex flex-col items-center justify-center h-full p-6 text-center text-gray-600 dark:text-gray-300">
			<AlertTriangle class="w-12 h-12 mb-4 text-yellow-500" />
			<p class="text-lg font-semibold">No posts available at the moment.</p>
			<p class="text-sm">Please check back later for more updates, or <a href="/login" class="text-blue-500 hover:underline">login</a>/<a href="/signup" class="text-blue-500 hover:underline">signup</a> to see more posts.</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
			{#each rssPosts as post (post.id)}
				<div
					class="transform overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-105 dark:bg-gray-800"
				>
					<img
						class="h-48 w-full object-cover"
						src={post.Channel.Item[0].ImageURL}
						alt={post.Channel.Item[0].Title}
					/>
					<div class="p-4">
						<h3 class="mb-2 text-lg font-bold text-gray-800 dark:text-white">{post.Channel.Title}</h3>
						<h4 class="text-md mb-2 font-semibold text-gray-700 dark:text-gray-300">
							{post.Channel.Item[0].Title}
						</h4>
						{#if post.Channel.Item[0].isHTMLDescription}
							<div class="mb-2 text-sm text-gray-600 dark:text-gray-400">{format(post.Channel.Item[0].Description)}</div>
						{:else}
							<p class="mb-2 text-sm text-gray-600 dark:text-gray-400">{post.Channel.Item[0].Description.slice(0, 20) + '...'}</p>
						{/if}
						<a href={"/dashboard"} class="text-blue-500 hover:underline" target="_blank"
							>Read More</a
						>
					</div>
				</div>
			{/each}
		</div>
	{/if}
{/if}
