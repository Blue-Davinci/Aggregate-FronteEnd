<script>
	import { fly, fade, slide } from 'svelte/transition';
	import {
		XCircle,
		EyeOff,
		CheckCircle,
		Clock,
		BarChart2,
		Gem
	} from 'lucide-svelte';
    export let statistics = {};
</script>

<div
		class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
		in:fly={{ x: -200, duration: 1000 }}
		out:fade={{ duration: 300 }}
	>
		<!-- Feed Statistics Label -->
		<div class="col-span-3">
			<p class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">Feed Statistics</p>
		</div>

		<!-- Total Pending Feeds Card -->
		<div
			class="transform rounded-lg bg-yellow-500 p-4 text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-yellow-600"
		>
			<div class="flex items-center justify-between">
				<p class="truncate font-mono text-3xl font-extrabold">
					{statistics.admin_pending_feed_stats.total_pending_feeds}
				</p>
				<Clock class="h-10 w-10" />
			</div>
			<h3 class="mt-2 text-right font-sans text-sm font-medium">Pending Feeds</h3>
		</div>

		<!-- Total Approved Feeds Card -->
		<div
			class="transform rounded-lg bg-green-500 p-4 text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-green-600"
		>
			<div class="flex items-center justify-between">
				<p class="truncate font-mono text-3xl font-extrabold">
					{statistics.admin_pending_feed_stats.total_approved_feeds}
				</p>
				<CheckCircle class="h-10 w-10" />
			</div>
			<h3 class="mt-2 text-right font-sans text-sm font-medium">Approved Feeds</h3>
		</div>

		<!-- Total Rejected Feeds Card -->
		<div
			class="transform rounded-lg bg-red-500 p-4 text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-red-600"
		>
			<div class="flex items-center justify-between">
				<p class="truncate font-mono text-3xl font-extrabold">
					{statistics.admin_pending_feed_stats.total_rejected_feeds}
				</p>
				<XCircle class="h-10 w-10" />
			</div>
			<h3 class="mt-2 text-right font-sans text-sm font-medium">Rejected Feeds</h3>
		</div>

		<!-- Total Hidden Feeds Card -->
		<div
			class="transform rounded-lg bg-gray-500 p-4 text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-gray-600"
		>
			<div class="flex items-center justify-between">
				<p class="truncate font-mono text-3xl font-extrabold">{statistics.total_hidden_feeds}</p>
				<EyeOff class="h-10 w-10" />
			</div>
			<h3 class="mt-2 text-right font-sans text-sm font-medium">Hidden Feeds</h3>
		</div>

		<!-- Most Common Feed Type Card -->
		<div
			class="transform rounded-lg bg-blue-500 p-4 text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-blue-600"
		>
			<div class="flex items-center justify-between">
				<p class="truncate font-mono text-3xl font-extrabold">{statistics.most_common_feed_type}</p>
				<BarChart2 class="h-10 w-10" />
			</div>
			<h3 class="mt-2 text-right font-sans text-sm font-medium">Most Common Feed Type</h3>
		</div>

		<!-- High Priority Feeds Count-->
		<div
			class="transform rounded-lg bg-purple-500 p-4 text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-purple-600"
		>
			<div class="flex items-center justify-between">
				<p class="truncate font-mono text-3xl font-extrabold">
					{statistics.total_records_with_high_priority}
				</p>
				<Gem class="h-10 w-10" />
			</div>
			<h3 class="mt-2 text-right font-sans text-sm font-medium">High Priority Feed Count</h3>
		</div>
	</div>