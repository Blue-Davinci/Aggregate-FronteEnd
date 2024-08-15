<script>
	import Metamanager from '$lib/components/layouts/metatags/metamanager.svelte';
	import { fly, slide, fade } from 'svelte/transition';
	import LandingNav from '$lib/components/layouts/Landing/landingnav.svelte';
	import Intro from '$lib/components/layouts/Landing/intro.svelte';
	import Productivity from '$lib/components/layouts/Landing/productivity.svelte';
	import Reviews from '$lib/components/layouts/Landing/reviews.svelte';
	import Footer from '$lib/components/layouts/Landing/footer.svelte';

	
	export let data;
	let pagemetadata = data?.props?.metadata ?? {};
	let pageInfo = {
		title: 'Home',
		message: 'Aggregate: Bringing all your news and updates together in one place.',
		icon: null
	};
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link
		href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&family=Raleway:wght@400;700&display=swap"
		rel="stylesheet"
	/>
	<link rel="stylesheet" href="/home.css" />
</svelte:head>
<Metamanager {pagemetadata} {pageInfo} />
<div in:fly={{ x: -200, duration: 1000 }} out:slide={{ duration: 400 }}><LandingNav /></div>

<div in:fly={{ x: 200, duration: 1000 }} out:fade>
	<div id="intro"><Intro /></div>
	<div id="productivity"><Productivity /></div>
	<div id="reviews"><Reviews /></div>
	<Footer />
</div>
