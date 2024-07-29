<script>
	import Metamanager from '$lib/components/layouts/metatags/metamanager.svelte';
    import { fly, slide } from 'svelte/transition';
    import SignUp from '$lib/components/layouts/auth/signup.svelte';

    export let form;
	export let data;

	let pagemetadata = data?.props?.metadata ?? {};
	let pageInfo = {
		title: 'Signup',
		message: 'Join the fun! Sign up now and never miss out on the latest feed buzz.',
		icon: null
	};
</script>

<svelte:head>
	<link rel="stylesheet" href="/loader.css" />
	<link rel="stylesheet" href="/auth.css" />
</svelte:head>

<Metamanager {pagemetadata} {pageInfo} />

<div in:fly={{ x: -200, duration: 1000 }} out:slide={{ duration: 600 }}>
	<SignUp {form} />
</div>