<script>
	import DashboardNav from '$lib/components/layouts/dashboardnav.svelte';
	import { Bird, Squirrel } from 'lucide-svelte';
	import PageHeader from '$lib/components/layouts/pageheader.svelte';
	import { fly, slide, fade } from 'svelte/transition';
	import { LayoutDashboard } from 'lucide-svelte';
	import PostsCard from '$lib/components/layouts/postscard.svelte';
	import FAB from '$lib/components/layouts/floatingactionbutton.svelte';
	import { getFollowedPostsDataService } from '$lib/dataservice/getFollowedPostsDataService.js';
	import SearchInput from '$lib/components/layouts/searchinput.svelte';

	export let data;
	export let form = undefined;
	// Search query:
	let searchQuery = '';
	// Page details
	let currentPage = data.posts.metadata.current_page;
	let pageSize = data.posts.metadata.page_size;
	let totalRecords = data.posts.metadata.total_records;
	let totalPages = Math.ceil(totalRecords / pageSize);
	// loading
	let isLoading = false;
	let pageInfo = {
		title: 'Aggregate Dashboard',
		message:
			'Your one-stop hub for aggregating, exploring, and interacting with the latest RSS feeds. Discover, like, favorite, share, and follow the content that matters most to you.',
		icon: LayoutDashboard
	};
	//console.log('In Client side Data: ', data);
	$: posts = data?.posts.followed_rss_posts || [];
	$: notifications = data.notifications?.notifications ?? {};
	// controls the modal for the feed addition
	async function fetchData(page) {
		//console.log('Page: ', page, 'Search Term: ', searchQuery);
		let notificationsCopy = notifications ?? {};
		let response = await getFollowedPostsDataService({}, page, pageSize, searchQuery);
		// We do this to standadize the data as recieved from the server
		// during (page.server.js) load.
		data = {
			posts: response.data,
			notifications: notificationsCopy
		};
	}

	function handleSearch(event) {
		searchQuery = event.detail.query;
		// console.log('Search Query: ', searchQuery);
		fetchData(currentPage, searchQuery);
	}
</script>

<svelte:head>
	<title>Dashboard • Aggregate</title>
	<link rel="stylesheet" href="/auth.css" />
</svelte:head>
<PageHeader title={pageInfo.title} message={pageInfo.message} icon={pageInfo.icon} />

<DashboardNav {notifications} />

<div class="search-container mt-5">
	<SearchInput on:search={handleSearch} />
</div>

{#if posts.length > 0}
	<div class="feeds-container" in:fly={{ x: 200, duration: 1000 }} out:fade>
		{#each posts as rsspost (rsspost.feed.id)}
			<PostsCard {rsspost} />
		{/each}
	</div>
{:else}
	<div class="no-results-container">
		{#if searchQuery !== ''}
			<Bird />
			<p>No items found for your search. Try a different keyword!</p>
		{:else}
			<Squirrel />
			<p>
				No posts here! Looks like your feed is on a diet. Head over to the <a href='/feeds'>Feeds</a> and follow some feeds to fatten it up!
			</p>
		{/if}
	</div>
{/if}

<FAB {form} {isLoading} />

<style>
	.feeds-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 10px;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;
	}
	.no-results-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		text-align: center;
	}
	.no-results-container p {
		margin-top: 10px;
		font-size: 1.2em;
		color: #666;
	}
</style>
