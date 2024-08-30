<script>
	import { FilePlus, CheckCircle, XCircle } from 'lucide-svelte';
	import { fly, fade } from 'svelte/transition';
	export let creation_statistics;
</script>

<div
	class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
	in:fly={{ x: -200, duration: 1000 }}
	out:fade={{ duration: 300 }}
>
	<!-- Feed Statistics Label -->
	<div class="col-span-4">
		<p class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
			Feed Creation Statistics
		</p>
	</div>

	<!-- Total Feeds Created Card -->
	<div
		class="transform rounded-lg bg-green-500 p-6 text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-green-600"
	>
		<div class="flex items-center justify-between">
			<p class="truncate font-mono text-4xl font-extrabold">
				{creation_statistics.total_feeds_created}
			</p>
			<FilePlus class="h-12 w-12" />
		</div>
		<h3 class="mt-3 text-right font-sans text-lg font-medium">Total Feeds Created</h3>
	</div>

	<!-- Total Feeds Approved Card -->
	<div
		class="transform rounded-lg bg-blue-500 p-6 text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-blue-600"
	>
		<div class="flex items-center justify-between">
			<p class="truncate font-mono text-4xl font-extrabold">
				{creation_statistics.total_feeds_approved}
			</p>
			<CheckCircle class="h-12 w-12" />
		</div>
		<h3 class="mt-3 text-right font-sans text-lg font-medium">Total Feeds Approved</h3>
	</div>

	<!-- Total Feeds Rejected Card -->
	<div
		class="transform rounded-lg bg-red-500 p-6 text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-red-600"
	>
		<div class="flex items-center justify-between">
			<p class="truncate font-mono text-4xl font-extrabold">
				{creation_statistics.total_feeds_rejected}
			</p>
			<XCircle class="h-12 w-12" />
		</div>
		<h3 class="mt-3 text-right font-sans text-lg font-medium">Total Feeds Rejected</h3>
	</div>
</div>
