<script>
    import {setToast} from '$lib/utilities/utils.js'
	import { onMount } from 'svelte';
    import {goto} from '$app/navigation';
	import PasswordResetForm from '$lib/components/layouts/auth/passwordresetform.svelte';
    export let form;
	export let data;
	let isLoading = true;
	onMount(() => {
		isLoading = false;
	});
    $: if (data && data?.error){
        onMount(redirect);
    }
    // if we are loaded and we have an error then we redirect user to login page
    // with a toast
    function redirect(){
        setToast(false, "Something happened and we could not verify your reset request", 4000);
        console.log("Wrong stuff")
        goto('/login');
    }
</script>

<svelte:head>
	<title>Password Update • Groovy</title>
	<link rel="stylesheet" href="/auth.css" />
	<link rel="stylesheet" href="/loader.css" />
</svelte:head>
<div>
	{#if data && !data?.error}
		<PasswordResetForm {form} {data} />
	{/if}
	{#if isLoading}
		<div class="saving-container">
			<span class="loader"></span>
			<span class="saving">Checking..</span>
		</div>
	{/if}
</div>
