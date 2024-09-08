<script>
	import { AlertTriangle, Server, Globe } from 'lucide-svelte';
	import { fly, fade } from 'svelte/transition';
	
	export let errorLogs = [];
	// Calculate the statistics
	let mostCommonErrorType = '';
	let mostFrequentErrorStatus = '';
	let mostProblematicUrl = '';

	// Helper function to get the most frequent item in an array
	function getMostFrequent(arr) {
		return arr.reduce((acc, item) => {
			acc[item] = (acc[item] || 0) + 1;
			return acc;
		}, {});
	}

	// Process the data to calculate the stats
	$: if (errorLogs.length > 0) {
		const errorTypeFrequency = getMostFrequent(errorLogs.map((log) => log.error_type));
		mostCommonErrorType = Object.keys(errorTypeFrequency).reduce((a, b) =>
			errorTypeFrequency[a] > errorTypeFrequency[b] ? a : b
		);

		const statusCodeFrequency = getMostFrequent(errorLogs.map((log) => log.status_code));
		mostFrequentErrorStatus = Object.keys(statusCodeFrequency).reduce((a, b) =>
			statusCodeFrequency[a] > statusCodeFrequency[b] ? a : b
		);

		mostProblematicUrl = errorLogs.reduce((prev, current) =>
			prev.occurence_count > current.occurence_count ? prev : current
		).feed_details.feed_url;
	} else {
		mostCommonErrorType = 'N/A';
		mostFrequentErrorStatus = 'N/A';
		mostProblematicUrl = 'N/A';
	}
</script>

<!-- Statistics Cards -->
<div class="mb-4 grid grid-cols-1 gap-6 md:grid-cols-3"
	in:fly={{ x: 200, duration: 1000 }}
	out:fade
>
	<div
		class="transform rounded-lg bg-yellow-500 p-4 text-white shadow-lg transition-transform hover:scale-105 hover:shadow-2xl dark:bg-yellow-600"
	>
		<div class="flex items-center justify-between">
			<p class="truncate font-mono text-2x1 font-extrabold">{mostCommonErrorType}</p>
			<AlertTriangle class="h-10 w-10" />
		</div>
		<h3 class="mt-2 text-right text-sm font-medium">Most Common Error Type</h3>
	</div>

	<div
		class="transform rounded-lg bg-purple-500 p-4 text-white shadow-lg transition-transform hover:scale-105 hover:shadow-2xl dark:bg-purple-600"
	>
		<div class="flex items-center justify-between">
			<p class="font-mono text-2xl font-extrabold">{mostFrequentErrorStatus}</p>
			<Server class="h-10 w-10" />
		</div>
		<h3 class="mt-2 text-right text-sm font-medium">Most Frequent Error Status</h3>
	</div>

	<div
		class="transform rounded-lg bg-red-500 p-4 text-white shadow-lg transition-transform hover:scale-105 hover:shadow-2xl dark:bg-red-600"
	>
		<div class="flex items-center justify-between">
			<p class="truncate font-mono text-sm font-extrabold">{mostProblematicUrl}</p>
			<Globe class="h-10 w-10" />
		</div>
		<h3 class="mt-2 text-right text-sm font-medium">Most Problematic URL</h3>
	</div>
</div>
