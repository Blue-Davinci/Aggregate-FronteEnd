<script>
	export let error;

	$: console.log("111-- Error: ", error);
</script>
<svelte:head>
<link rel="stylesheet" href="/auth.css" />
</svelte:head>
{#if error && error !== undefined}
	<ul class="error-list">
		{#if typeof error === 'string'}
			<li class="error-message">{error}</li>
		{:else}
			{#each Object.entries(error) as [key, value]}
				<li class="error-message">{value}</li>
			{/each}
		{/if}
	</ul>
{/if}
