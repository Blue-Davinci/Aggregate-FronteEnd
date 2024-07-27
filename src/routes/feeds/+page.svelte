<script>
	import FeedsCard from '$lib/components/layouts/cards/feedscard.svelte';
	import TopFeeds from '$lib/components/layouts/panels/topfeeds.svelte';
	import TopCreators from '$lib/components/layouts/panels/topcreators.svelte';
	import PageHeader from '$lib/components/layouts/general/pageheader.svelte';
	import SearchInput from '$lib/components/layouts/search-options/searchinput.svelte';
	import Tinyloader from '$lib/components/layouts/general/tinyloader.svelte';
	import { getFeedsWithFollows } from '$lib/dataservice/feedfollowDataService.js';
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
	import { Newspaper, Search, FilePlus } from 'lucide-svelte';
	import Pagination from '$lib/components/layouts/general/pagination.svelte';
  
	export let data;
	$: feed_follows = data?.feeds ?? [];
	let isFetching = false;
	let user = data?.props?.user ?? false;
	let pageInfo = {
	  title: 'Feeds',
	  message: 'Explore the latest feeds from the community.',
	  icon: Newspaper
	};
	let currentPage = data.metadata.current_page;
	let pageSize = data.metadata.page_size;
	let totalRecords = data.metadata.total_records;
	let totalPages = Math.ceil(totalRecords / pageSize);
	let searchQuery = $page.url.searchParams.get('searchOption') ?? '';
  
	async function fetchData(page, query = '') {
	  isFetching = true;
	  let response = await getFeedsWithFollows({}, page, pageSize, query);
	  data = response;
	  feed_follows = response.feeds ?? [];
	  isFetching = false;
	}
  
	function handlePageChange(event) {
	  currentPage = event.detail.page;
	  fetchData(currentPage, searchQuery);
	}
  
	function handleSearch(event) {
	  searchQuery = event.detail.query;
	  currentPage = 1; // Reset to first page on new search
	  fetchData(currentPage, searchQuery);
	}
  
	function handleResetSearch() {
	  searchQuery = '';
	  currentPage = 1;
	  fetchData(currentPage, '');
	}
  </script>
  
  <svelte:head>
	<link rel="stylesheet" href="/feed.css" />
	<link rel="stylesheet" href="/loader-tiny.css" />
  </svelte:head>
  
  <PageHeader title={pageInfo.title} message={pageInfo.message} icon={pageInfo.icon} />
  
  <div class="mb-4">
	<SearchInput on:search={handleSearch} />
  </div>
  
  {#if isFetching}
	<Tinyloader message="Getting your feeds..." />
  {/if}
  
  {#if feed_follows.length === 0}
	{#if searchQuery}
	  <div class="flex flex-col items-center justify-center text-center mt-8">
		<Search class="h-16 w-16 text-gray-500 mb-4" />
		<p class="text-xl text-gray-700 dark:text-gray-300">No feeds matching your search query. Try different keywords or <a href="#feeds" on:click|preventDefault={handleResetSearch} class="text-blue-500 hover:underline">go back to all feeds</a>.</p>
		<p class="mt-4 text-sm text-gray-600 dark:text-gray-400">"Not all those who wander are lost, some just haven't found the right keywords!"</p>
	  </div>
	{:else}
	  <div class="flex flex-col items-center justify-center text-center mt-8">
		<FilePlus class="h-16 w-16 text-gray-500 mb-4" />
		<p class="text-xl text-gray-700 dark:text-gray-300">Looks like there are no feeds here yet.</p>
		<p class="mt-4 text-gray-600 dark:text-gray-400">Why not be the trailblazer? Create the first feed and become a legend!</p>
		<div class="flex mt-4 space-x-4">
		  <a href="/signup" class="bg-green-500 text-white py-2 px-4 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg dark:bg-green-600 dark:hover:bg-green-700">Sign Up</a>
		  <a href="/login" class="bg-yellow-500 text-white py-2 px-4 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg dark:bg-yellow-600 dark:hover:bg-yellow-700">Log In</a>
		  <a href="/dashboard" class="bg-blue-500 text-white py-2 px-4 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg dark:bg-blue-600 dark:hover:bg-blue-700">Go to Dashboard</a>
		</div>
		<p class="mt-4 text-sm text-gray-600 dark:text-gray-400">"Be the change you want to see in the feeds!"</p>
	  </div>
	{/if}
  {:else}
	<div class="flex flex-wrap" in:fly={{ y: 50, duration: 700 }} out:fade={{ duration: 400 }}>
	  <div class="w-full lg:w-3/4">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
		  {#each feed_follows as feeds (feeds.feed.id)}
			<FeedsCard {feeds} {user} />
		  {/each}
		</div>
		<Pagination {totalPages} {pageSize} {totalRecords} on:page-change={handlePageChange} />
	  </div>
	  <div class="w-full lg:w-1/4 flex flex-col gap-4">
		<TopCreators {user} />
		<TopFeeds {user} />
	  </div>
	</div>
  {/if}
  