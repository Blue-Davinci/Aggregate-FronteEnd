<script>
	import Pagination from '$lib/components/layouts/general/pagination.svelte';
	import Adminfeedstats from '$lib/components/layouts/admin/adminfeeds/adminfeedstats.svelte';
	import Adminfeedscards from '$lib/components/layouts/cards/adminfeedscards.svelte';
	import SearchInput from '$lib/components/layouts/search-options/searchinput.svelte';
	import Feedtypecombobox from '$lib/components/layouts/search-options/feedtypecombobox.svelte';
	import Feedprioritiedcombobox from '$lib/components/layouts/search-options/feedprioritiedcombobox.svelte';
	import { adminGetAllFeedsWithParams } from '$lib/dataservice/admin/adminFeedsDataService.js';
	import { Label } from '$lib/components/ui/label';
	import { AlertCircle, Search, Filter } from 'lucide-svelte';

	export let data;

	let isLoading = false;
	let searchQuery = '';
	let feedType = '';
	let priority = '';

	$: feeds = data?.feeds ?? [];
	$: statistics = data?.statistics ?? {};
	let metadata = data?.metadata ?? {};

	// Page details
	let currentPage = metadata.current_page ?? 1;
	let pageSize = metadata.page_size ?? 1;
	let totalRecords = metadata.total_records ?? 1;
	let totalPages = Math.ceil(totalRecords / pageSize);

	async function fetchData(page) {
		isLoading = true;
		let response = await adminGetAllFeedsWithParams({}, page, pageSize, searchQuery, feedType, priority);
		data = response.data;
		isLoading = false;
		console.log('Data after: ', data);
	}

	function handlePageChange(event) {
		currentPage = event.detail.page;
		fetchData(currentPage, '');
	}

	function handleSearch(event) {
		searchQuery = event.detail.query;
		console.log('Search Query: ', searchQuery);
		fetchData(currentPage);
	}

	function handleFeedTypeSelect(event){
		const { feed_id, feed_type } = event.detail;
		feedType = feed_type;
		console.log("Selected Feed Type:", feed_type);
		fetchData(currentPage);
	}

	function handlePrioritySelect(event) {
		priority = event.detail.feed_priority;
		console.log('Priority Info: ', priority);
		fetchData(currentPage);
	}

	// Determine the message and icon based on the current filters
	$: noFeedsMessage = '';
	$: noFeedsIcon = AlertCircle;

	$: if (feeds.length === 0) {
		if (searchQuery) {
			noFeedsMessage = "No feeds found. Maybe your search is too powerful!";
			noFeedsIcon = Search;
		} else if (feedType || priority) {
			noFeedsMessage = "No feeds match your filters. Try dialing them down a bit!";
			noFeedsIcon = Filter;
		} else {
			noFeedsMessage = "Oops! No feeds here... It's like trying to find a needle in a haystack, but without the needle.";
			noFeedsIcon = AlertCircle;
		}
	}
</script>

<!-- Layout -->
<div class="space-y-6">
	<Adminfeedstats {statistics} />

	<!-- Search & Filter Section -->
	<div class="rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
		<Label for="title" class="mb-4 block text-lg font-semibold text-gray-800 dark:text-gray-200">
			Search & Filter
		</Label>

		<!-- Adjusted Flexbox Layout -->
		<div class="search-container mt-4 flex flex-col gap-4 sm:flex-row">
			<!-- Search Input -->
			<div class="flex-1">
				<SearchInput on:search={handleSearch} />
			</div>

			<!-- Feed Priorities Combo Box -->
			<div class="w-full sm:w-[200px]">
				<Feedprioritiedcombobox on:select={handlePrioritySelect} />
			</div>

			<!-- Feeds Combo Box -->
			<div class="w-full sm:w-[200px]">
				<Feedtypecombobox on:select={handleFeedTypeSelect} />
			</div>
		</div>
	</div>

	<!-- Display feeds or 'No Feeds' message -->
	{#if feeds.length > 0}
		<Adminfeedscards {feeds} />
	{:else}
		<div class="text-center">
			<!-- Icon with Text based on the current state -->
			<svelte:component this={noFeedsIcon} class="mx-auto h-16 w-16 text-gray-600 dark:text-gray-300" />
			<h2 class="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
				{noFeedsMessage}
			</h2>
		</div>
	{/if}
	<Pagination {totalPages} {pageSize} {totalRecords} on:page-change={handlePageChange} />
</div>
