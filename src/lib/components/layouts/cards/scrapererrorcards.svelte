<script>
	import {Separator} from '$lib/components/ui/separator'
	import { setToast } from '$lib/utilities/utils';
	import { createEventDispatcher } from 'svelte';
	import Resolve from '$lib/components/layouts/admin/errors/resolve.svelte';
	import { deleteScraperErrorLog } from '$lib/dataservice/admin/errorsDataService.js';
	import { Trash2, Cat } from 'lucide-svelte';
	export let form;
	export let errorLogs = [];

	const dispatch = createEventDispatcher();

	// Function to handle deletion of an error log
	async function deleteLog(logId) {
		console.log(`Delete log with ID: ${logId}`);
		const response = await deleteScraperErrorLog(logId);
		if (response.success) {
			// Remove the log from the UI
			dispatch('errorLogDeleted', logId);
			//errorLogs = errorLogs.filter((log) => log.id !== logId);
			setToast(true, 'Success! Error log has been deleted.', 2000);
		} else {
			setToast(false, 'Error! Error log could not be deleted.', 2000);
			console.log(response);
		}
	}

	function handleUpdateLog(log) {
		const updatedLog = log.detail;
		dispatch('errorLogUpdated', updatedLog);
		//errorLogs = errorLogs.map((log) => (log.id === updatedLog.id ? updatedLog : log));
	}

	// Function to handle managing a feed
	function manageFeed(feedId) {
		console.log(`Manage feed with ID: ${feedId}`);
	}
</script>

<h1 class="mb-4 text-2xl font-semibold">Scraper Error Logs</h1>

{#if errorLogs.length > 0}
	<div class="grid grid-cols-1 gap-4" >
		{#each errorLogs as log}
			<div
				class="rounded-lg bg-white p-6 shadow dark:bg-gray-800 transition-transform duration-300 hover:scale-[1.02]"
			>
				<div class="mb-4 flex items-center justify-between">
					<div>
						<h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
							Error Type: {log.error_type}
						</h2>
						<p class="text-sm text-gray-500 dark:text-gray-400">
							Occurred At: {new Date(log.occurred_at).toLocaleString()}
						</p>
					</div>
					<span
						class="rounded-full px-3 py-1 text-sm font-medium {log.resolved
							? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
							: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}"
					>
						{log.resolved ? 'Resolved' : 'Unresolved'}
					</span>
				</div>

				<p class="mb-2 text-gray-600 dark:text-gray-300 bg-green-50 dark:bg-green-900 p-2 rounded-lg">
					Message: {log.message}
				</p>
				

				<div class="mb-4 flex items-center space-x-4">
					<img
						src={log.feed_details.feed_img}
						alt={log.feed_details.feed_name}
						class="h-16 w-16 rounded-lg object-cover shadow-md"
					/>

					<div class="flex-1">
						<p class="text-gray-500 dark:text-gray-400">
							<strong>Feed:</strong>
							{log.feed_details.feed_name}
						</p>
						<p class="text-gray-500 dark:text-gray-400">
							<strong>URL:</strong>
							<a
								href={log.feed_details.feed_url}
								class="text-blue-600 hover:underline"
								target="_blank">{log.feed_details.feed_url}</a
							>
						</p>
					</div>

					<a
						href={`/feeds/${log.feed_id}`}
						target="_blank"
						class="ml-4 rounded-lg bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300"
					>
						View Feed
					</a>
				</div>

				<div class="flex items-center justify-between">
					<div class="text-gray-500 dark:text-gray-400">
						<p><strong>Status Code:</strong> {log.status_code}</p>
						<p><strong>Retry Attempts:</strong> {log.retry_attempts}</p>
					</div>

					<div class="mb-2 text-right text-gray-500 dark:text-gray-400">
						<p>
							<strong>Last Occurrence:</strong>
							{new Date(log.last_occurrence).toLocaleString()}
						</p>
						<p><strong>Tried to fetch </strong> {log.occurence_count} time(s)</p>
					</div>
				</div>
				<Separator class="border-t-1 border-gray-300 dark:border-gray-500" />

				<div class="mt-2 flex justify-end space-x-4">
					<!-- Manage Feed Button -->
					<button
						on:click={() => manageFeed(log.feed_id)}
						class="transform text-sm font-semibold text-blue-500 transition-transform hover:text-blue-600 active:scale-95"
					>
						Manage Feed
					</button>

					<!-- Mark as Resolved Button -->
					{#if !log.resolved}
						<Resolve {form} ID={log.id} on:errorLogUpdate={handleUpdateLog} />
					{/if}

					<!-- Delete Button -->
					<button
						on:click={() => deleteLog(log.id)}
						class="transform text-red-500 transition-transform duration-150 ease-in-out hover:scale-105 hover:text-red-600 active:scale-110"
					>
						<Trash2 class="h-5 w-5" />
					</button>
				</div>
			</div>
		{/each}
	</div>
{:else}
	<div
		class="flex min-h-[300px] flex-col items-center justify-center py-10 text-gray-600 dark:text-gray-300"
	>
		<Cat class="mb-4 h-16 w-16" />
		<p class="text-lg font-semibold">Yippee! No error logs found.</p>
		<p class="text-sm">It looks like the scraper is purring along smoothly with no issues!</p>
	</div>
{/if}
