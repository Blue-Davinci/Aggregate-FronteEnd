<script>
	import { fly, slide } from 'svelte/transition';
	import Login from '$lib/components/layouts/login.svelte';
</script>

<div in:fly={{ x: -200, duration: 1000 }} out:slide={{ duration: 600 }}>
	<Login />
</div>
