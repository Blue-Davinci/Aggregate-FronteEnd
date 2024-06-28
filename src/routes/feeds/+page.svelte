<script>
import FeedsCard from "$lib/components/layouts/feedscard.svelte";
import { fly, slide } from 'svelte/transition';
let feed = {
		id: '0',
		title: 'Wags Lane',
		lastupdated: '2021-10-01',
		url: 'https://www.themoviedb.org/t/p/original/svYyAWAH3RThMmHcCaJZ97jnTtT.jpg',
		name: 'sample feed',
		description: `
		I am a feed with info and stuff with buttons and crazy
		things that you can click on and do stuff with. I am a feed
		with info and stuff with buttons and crazy things that you
		I am a feed
		with info and stuff with buttons and crazy things that you
		`
	};
    let feed1 = {
		id: '1',
		title: 'Docktor Lane',
		lastupdated: '2021-10-01',
		url: 'https://www.themoviedb.org/t/p/original/svYyAWAH3RThMmHcCaJZ97jnTtT.jpg',
		name: 'sample feed',
		description: `
		I am a feed with info and stuff with buttons and crazy
		things that you can click on and do stuff with. I am a feed
		with info and stuff with buttons and crazy things that you
		I am a feed
		with info and stuff with buttons and crazy things that you
		`
	};
    let feed2 = {
		id: '12',
		title: 'Toddler Lane',
		lastupdated: '2021-10-01',
		url: 'https://www.themoviedb.org/t/p/original/svYyAWAH3RThMmHcCaJZ97jnTtT.jpg',
		name: 'sample feed',
		description: `
		I am a feed with info and stuff with buttons and crazy
		things that you can click on and do stuff with. I am a feed
		with info and stuff with buttons and crazy things that you
		I am a feed
		with info and stuff with buttons and crazy things that you
		`
	};
    let feed3 = {
		id: '123',
		title: 'Mans Lane',
		lastupdated: '2021-10-01',
		url: 'https://www.themoviedb.org/t/p/original/svYyAWAH3RThMmHcCaJZ97jnTtT.jpg',
		name: 'sample feed',
		description: `
		I am a feed with info and stuff with buttons and crazy
		things that you can click on and do stuff with. I am a feed
		with info and stuff with buttons and crazy things that you
		I am a feed
		with info and stuff with buttons and crazy things that you
		`
	};

    let feeds = [feed, feed1, feed2, feed3];
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