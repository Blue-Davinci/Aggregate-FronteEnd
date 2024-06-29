<script>
	export let error;
</script>

{#if error}
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
