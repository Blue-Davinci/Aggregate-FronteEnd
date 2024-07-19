<script>
    import { fly, slide } from 'svelte/transition';
    import SignUp from '$lib/components/layouts/auth/signup.svelte';

    export let form;
</script>

<svelte:head>
	<title>SignUp • Aggregate</title>
	<link rel="stylesheet" href="/loader.css" />
	<link rel="stylesheet" href="/auth.css" />
</svelte:head>

<div in:fly={{ x: -200, duration: 1000 }} out:slide={{ duration: 600 }}>
	<SignUp {form} />
</div>