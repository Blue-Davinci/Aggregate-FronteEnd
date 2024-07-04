<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { setToast } from '$lib/utilities/utils.js';
	export let data;

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
	<title>Activation • Aggregate</title>
	<link rel="stylesheet" href="/loader.css" />
</svelte:head>
{#if isLoading}
<div class="saving-container">
    <span class="loader"></span>
    <span class="saving">Verifying Activation..</span>
</div>
{/if}