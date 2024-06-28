<script>
import FeedsCard from "$lib/components/layouts/feedscard.svelte";
import { fly, slide } from 'svelte/transition';
export let data;
let feeds = data.feeds;
</script>
<p>
    In Feeds
</p>
<div class="feeds-container"
in:fly={{ x: -200, duration: 1000 }} out:slide={{ duration: 600 }}
>
    {#each feeds as feed (feed.id)}
        <FeedsCard {feed}/>
    {/each}
</div>

<style>
    .feeds-container {
        display: flex;
        flex-direction: row; /* Explicitly set the flex direction */
        flex-wrap: wrap;
        gap: 10px; /* Adjust based on your design */
        justify-content: flex-start; /* Centers the cards in the container */
        align-items: flex-start; /* Align items at the start of the container */
        align-content: flex-start;
    }
</style>