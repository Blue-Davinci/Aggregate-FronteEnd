<script>
	import Metamanager from '$lib/components/layouts/metatags/metamanager.svelte';
	import { fly, slide } from 'svelte/transition';
	import Login from '$lib/components/layouts/auth/login.svelte';
	// export form to catch any issues surrounding action errors
	export let form;
	export let data;

	let pagemetadata = data?.props?.metadata ?? {};
	let pageInfo = {
		title: 'Login',
		message: 'Unlock the door to your community! The latest feeds are just a login away.',
		icon: null
	};
</script>
<svelte:head>
	<link rel="stylesheet" href="/loader.css" />
	<link rel="stylesheet" href="/auth.css" />
</svelte:head>

<Metamanager {pagemetadata} {pageInfo} />

<div in:fly={{ x: -200, duration: 1000 }} out:slide={{ duration: 600 }}>
	<Login {form} />
</div>
