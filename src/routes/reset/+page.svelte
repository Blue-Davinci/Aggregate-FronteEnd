<script>
    import { fly, slide } from 'svelte/transition';
    import Passwordresetinitial from '$lib/components/layouts/passwordresetinitial.svelte';
    export let form;
</script>
<svelte:head>
	<title>Reset • Aggregate</title>
	<link rel="stylesheet" href="/loader.css" />
	<link rel="stylesheet" href="/auth.css" />
</svelte:head>
<div in:fly={{ x: -200, duration: 1000 }} out:slide={{ duration: 600 }}>
    <Passwordresetinitial {form} />
</div>
