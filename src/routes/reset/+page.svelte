<script>
    import Metamanager from '$lib/components/layouts/metatags/metamanager.svelte';
    import { fly, slide } from 'svelte/transition';
    import Passwordresetinitial from '$lib/components/layouts/auth/passwordresetinitial.svelte';
    
    export let form;
    export let data;

    let pagemetadata = data?.props?.metadata ?? {};
    let pageInfo = {
        title: 'Password Reset',
        message: 'Oops! Forgot your password? Let\'s get you back on track!',
        icon: null
    };
</script>
<svelte:head>
	<link rel="stylesheet" href="/loader.css" />
	<link rel="stylesheet" href="/auth.css" />
</svelte:head>

<Metamanager {pagemetadata} {pageInfo} />

<div in:fly={{ x: -200, duration: 1000 }} out:slide={{ duration: 600 }}>
    <Passwordresetinitial {form} />
</div>
