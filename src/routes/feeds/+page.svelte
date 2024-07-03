<script>
    import FeedsCard from "$lib/components/layouts/feedscard.svelte";
    import { fly, slide, fade } from 'svelte/transition';

    export let data;
    let feeds = data.feeds;
</script>

<p>In Feeds</p>

<div class="feeds-container"
    in:fly={{ y: 200, duration: 1000 }}
    out:slide={{ duration: 600 }}
>
    {#each feeds as feed (feed.id)}
        <FeedsCard {feed}/> <!-- Set width to 1/2 for 2 per row -->
    {/each}
</div>

<style>
    .feeds-container {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(2, 1fr); /* Two columns per row */
        gap: 2rem; /* Adjust based on your design */
        justify-items: center; /* Center items horizontally */
    }
</style>
