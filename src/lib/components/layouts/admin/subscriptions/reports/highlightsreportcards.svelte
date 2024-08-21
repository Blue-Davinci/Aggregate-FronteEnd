<script>
	import { DollarSign, Award, Users } from 'lucide-svelte';
    import { fly, fade } from 'svelte/transition';
	export let singleSubscriptionReport;
</script>

<div class="grid grid-cols-1 gap-6 md:grid-cols-3"
in:fly={{ x: -200, duration: 1000 }}
    out:fade
>
	<!-- Total Active Subscriptions Card -->
	<div
		class="transform rounded-lg bg-blue-500 p-4 text-white shadow-lg transition-transform hover:scale-105 hover:shadow-2xl dark:bg-blue-600"
	>
		<div class="flex items-center justify-between">
			<p class="font-mono text-3xl font-extrabold">
				{singleSubscriptionReport.total_active_subscriptions}
			</p>
			<Users class="h-10 w-10" />
		</div>
		<h3 class="mt-2 text-right text-sm font-medium">Total Active Subscriptions</h3>
	</div>

	<!-- Churn Rate Card -->
	<div
		class="transform rounded-lg bg-red-500 p-4 text-white shadow-lg transition-transform hover:scale-105 hover:shadow-2xl dark:bg-red-600"
	>
		<div class="flex items-center justify-between">
			<p class="font-mono text-3xl font-extrabold">{singleSubscriptionReport.churn_rate}%</p>
			<Award class="h-10 w-10" />
		</div>
		<h3 class="mt-2 text-right text-sm font-medium">Churn Rate</h3>
	</div>

	<!-- Average Revenue Per User Card -->
	<div
		class="transform rounded-lg bg-green-500 p-4 text-white shadow-lg transition-transform hover:scale-105 hover:shadow-2xl dark:bg-green-600"
	>
		<div class="flex items-center justify-between">
			<p class="font-mono text-3xl font-extrabold">
				{singleSubscriptionReport.average_revenue_per_user.toFixed(2)}
			</p>
			<DollarSign class="h-10 w-10" />
		</div>
		<h3 class="mt-2 text-right text-sm font-medium">Average Revenue Per User</h3>
	</div>
</div>
