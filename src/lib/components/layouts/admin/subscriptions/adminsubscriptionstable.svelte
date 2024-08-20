<script>
	import { fly, fade } from 'svelte/transition';
    import {ChevronDown,ChevronUp, AlertTriangle,Trash2} from 'lucide-svelte';

    export let subscriptions;
</script>

<table
	class="w-full table-auto rounded-lg bg-white shadow-lg dark:bg-gray-800"
	in:fly={{ x: 200, duration: 1000 }}
	out:fade
>
	<thead
		class="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white dark:bg-gradient-to-r dark:from-purple-700 dark:via-pink-700 dark:to-red-700"
	>
		<tr>
			<th class="px-4 py-2 text-left font-semibold">Plan Image</th>
			<th class="px-4 py-2 text-left font-semibold">Plan Name</th>
			<th class="px-4 py-2 text-left font-semibold">Status</th>
			<th class="px-4 py-2 text-left font-semibold">Price</th>
			<th class="px-4 py-2 text-right font-semibold">Details</th>
		</tr>
	</thead>
	<tbody>
		{#each subscriptions as subscription}
			<tr class="cursor-pointer transition-colors hover:bg-purple-100 dark:hover:bg-purple-900">
				<td class="px-4 py-2">
					<img
						src={subscription.payment_history.plan_image}
						alt={subscription.payment_history.plan_name}
						class="h-12 w-12 rounded-full shadow-sm"
					/>
				</td>
				<td class="px-4 py-2">{subscription.payment_history.plan_name}</td>
				<td class="px-4 py-2">{subscription.payment_history.subscription.status}</td>
				<td class="px-4 py-2"
					>{subscription.payment_history.subscription.price}
					{subscription.payment_history.currency}</td
				>
				<td class="px-4 py-2 text-right">
					<button
						on:click={() => (subscription.showDetails = !subscription.showDetails)}
						class="focus:outline-none"
					>
						{#if subscription.showDetails}
							<ChevronUp class="text-gray-600 dark:text-gray-300" />
						{:else}
							<ChevronDown class="text-gray-600 dark:text-gray-300" />
						{/if}
					</button>
				</td>
			</tr>
			<!-- Expandable Panel -->
			{#if subscription.showDetails}
				<tr in:fly={{ x: 200, duration: 1000 }} out:fade={{ duration: 300 }}>
					<td colspan="5" class="rounded-lg bg-gray-50 p-4 shadow-inner dark:bg-gray-900">
						<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
							<div>
								<p class="text-sm font-medium text-gray-600 dark:text-gray-300">
									<span class="font-semibold text-gray-800 dark:text-gray-100">Transaction ID:</span
									>
									{subscription.payment_history.transaction_id}
								</p>
								<p class="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">
									<span class="font-semibold text-gray-800 dark:text-gray-100">Payment Method:</span
									>
									{subscription.payment_history.payment_method} ending in {subscription
										.payment_history.card_last4}
								</p>
								<p class="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">
									<span class="font-semibold text-gray-800 dark:text-gray-100">Plan Duration:</span>
									{subscription.payment_history.plan_duration}
								</p>
							</div>
							<div>
								<p class="text-sm font-medium text-gray-600 dark:text-gray-300">
									<span class="font-semibold text-gray-800 dark:text-gray-100"
										>Expiration year:</span
									>
									{subscription.payment_history.card_exp_year}
								</p>
								<p class="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">
									<span class="font-semibold text-gray-800 dark:text-gray-100">Subscriber ID:</span>
									{subscription.payment_history.subscription.user_id}
								</p>
							</div>
						</div>

						<!-- Button Container -->
						<div class="mt-4 flex space-x-4">
							{#if subscription.has_challenged_transactions}
								<a
									href={`/admin/subscriptions/${subscription.payment_history.subscription.id}`}
									class="flex items-center rounded-lg bg-yellow-500 px-4 py-2 text-white shadow hover:bg-yellow-600 focus:outline-none"
								>
									<AlertTriangle class="mr-2 h-5 w-5" />
									View Challenged Transactions
								</a>
							{/if}
							<button
								class="flex items-center rounded-lg bg-red-500 px-4 py-2 text-white shadow hover:bg-red-600 focus:outline-none"
							>
								<Trash2 class="mr-2 h-5 w-5" />
								Cancel Subscription
							</button>
						</div>
					</td>
				</tr>
			{/if}
		{/each}
	</tbody>
</table>
