<script>
	import FeedsCard from '$lib/components/layouts/feedscard.svelte';
	import TopFeeds from '$lib/components/layouts/topfeeds.svelte';
	import PageHeader from '$lib/components/layouts/pageheader.svelte';
	import { getFeedsWithFollows } from '$lib/dataservice/feedfollowDataService.js';
	import { fly, slide } from 'svelte/transition';
	import { LucideNewspaper } from 'lucide-svelte';
	import Pagination from '$lib/components/layouts/pagination.svelte';
	/////
	import { tick } from 'svelte';
	import { Confetti } from 'svelte-confetti';
	/////

	export let data;
	$: feed_follows = data.feeds;
	//console.log("Front End Data: ", feed_follows);
	let user = data.props.user;
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

	// This will get our data per page using the same function
	// that we used to get the initial data
	async function fetchData(page) {
		//console.log("Page: ", page);
		let response = await getFeedsWithFollows({}, page, pageSize, '');
		data = response;
	}

	// this acts as our event reciever for a page change from the
	// pagination component, when the page changes, we invoke fetchData
	function handlePageChange(event) {
		currentPage = event.detail.page;
		fetchData(currentPage);
	}

</script>

<svelte:head>
	<link rel="stylesheet" href="/feed.css" />
	<link rel="stylesheet" href="/loader-tiny.css" />
</svelte:head>

<!-- Include PageHeader with icon prop -->
<PageHeader title={pageInfo.title} message={pageInfo.message} icon={pageInfo.icon} />


<!-- Existing Feeds Container -->
<div class="feeds-layout">
	<div class="feeds-container" in:fly={{ y: 200, duration: 1000 }} out:slide={{ duration: 600 }}>
		{#each feed_follows as feeds (feeds.feed.id)}
			<FeedsCard {feeds} {user} /> <!-- Set width to 1/2 for 2 per row -->
		{/each}
	</div>

	<!-- Existing Top Feeds Sidebar -->
	<TopFeeds />
</div>

<!-- Pagination Component -->
<Pagination {totalPages} {pageSize} {totalRecords} on:page-change={handlePageChange} />
