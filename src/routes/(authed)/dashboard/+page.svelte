<script>
	import Metamanager from '$lib/components/layouts/metatags/metamanager.svelte';
	import DashboardNav from '$lib/components/layouts/navs/dashboardnav.svelte';
	import FeedsComboBox from '$lib/components/layouts/search-options/feedscombobox.svelte';
	import Tinyloader from '$lib/components/layouts/general/tinyloader.svelte';
	import { Bird, Squirrel, MessageCircleX } from 'lucide-svelte';
	import PageHeader from '$lib/components/layouts/general/pageheader.svelte';
	import Pagination from '$lib/components/layouts/general/pagination.svelte';
	import { fly, slide, fade } from 'svelte/transition';
	import { LayoutDashboard } from 'lucide-svelte';
	import PostsCard from '$lib/components/layouts/cards/postscard.svelte';
	import FAB from '$lib/components/layouts/general/floatingactionbutton.svelte';
	import { getFollowedPostsDataService } from '$lib/dataservice/getFollowedPostsDataService.js';
	import SearchInput from '$lib/components/layouts/search-options/searchinput.svelte';
  
	export let data;
	let pagemetadata = data?.props?.metadata ?? {};
	export let form = undefined;
	// loader
	let isFetching = false;
	// Search query:
	let searchQuery = '';
	// Filter Query:
	let feedID = '';
	// Page details
	let currentPage = data?.posts?.metadata.current_page ?? 1;
	let pageSize = data?.posts?.metadata.page_size ?? 1;
	let totalRecords = data?.posts?.metadata.total_records ?? 1;
	let totalPages = Math.ceil(totalRecords / pageSize);
	// loading
	let isLoading = false;
	let pageInfo = {
	  title: 'Dashboard',
	  message:
		'Your one-stop hub for aggregating, exploring, and interacting with the latest RSS feeds. Discover, like, favorite, share, and follow the content that matters most to you.',
	  icon: LayoutDashboard
	};
	// console.log('In Client side Data: ', data);
	$: posts = data?.posts?.followed_rss_posts || [];
	// console.log("Dashboard Data: ", data.notifications.notification_group);
	$: notifications = data?.notifications?.notification_group ?? [];
	//$: console.log("----Notifications: ", notifications);
	// controls the modal for the feed addition
	async function fetchData(page) {
	  isFetching = true;
	  // console.log('Page: ', page, 'Search Term: ', searchQuery);
	  let response = await getFollowedPostsDataService({}, page, pageSize, searchQuery, feedID);
	  //console.log('Data before: ', data);
	  // We do this to standardize the data as received from the server during (page.server.js) load.
	  data = {
		props: data?.props ?? {},
		posts: response.data,
		notifications: {
		  notification_group: data.notifications.notification_group ?? []
		}
	  };
	  //console.log('Data after: ', data.notifications);
	  isFetching = false;
	}
  
	// This acts as our event receiver for a page change from the
	// pagination component, when the page changes, we invoke fetchData
	function handlePageChange(event) {
	  currentPage = event.detail.page;
	  fetchData(currentPage, '');
	}
  
	function handleSearch(event) {
	  searchQuery = event.detail.query;
	  // console.log('Search Query: ', searchQuery);
	  fetchData(currentPage, searchQuery);
	}
  
	function handleFeedSelect(event) {
	  feedID = event.detail;
	  console.log('Feed ID:', feedID);
	  fetchData(currentPage);
	}
  </script>
  
  <svelte:head>
	<link rel="stylesheet" href="/auth.css" />
  </svelte:head>
  <Metamanager {pagemetadata} {pageInfo} />
  
  <PageHeader title={pageInfo.title} message={pageInfo.message} icon={pageInfo.icon} />
  
  <DashboardNav {notifications} avatar={data?.props?.userimage ?? '/user.jpg'} />
  
  <div class="search-container mt-5 flex items-center gap-4">
	<div class="flex-1">
	  <SearchInput on:search={handleSearch} />
	</div>
	<div class="mb-4 w-[200px]">
	  <FeedsComboBox on:select={handleFeedSelect} />
	</div>
  </div>
  
  {#if isFetching}
	<Tinyloader message="Fetching Posts..." />
  {:else}
	{#if posts.length > 0}
	  <div
		class="align-content-start flex flex-row flex-wrap items-start justify-start gap-2"
		in:fly={{ x: 200, duration: 1000 }}
		out:fade
	  >
		{#each posts as rsspost (rsspost.feed.id)}
		  <PostsCard {rsspost} />
		{/each}
	  </div>
	{:else}
	  <div class="flex h-full flex-col items-center justify-center text-center mt-10">
		{#if searchQuery !== ''}
		  <Bird class="text-blue-500 w-20 h-20" />
		  <p class="mt-2 text-lg font-semibold">No items found for your search. Try a different keyword!</p>
		{:else if feedID !== ''}
		  <MessageCircleX class="text-red-500 w-20 h-20" />
		  <p class="mt-2 text-lg font-semibold">
			Seems like your filter is too exclusive for our feeds. Maybe loosen the tie a bit?
		  </p>
		{:else}
		  <Squirrel class="text-yellow-500 w-20 h-20" />
		  <p class="mt-2 text-lg font-semibold">
			No posts here! Looks like your feed is on a diet. Head over to the <a href="/feeds" class="text-blue-500 underline">Feeds</a> and follow some feeds to fatten it up!
		  </p>
		{/if}
	  </div>
	{/if}
  
	{#if posts.length > 0}
	  <Pagination {totalPages} {pageSize} {totalRecords} on:page-change={handlePageChange} />
	{/if}
  
	<FAB {form} {isLoading} />
  {/if}
  