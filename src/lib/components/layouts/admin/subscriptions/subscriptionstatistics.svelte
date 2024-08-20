<script>
	import { DollarSign, Award, Users, CreditCard } from 'lucide-svelte';

    export let totalAmountReceived;
    export let bestSubscriber;
    export let mostSubscribedPlanName;
    export let mostUsedPaymentMethod;
</script>

<div class="my-6 grid grid-cols-1 gap-4 md:grid-cols-4">
	<!-- Total Revenue Card -->
	<div
		class="transform rounded-lg bg-blue-500 p-4 text-white shadow-lg transition-transform hover:scale-105 hover:shadow-2xl dark:bg-blue-600"
	>
		<div class="flex items-center justify-between">
			<p class="font-mono text-3xl font-extrabold">{totalAmountReceived} KES</p>
			<DollarSign class="h-10 w-10" />
		</div>
		<h3 class="mt-2 text-right text-sm font-medium">Total Revenue</h3>
	</div>

	<!-- Best Subscriber Card -->
	<div
		class="transform rounded-lg bg-green-500 p-4 text-white shadow-lg transition-transform hover:scale-105 hover:shadow-2xl dark:bg-green-600"
	>
		<div class="flex items-center justify-between">
			<p class="font-mono text-3xl font-extrabold">
				User ID: {bestSubscriber.payment_history.subscription.user_id}
			</p>
			<Award class="h-10 w-10" />
		</div>
		<h3 class="mt-2 text-right text-sm font-medium">Best Subscriber</h3>
	</div>

	<!-- Most Subscribed Plan Card -->
	<div
		class="transform rounded-lg bg-purple-500 p-4 text-white shadow-lg transition-transform hover:scale-105 hover:shadow-2xl dark:bg-purple-600"
	>
		<div class="flex items-center justify-between">
			<p class="font-mono text-3xl font-extrabold">{mostSubscribedPlanName}</p>
			<Users class="h-10 w-10" />
		</div>
		<h3 class="mt-2 text-right text-sm font-medium">Most Subscribed Plan</h3>
	</div>

	<!-- Most Used Payment Method Card -->
	<div
		class="transform rounded-lg bg-teal-500 p-4 text-white shadow-lg transition-transform hover:scale-105 hover:shadow-2xl dark:bg-teal-600"
	>
		<div class="flex items-center justify-between">
			<p class="font-mono text-3xl font-extrabold">{mostUsedPaymentMethod}</p>
			<CreditCard class="h-10 w-10" />
		</div>
		<h3 class="mt-2 text-right text-sm font-medium">Most Used Payment Method</h3>
	</div>
</div>
