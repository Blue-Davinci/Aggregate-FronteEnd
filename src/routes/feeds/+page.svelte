<script>
	import FeedsCard from '$lib/components/layouts/feedscard.svelte';
	import TopFeeds from '$lib/components/layouts/topfeeds.svelte';
	import PageHeader from '$lib/components/layouts/pageheader.svelte';
	import SearchInput from '$lib/components/layouts/searchinput.svelte';
	import Tinyloader from '$lib/components/layouts/tinyloader.svelte';
	import { getFeedsWithFollows } from '$lib/dataservice/feedfollowDataService.js';
	import { fly, slide } from 'svelte/transition';
	import { LucideNewspaper } from 'lucide-svelte';
	import Pagination from '$lib/components/layouts/pagination.svelte';

	export let data;
	$: feed_follows = data?.feeds ?? {};
	//loader
	let isFetching = false;
	//console.log("Front End Data: ", feed_follows);
	let user = data?.props?.user ?? false;
	let pageInfo = {
		title: 'Feeds',
		message: 'Explore the latest feeds from the community.',
		icon: LucideNewspaper
	};
	// Page details
	let currentPage = data.metadata.current_page;
	let pageSize = data.metadata.page_size;
	let totalRecords = data.metadata.total_records;
	let totalPages = Math.ceil(totalRecords / pageSize);

	// Search query:
	let searchQuery = '';

	// This will get our data per page using the same function
	// that we used to get the initial data
	async function fetchData(page) {
		isFetching = true;
		console.log("Page: ", page, "Search Term: ", searchQuery);
		let response = await getFeedsWithFollows({}, page, pageSize, searchQuery);
		data = response;
		isFetching = false;
	}

	// This acts as our event reciever for a page change from the
	// pagination component, when the page changes, we invoke fetchData
	function handlePageChange(event) {
		currentPage = event.detail.page;
		fetchData(currentPage, '');
	}

	// This function, like handlePageChange, acts as an event reciever
	// for the search input component, when the search input changes.
	function handleSearch(event) {
		searchQuery = event.detail.query;
		// console.log('Search Query: ', searchQuery);
		fetchData(currentPage, searchQuery);
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="/feed.css" />
	<link rel="stylesheet" href="/loader-tiny.css" />
</svelte:head>

<!-- Include PageHeader with icon prop -->
<PageHeader title={pageInfo.title} message={pageInfo.message} icon={pageInfo.icon} />

<!-- Search Input Component For users-->
<div class="search-container">
	<SearchInput on:search={handleSearch} />
</div>

{#if isFetching}
    <Tinyloader message="Getting your feeds..." />
{/if}
<!-- Feeds Container -->
<div class="feeds-layout" in:fly={{ y: 200, duration: 1000 }} out:slide={{ duration: 600 }}>
	<div class="feeds-container">
			{#each feed_follows as feeds (feeds.feed.id)}
				<FeedsCard {feeds} {user} /> <!-- Set width to 1/2 for 2 per row -->
			{/each}
	</div>

	<!-- Top Feeds Sidebar -->
	<TopFeeds {user}/>
</div>
<!-- Pagination Component -->
<Pagination {totalPages} {pageSize} {totalRecords} on:page-change={handlePageChange} />
