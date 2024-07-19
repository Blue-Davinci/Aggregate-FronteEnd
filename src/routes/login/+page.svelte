<script>
	import { fly, slide } from 'svelte/transition';
	import Login from '$lib/components/layouts/auth/login.svelte';
	// export form to catch any issues surrounding action errors
	export let form;
</script>
<svelte:head>
	<title>Login • Aggregate</title>
	<link rel="stylesheet" href="/loader.css" />
	<link rel="stylesheet" href="/auth.css" />
</svelte:head>

<div in:fly={{ x: -200, duration: 1000 }} out:slide={{ duration: 600 }}>
	<Login {form} />
</div>
