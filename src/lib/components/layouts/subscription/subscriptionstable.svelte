<script>
	import { cancelSubscription } from '$lib/dataservice/subscriptionDataService.js';
	import { setToast } from '$lib/utilities/utils';
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import Cancelsubscription from './cancelsubscription.svelte';
	import { fly, fade } from 'svelte/transition';

	export let subscriptions = [];

	let expandedIndex = null;
	let totalPurchases = 0;
	let monthlyPurchases = 0;
	let annualPurchases = 0;
	let mostFrequentPaymentMethod = '';

	const toggleExpand = (index) => {
		expandedIndex = expandedIndex === index ? null : index;
	};

  const cancelUserSubscription = async (subscriptionId) => {
    console.log(`Cancel subscription with ID: ${subscriptionId}`);
    
    const response = await cancelSubscription(subscriptionId);
    
    if (response.error) {
        setToast(false, `Unable to cancel your subscription: ${response.error}`, 3000);
        return;
    }
    
    // Update the status of the subscription in the subscriptions array
    const index = subscriptions.findIndex(sub => sub.subscription.id === subscriptionId);
    if (index !== -1) {
        subscriptions[index].subscription.status = 'cancelled';
    }
    
    console.log('Subscription cancelled successfully', response.data);
    setToast(true, 'Subscription cancelled successfully', 3000);
};


	$: {
		totalPurchases = subscriptions.length;
		monthlyPurchases = subscriptions.filter((sub) => sub.plan_duration === 'month').length;
		annualPurchases = subscriptions.filter((sub) => sub.plan_duration === 'year').length;

		const paymentMethods = subscriptions.map((sub) => sub.payment_method);
		const frequency = paymentMethods.reduce((acc, method) => {
			acc[method] = (acc[method] || 0) + 1;
			return acc;
		}, {});
		mostFrequentPaymentMethod = Object.keys(frequency).reduce((a, b) =>
			frequency[a] > frequency[b] ? a : b
		);

		totalPurchases = new Intl.NumberFormat().format(totalPurchases);
		monthlyPurchases = new Intl.NumberFormat().format(monthlyPurchases);
		annualPurchases = new Intl.NumberFormat().format(annualPurchases);
	}
</script>

