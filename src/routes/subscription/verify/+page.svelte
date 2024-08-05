<script>
    import Metamanager from '$lib/components/layouts/metatags/metamanager.svelte';
    import Transactionsuccessful from '$lib/components/layouts/subscription/transactionsuccessful.svelte';
    import Transactionfailed from '$lib/components/layouts/subscription/transactionfailed.svelte';
    export let data;

    let pagemetadata = data?.props?.metadata ?? {};
    // Check if the transaction was successful
    const isSuccess = !data.error;
    let pageInfo = {
		title: 'Verify Subscription',
		message: 'Aggregate: Your one-stop shop for all the news and updates you did not know you needed!.',
		icon: null
	};
</script>

<svelte:head>
<link rel="stylesheet" href="/transaction.css">
</svelte:head>

<Metamanager {pagemetadata} {pageInfo} />

<div class="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
    <div class="max-w-lg mx-auto p-8 bg-white dark:bg-gray-800 shadow-2xl rounded-lg transform transition-transform duration-500 ease-in-out">
        {#if isSuccess}
            <Transactionsuccessful {data} />
        {:else}
            <Transactionfailed {data} />
        {/if}
    </div>
</div>

