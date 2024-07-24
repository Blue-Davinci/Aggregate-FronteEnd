<script>
	import { getTopFavoriteFeeds } from '$lib/dataservice/getTopStatsDataService.js';
	import { onMount } from 'svelte';
	import { Pizza, HeartCrack } from 'lucide-svelte';
	import { fly, slide } from 'svelte/transition';

	export let user;
	let feeds;
	let isLoading = true;

	onMount(async () => {
		try {
			const data = await getTopFavoriteFeeds();
			if (data && data.top_followed_feeds) {
				feeds = data.top_followed_feeds;
			} else {
				feeds = [];
			}
		} catch (error) {
			console.error('Failed to load feeds:', error);
			feeds = [];
		} finally {
			isLoading = false;
		}
	});
</script>
<div 
	in:fly={{ y: -200, duration: 1000 }} out:slide={{ y:200, duration: 600 }}
	class="panel w-full max-w-xs overflow-y-auto rounded-lg bg-white p-6 shadow-md dark:bg-gray-800"
>
	<div class="flex items-center justify-center mb-6">
		<Pizza class="text-gray-800 dark:text-white w-6 h-6 mr-2"/>
		<h2 class="text-xl font-bold text-gray-800 dark:text-white">
			Current Top Feeds
		</h2>
	</div>
	{#if isLoading}
		<div class="flex h-full items-center justify-center">
			<div class="tinyloader"></div>
		</div>
	{:else if feeds && feeds.length > 0}
	{#each feeds as { feed, follow_count } (feed.id)}
    <a
      href={`/feeds/${feed.id}`}
      class="flex items-center border-b border-gray-200 py-3 transition duration-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
    >
      <img src={feed.img_url} alt={feed.name} class="mr-4 h-12 w-12 rounded-full" />
      <div class="flex-grow">
        <h3 class="break-all text-lg font-semibold text-gray-900 dark:text-gray-100">
          {feed.name}
        </h3>
        <small class="text-sm text-gray-500 dark:text-gray-300">{follow_count} follower(s)</small>
      </div>
    </a>
  {/each}
	{:else}
		<div class="flex flex-col items-center justify-center h-full text-center text-gray-600 dark:text-gray-300">
			<HeartCrack class="w-12 h-12 mb-2" />
			<p class="text-lg font-semibold">No feeds available!</p>
			<p class="text-sm">
				Seems like everyone's on vacation. Try again later! 
				{#if user}
					<a href="/dashboard" class="text-blue-500 dark:text-blue-300 hover:underline">or be the first to create one</a>
				{:else}
					<a href="/signup" class="text-blue-500 dark:text-blue-300 hover:underline">or signup and be the first one</a>
				{/if}
			</p>
		</div>
	{/if}
</div>

<style>
	.panel {
		width: 32rem; /* Slightly increase the width */
		max-height: 33rem; /* Set max-height to prevent it from running full height */
		overflow-y: auto; /* Enable vertical scrolling */
	}
</style>
