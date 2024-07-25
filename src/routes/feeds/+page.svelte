<script>
	import FeedsCard from '$lib/components/layouts/cards/feedscard.svelte';
	import TopFeeds from '$lib/components/layouts/panels/topfeeds.svelte';
	import TopCreators from '$lib/components/layouts/panels/topcreators.svelte';
	import PageHeader from '$lib/components/layouts/general/pageheader.svelte';
	import SearchInput from '$lib/components/layouts/search-options/searchinput.svelte';
	import Tinyloader from '$lib/components/layouts/general/tinyloader.svelte';
	import { getFeedsWithFollows } from '$lib/dataservice/feedfollowDataService.js';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { LucideNewspaper } from 'lucide-svelte';
	import Pagination from '$lib/components/layouts/general/pagination.svelte';

	export let data;
	$: feed_follows = data?.feeds ?? {};
	let isFetching = false;
	let user = data?.props?.user ?? false;
	let pageInfo = {
		title: 'Feeds',
		message: 'Explore the latest feeds from the community.',
		icon: LucideNewspaper
	};
	let currentPage = data.metadata.current_page;
	let pageSize = data.metadata.page_size;
	let totalRecords = data.metadata.total_records;
	let totalPages = Math.ceil(totalRecords / pageSize);
	let searchQuery = '';

	async function fetchData(page) {
		isFetching = true;
		let response = await getFeedsWithFollows({}, page, pageSize, searchQuery);
		data = response;
		isFetching = false;
	}

	function handlePageChange(event) {
		currentPage = event.detail.page;
		fetchData(currentPage, '');
	}

	function handleSearch(event) {
		searchQuery = event.detail.query;
		fetchData(currentPage, searchQuery);
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

<div class="flex flex-wrap"  in:fly={{ y: 140, duration: 800 }} out:fade={{ duration: 400 }}>
	<div class="w-full lg:w-3/4">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
			{#each feed_follows as feeds (feeds.feed.id)}
				<FeedsCard {feeds} {user} />
			{/each}
		</div>
		<Pagination {totalPages} {pageSize} {totalRecords} on:page-change={handlePageChange}/>
	</div>

	<div class="w-full lg:w-1/4 flex flex-col gap-4">
		<TopCreators {user} />
		<TopFeeds {user} />
	</div>
</div>
