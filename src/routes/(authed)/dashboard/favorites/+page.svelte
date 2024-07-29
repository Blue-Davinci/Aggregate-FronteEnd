<script>
	import Metamanager from '$lib/components/layouts/metatags/metamanager.svelte';
    import { fly, slide, fade } from 'svelte/transition';
    import {Undo2} from 'lucide-svelte';
	import PostsCard from '$lib/components/layouts/cards/postscard.svelte';
    import Carousel from '$lib/components/layouts/general/carousel.svelte';
	export let data;
	
	let pagemetadata = data?.props?.metadata ?? {};
    let pageInfo = {
        title: 'Favorite Posts',
        message: 'Your curated collection of awesomeness! Enjoy your favorite posts all in one place.',
        icon: null
    };

	let posts = data.favorite_rss_posts;
	//console.log("Post client: ", posts);
    // set the isfavorite field to true,
    // so that the favorite button will be displayed as filled
</script>

<Metamanager {pagemetadata} {pageInfo} />

<a href="/dashboard" class="mt-10 flex items-center text-white bg-blue-500 hover:bg-blue-700 transition-colors duration-300 px-4 py-2 rounded-md">
    <Undo2 class="mr-2 h-5 w-5" />
    <span class="font-medium">Go Back</span>
</a>

<div class="w-full" in:fly={{ x: -200, duration: 1000 }} out:fade>
    <Carousel {posts} />
</div>
<div class="feeds-container" in:fly={{ x: 200, duration: 1000 }} out:fade>
	{#each posts as rsspost (rsspost.feed.id)}
		<PostsCard {rsspost} isFromFavorite={true}/>
	{/each}
</div>

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