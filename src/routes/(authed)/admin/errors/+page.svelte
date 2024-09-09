<script>
	import Pagination from '$lib/components/layouts/general/pagination.svelte';
	import Errortypescombobox from '$lib/components/layouts/search-options/errortypescombobox.svelte';
	import Errorstatistics from '$lib/components/layouts/admin/errors/errorstatistics.svelte';
	import Scrapererrorcards from '$lib/components/layouts/cards/scrapererrorcards.svelte';
	import { Label } from '$lib/components/ui/label';
	export let data;
	export let form;
	let errorLogs = data?.error_logs ?? [];
	let metadata = data?.metadata ?? {};

	// Page details
	let currentPage = metadata.current_page ?? 1;
	let pageSize = metadata.page_size ?? 1;
	let totalRecords = metadata.total_records ?? 1;
	let totalPages = Math.ceil(totalRecords / pageSize);
	//console.log(errorLogs);
	function handlePageChange(event) {
		currentPage = event.detail.page;
		console.log('Current Page: ', currentPage);
		//fetchData(currentPage, '');
	}

	// Event receiver to handle deletion of an error log
	async function handleErrorDeletion(event) {
		let log_id = event.detail;
		console.log(`Delete log with ID: ${log_id}`);
		errorLogs = errorLogs.filter((log) => log.id !== log_id);
	}

	// Event receiver to handle updating of an error log
	function handleUpdateLog(event) {
		const updatedLog = event.detail;
		errorLogs = errorLogs.map((log) => (log.id === updatedLog.id ? updatedLog : log));
	}
</script>

<section class="container mx-auto p-4">
	<Errorstatistics {errorLogs} />
	<!-- Search & Filter Section -->
	<div class="rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
		<Label for="title" class="mb-4 block text-lg font-semibold text-gray-800 dark:text-gray-200">
			Search & Filter
		</Label>
		<div class="search-container mt-4 flex flex-col gap-4 sm:flex-row">
			<div class="w-full">
				<Errortypescombobox {form} />
			</div>
		</div>
	</div>
	<Scrapererrorcards
		{form}
		{errorLogs}
		on:errorLogDeleted={handleErrorDeletion}
		on:errorLogUpdated={handleUpdateLog}
	/>
	<Pagination {totalPages} {pageSize} {totalRecords} on:page-change={handlePageChange} />
</section>

<style>
	.container {
		max-width: 1200px;
	}
</style>
