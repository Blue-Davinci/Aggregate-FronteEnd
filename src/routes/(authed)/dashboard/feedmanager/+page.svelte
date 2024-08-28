<script>
    import GoBack from '$lib/components/layouts/general/goback.svelte';
	import { FolderKanban, Squirrel } from 'lucide-svelte';
    import PageHeader from '$lib/components/layouts/general/pageheader.svelte';
	import { fly, slide } from 'svelte/transition';
	import FeedManagerCard from '$lib/components/layouts/feedsmanager/feedmanagercard.svelte';

    // data for the feeds after load and form for any issues with the update action
	export let data;
	export let form;
    //page details for the header
    let pageInfo = {
		title: 'Feed Manager',
		message:
			'Welcome to your Feed Manager: the ultimate control center for all your feeds.',
		icon: FolderKanban
	};

    $: feeds = data?.feeds || [];
	//$:console.log('>> Created Feed Data: ', feeds[0]);
</script>
<svelte:head>
	<title>Feed Manager • Aggregate</title>
</svelte:head>

<GoBack />
<div class="mt-4 mb-2">
<PageHeader title={pageInfo.title} message={pageInfo.message} icon={pageInfo.icon} />
</div>

{#if Object.keys(feeds).length === 0}
<div class="flex h-screen items-center justify-center">
    <div class="text-center">
    <Squirrel class="w-24 h-24 mx-auto" />
    <p class="text-center text-gray-600 dark:text-gray-400">No feeds found. Please add a feed to get started.</p>
    </div>
</div>
{:else}
{#each feeds as { feed, follow_count, rejected_feed, approval_status }}
	<FeedManagerCard {form} {feed} {follow_count} {rejected_feed} {approval_status}/>
    <hr />
{/each}
{/if}
