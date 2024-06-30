<script>
	import DashboardNav from '$lib/components/layouts/dashboardnav.svelte';
    import { fly, slide } from 'svelte/transition';
</script>

<div
in:fly={{ x: -200, duration: 1000 }} out:slide={{ duration: 600 }}
>
<DashboardNav />
<h1>
	<strong>Dashboard</strong>
</h1>
<p>This is a protected page. You can only access this page if you are logged in.</p>
</div>
