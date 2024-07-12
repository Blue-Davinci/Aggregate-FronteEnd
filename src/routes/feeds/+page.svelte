<script>
    import FeedsCard from '$lib/components/layouts/feedscard.svelte';
    import TopFeeds from '$lib/components/layouts/topfeeds.svelte';
    import PageHeader from '$lib/components/layouts/pageheader.svelte';
    import { fly, slide } from 'svelte/transition';
    import { LucideNewspaper} from 'lucide-svelte';

    export let data;
    let feed_follows = data.feeds;
    //console.log("Front End Data: ", feed_follows);
    let user = data.props.user;
    let pageInfo = { 
        title: 'Feeds', 
        message: 'Explore the latest feeds from the community.', 
        icon: LucideNewspaper 
    };
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
