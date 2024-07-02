<script>
	import DashboardNav from '$lib/components/layouts/dashboardnav.svelte';
    import { fly, slide } from 'svelte/transition';
	import  PostsCard from '$lib/components/layouts/postscard.svelte';
	export let data;
	$: posts = data.followed_rss_posts;
</script>

<div
in:fly={{ x: -200, duration: 1000 }} out:slide={{ duration: 600 }}
>
<DashboardNav />
<h1>
	<strong>Dashboard</strong>
</h1>
<p>This is a protected page. You can only access this page if you are logged in.</p>
</div>


<div class="feeds-container"
in:fly={{ x: -200, duration: 1000 }} out:slide={{ duration: 600 }}
>
    {#each posts as post (post.id)}
		<PostsCard {post} />
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