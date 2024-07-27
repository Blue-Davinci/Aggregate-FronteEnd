<script>
	import { getTopFeedCreators } from '$lib/dataservice/getTopStatsDataService.js';
	import { GitBranchPlus, HeartCrack, Trophy, Medal } from 'lucide-svelte';
	import { fly, slide } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let user;
	let creators = [];
	let isLoading = true;

	onMount(async () => {
		try {
			const data = await getTopFeedCreators();
			if (data && data.top_feed_creators) {
				creators = data.top_feed_creators;
			} else {
				creators = [];
			}
		} catch (error) {
			console.error('Failed to load creators:', error);
			creators = [];
		} finally {
			isLoading = false;
		}
	});
</script>

<div in:fly={{ y: -200, duration: 1000 }} out:slide={{ y: 200, duration: 600 }} class="panel w-full max-w-md overflow-y-auto rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
	<div class="flex items-center justify-center mb-6">
		<GitBranchPlus class="text-gray-800 dark:text-white w-6 h-6 mr-2"/>
		<h2 class="text-xl font-bold text-gray-800 dark:text-white">Creator Leaderboard</h2>
	</div>
	{#if isLoading}
		<div class="flex h-full items-center justify-center">
			<div class="tinyloader"></div>
		</div>
	{:else if creators && creators.length > 0}
		{#each creators as creator, index (index)}
			<div class="flex items-center p-4 mb-4 rounded-lg shadow transition-transform transform hover:-translate-y-1 hover:shadow-lg 
				{index === 0 ? 'bg-yellow-100 dark:bg-yellow-800 text-gray-900 dark:text-gray-100' : 'bg-white dark:bg-gray-900'}">
				{#if index === 0}
					<Trophy class="w-8 h-8 text-yellow-500 dark:text-yellow-300 mr-4" />
				{:else}
					<Medal class="w-6 h-6 text-teal-500 dark:text-teal-300 mr-4" />
				{/if}
				<img src={creator.user.user_img} alt={creator.user.name} class="h-16 w-16 rounded-full mr-4 border border-gray-300 dark:border-gray-700 shadow-md" />
				<div class="flex-grow">
					<h3 class="text-lg font-semibold {index === 0 ? 'text-gray-900 dark:text-gray-100' : 'text-gray-900 dark:text-gray-100'}">{creator.user.name}</h3>
					<p class="text-sm {index === 0 ? 'text-gray-800 dark:text-gray-200' : 'text-gray-600 dark:text-gray-300'}">Feeds Created: {creator.created_feeds}</p>
					<p class="text-sm flex items-center {index === 0 ? 'text-gray-800 dark:text-gray-200' : 'text-gray-600 dark:text-gray-300'}">
						<span class="text-sm">Score:</span>
						<span class="text-sm font-extrabold text-indigo-500 ml-2 p-1 bg-indigo-100 dark:bg-indigo-900 rounded-md shadow">{creator.creator_score.toFixed(2)}</span>
					</p>
				</div>
			</div>
		{/each}
	{:else}
		<div class="flex flex-col items-center justify-center h-full text-center text-gray-600 dark:text-gray-300">
			<HeartCrack class="w-12 h-12 mb-2" />
			<p class="text-lg font-semibold">No creators available!</p>
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
		max-height: 33rem;
		overflow-y: auto;
	}
</style>
