<script>
    import DashboardNav from '$lib/components/layouts/dashboardnav.svelte';
    import { Bird, Squirrel } from 'lucide-svelte';
    import PageHeader from '$lib/components/layouts/pageheader.svelte';
    import Pagination from '$lib/components/layouts/pagination.svelte';
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

    // This acts as our event reciever for a page change from the
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
    <div class="flex flex-row flex-wrap gap-2 justify-start items-start align-content-start" in:fly={{ x: 200, duration: 1000 }} out:fade>
        {#each posts as rsspost (rsspost.feed.id)}
            <PostsCard {rsspost} />
        {/each}
    </div>
{:else}
    <div class="flex flex-col items-center justify-center h-full text-center">
        {#if searchQuery !== ''}
            <Bird />
            <p class="mt-2 text-lg text-gray-600">No items found for your search. Try a different keyword!</p>
        {:else}
            <Squirrel />
            <p class="mt-2 text-lg text-gray-600">
                No posts here! Looks like your feed is on a diet. Head over to the <a href="/feeds" class="text-blue-500">Feeds</a> and follow some feeds to fatten it up!
            </p>
        {/if}
    </div>
{/if}

<FAB {form} {isLoading} />

<Pagination {totalPages} {pageSize} {totalRecords} on:page-change={handlePageChange} />

<style>
</style>
