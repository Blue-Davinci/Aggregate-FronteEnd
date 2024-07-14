<script>
	import DashboardNav from '$lib/components/layouts/dashboardnav.svelte';
	import PageHeader from '$lib/components/layouts/pageheader.svelte';
	import { fly, slide, fade } from 'svelte/transition';
	import {LayoutDashboard} from 'lucide-svelte';
	import PostsCard from '$lib/components/layouts/postscard.svelte';
	import FAB from '$lib/components/layouts/floatingactionbutton.svelte';

	export let data;
	export let form = undefined;

	let isLoading = false;
	let pageInfo = { 
        title: 'Aggregate Dashboard', 
		message: 'Your one-stop hub for aggregating, exploring, and interacting with the latest RSS feeds. Discover, like, favorite, share, and follow the content that matters most to you.',
        icon: LayoutDashboard 
    };
	//console.log('In Client side Data: ', data);
	$: posts = data.posts.followed_rss_posts;
	$: notifications = data.notifications.notifications;
	// controls the modal for the feed addition

</script>

<svelte:head>
	<title>Dashboard • Aggregate</title>
	<link rel="stylesheet" href="/auth.css" />
</svelte:head>
<PageHeader title={pageInfo.title} message={pageInfo.message} icon={pageInfo.icon} />

<DashboardNav  {notifications}/>


<div class="feeds-container" in:fly={{ x: 200, duration: 1000 }} out:fade>
	{#each posts as rsspost (rsspost.feed.id)}
		<PostsCard {rsspost} />
	{/each}
</div>

<FAB {form} {isLoading}/>
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
</style>
