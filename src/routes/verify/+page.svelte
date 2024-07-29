<script>
	import Metamanager from '$lib/components/layouts/metatags/metamanager.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { setToast } from '$lib/utilities/utils.js';
	export let data;

	let pagemetadata = data?.props?.metadata ?? {};
    let pageInfo = {
        title: 'Account Activation',
        message: 'Welcome aboard! Activate your account and let the fun begin!',
        icon: null
    };

	let user;
    let isLoading= true;
	onMount(() => {
		if (data.user) {
			user = data.user.name;
			console.log('Verification: ', data);
			setToast(true, `You have succesfully Activated your account, ${user}.`, 3000);
			goto('/login');
		}
        isLoading = false;
	});
</script>
<svelte:head>
	<link rel="stylesheet" href="/loader.css" />
</svelte:head>

<Metamanager {pagemetadata} {pageInfo} />

{#if isLoading}
<div class="saving-container">
    <span class="loader"></span>
    <span class="saving">Verifying Activation..</span>
</div>
{/if}