<div class="rounded-lg bg-white p-4 shadow-md dark:bg-gray-900">
	<div
		class="mb-4 flex flex-col justify-between md:flex-row"
		in:fly={{ x: 200, duration: 1000 }}
		out:fade
	>
		<div>
			<h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Subscription Overview</h2>
			<p class="text-sm text-gray-600 dark:text-gray-400">
				Here's an overview of your subscription purchases.
			</p>
		</div>
		<div class="mt-4 flex flex-wrap space-x-4 md:mt-0">
			<div class="rounded-lg bg-gray-100 p-4 shadow-md dark:bg-gray-800">
				<p class="text-lg font-semibold text-gray-900 dark:text-gray-100">{totalPurchases}</p>
				<p class="text-sm text-gray-600 dark:text-gray-400">Total Purchases</p>
			</div>
			<div class="rounded-lg bg-green-100 p-4 shadow-md dark:bg-green-800">
				<p class="text-lg font-semibold text-gray-900 dark:text-gray-100">{monthlyPurchases}</p>
				<p class="text-sm text-gray-600 dark:text-gray-400">Monthly Plans</p>
			</div>
			<div class="rounded-lg bg-blue-100 p-4 shadow-md dark:bg-blue-800">
				<p class="text-lg font-semibold text-gray-900 dark:text-gray-100">{annualPurchases}</p>
				<p class="text-sm text-gray-600 dark:text-gray-400">Annual Plans</p>
			</div>
			<div class="rounded-lg bg-purple-100 p-4 shadow-md dark:bg-purple-800">
				<p class="text-lg font-semibold text-gray-900 dark:text-gray-100">
					{mostFrequentPaymentMethod}
				</p>
				<p class="text-sm text-gray-600 dark:text-gray-400">Most Used Payment Method</p>
			</div>
		</div>
	</div>

	<div class="overflow-x-auto">
		<table
			class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
			in:fly={{ x: 200, duration: 1000 }}
			out:fade
		>
			<thead class="bg-gray-50 dark:bg-gray-800">
				<tr>
					<th
						class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
						>Plan</th
					>
					<th
						class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
						>Start Date</th
					>
					<th
						class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
						>End Date</th
					>
					<th
						class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
						>Price</th
					>
					<th
						class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
						>Status</th
					>
					<th
						class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
					></th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
				{#each subscriptions as { subscription, plan_name, plan_image, plan_duration, payment_method, card_last4, card_exp_month, card_exp_year, card_type, currency, created_at, id, transaction_id }, index}
					<tr
						class={`transform transition-transform hover:bg-gray-100 dark:hover:bg-gray-700 ${plan_duration === 'year' ? 'bg-blue-50 dark:bg-blue-900' : 'bg-green-50 dark:bg-green-900'}`}
					>
						<td class="flex items-center whitespace-nowrap px-6 py-4">
							<img
								src={plan_image}
								alt="Plan"
								class="mr-4 h-12 w-12 rounded-full border-2 border-gray-600 dark:border-gray-400"
							/>
							<div>
								<div class="text-sm font-medium text-gray-900 dark:text-gray-100">{plan_name}</div>
								<div class="text-sm text-gray-500 dark:text-gray-400">{plan_duration}</div>
							</div>
						</td>
						<td class="whitespace-nowrap px-6 py-4">
							<div class="text-sm text-gray-900 dark:text-gray-100">
								{new Date(subscription.start_date).toLocaleDateString()}
							</div>
						</td>
						<td class="whitespace-nowrap px-6 py-4">
							<div class="text-sm text-gray-900 dark:text-gray-100">
								{new Date(subscription.end_date).toLocaleDateString()}
							</div>
						</td>
						<td class="whitespace-nowrap px-6 py-4">
							<div class="text-sm text-gray-900 dark:text-gray-100">
								{subscription.price.toLocaleString()}
								{currency}
							</div>
						</td>
            <td class="whitespace-nowrap px-6 py-4">
              <span
                  class={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 
                      ${subscription.status === 'active' && 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'} 
                      ${subscription.status === 'cancelled' && 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'}
                      ${subscription.status === 'expired' && 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'}
                      ${subscription.status === 'renewed' && 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'}`}
              >
                  {subscription.status}
              </span>
          </td>
          
            
						<td class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
							<button
								class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-300"
								on:click={() => toggleExpand(index)}
							>
								{#if expandedIndex === index}
									<ChevronUp class="inline-block" />
								{:else}
									<ChevronDown class="inline-block" />
								{/if}
							</button>
						</td>
					</tr>
					{#if expandedIndex === index}
						<tr
							class="transition-height bg-gray-50 duration-700 ease-in-out dark:bg-gray-800"
							in:fly={{ x: -200, duration: 1000 }}
							out:fade
						>
							<td colspan="6" class="px-6 py-4">
								<div class="flex flex-col justify-between lg:flex-row">
									<div class="mb-4 lg:mb-0 lg:w-1/2">
										<h4 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
											Transaction Details
										</h4>
										<p class="text-sm text-gray-600 dark:text-gray-400">Card Type: {card_type}</p>
										<p class="text-sm text-gray-600 dark:text-gray-400">
											Plan Duration: {plan_duration}
										</p>
										<p class="text-sm text-gray-600 dark:text-gray-400">
											Transaction ID: {transaction_id}
										</p>
										<p class="text-sm text-gray-600 dark:text-gray-400">
											Payment Method: {payment_method}
										</p>
										<p class="text-sm text-gray-600 dark:text-gray-400">
											Card Ending: {card_last4}
											{card_type ? `(${card_type})` : ''}
										</p>
										<p class="text-sm text-gray-600 dark:text-gray-400">Currency: {currency}</p>
									</div>
									<div class="flex flex-col items-end justify-center lg:w-1/2">
										<Cancelsubscription
											cancelSubscription={cancelUserSubscription}
											subscriptionID={subscription.id}
                      status={subscription.status}
										/>
									</div>
								</div>
							</td>
						</tr>
					{/if}
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	.transition-height {
		transition: height 0.3s;
	}
</style>
