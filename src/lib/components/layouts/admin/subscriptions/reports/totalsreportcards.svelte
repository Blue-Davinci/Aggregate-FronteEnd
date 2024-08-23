<script>
	import { fly, fade } from 'svelte/transition';
	import { DollarSign, Users, CreditCard } from 'lucide-svelte';
	export let singleSubscriptionReport;
</script>

<div class="grid grid-cols-1 gap-6 md:grid-cols-3"
in:fly={{ x: 200, duration: 1000 }}
    out:fade
>
	<!-- Total Revenue Card -->
	<div
		class="transform rounded-lg bg-purple-500 p-4 text-white shadow-lg transition-transform hover:scale-105 hover:shadow-2xl dark:bg-purple-600"
	>
		<div class="flex items-center justify-between">
			<p class="font-mono text-3xl font-extrabold">{new Intl.NumberFormat().format(singleSubscriptionReport.total_revenue)}</p>
			<DollarSign class="h-10 w-10" />
		</div>
		<h3 class="mt-2 text-right text-sm font-medium">Total Revenue</h3>
	</div>

	<!-- Most Popular Payment Method Card -->
	<div
		class="transform rounded-lg bg-teal-500 p-4 text-white shadow-lg transition-transform hover:scale-105 hover:shadow-2xl dark:bg-teal-600"
	>
		<div class="flex items-center justify-between">
			<p class="font-mono text-3xl font-extrabold">
				{singleSubscriptionReport.most_popular_payment_method}
			</p>
			<CreditCard class="h-10 w-10" />
		</div>
		<h3 class="mt-2 text-right text-sm font-medium">Most Popular Payment Method</h3>
	</div>

	<!-- Most Subscribed Plan Card -->
	<div
		class="transform rounded-lg bg-indigo-500 p-4 text-white shadow-lg transition-transform hover:scale-105 hover:shadow-2xl dark:bg-indigo-600"
	>
		<div class="flex items-center justify-between">
			<p class="font-mono text-3xl font-extrabold">
				{singleSubscriptionReport.most_subscribed_plan}
			</p>
			<Users class="h-10 w-10" />
		</div>
		<h3 class="mt-2 text-right text-sm font-medium">Most Subscribed Plan</h3>
	</div>
</div>
