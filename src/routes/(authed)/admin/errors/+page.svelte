<script>
	import Errorstatistics from '$lib/components/layouts/admin/errors/errorstatistics.svelte';
    import Scrapererrorcards from '$lib/components/layouts/cards/scrapererrorcards.svelte';
	export let data;
	export let form;
	let errorLogs = data?.error_logs ?? [];
	//console.log(errorLogs);

	// Event receiver to handle deletion of an error log
	async function handleErrorDeletion(event) {
        let log_id = event.detail;
		console.log(`Delete log with ID: ${log_id}`);
		errorLogs = errorLogs.filter((log) => log.id !== log_id);
	}

    // Event receiver to handle updating of an error log
    function handleUpdateLog(event) {
        const updatedLog = event.detail;
        errorLogs = errorLogs.map(log => (log.id === updatedLog.id ? updatedLog : log));
    }
</script>

<section class="container mx-auto p-4">
	<Errorstatistics {errorLogs} />
    <Scrapererrorcards {form} {errorLogs} on:errorLogDeleted={handleErrorDeletion} on:errorLogUpdated={handleUpdateLog} />
</section>
<style>
	.container {
		max-width: 1200px;
	}
</style>
