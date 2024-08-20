<script>
	import { Calendar, Link } from 'lucide-svelte';
	export let transactions;

	let detailsVisible = false;

	function toggleDetails() {
		detailsVisible = !detailsVisible;
	}

	const formatDate = (dateStr) => {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateStr).toLocaleDateString(undefined, options);
	};

	const getStatusBadgeClass = (status) => {
		switch (status) {
			case 'failed':
				return 'bg-red-500';
			case 'pending':
				return 'bg-yellow-500';
			case 'successful':
				return 'bg-green-500';
			default:
				return 'bg-gray-500';
		}
	};
</script>

<div class="mx-auto max-w-full space-y-4 px-4">
	{#each transactions as transaction}
		<div
			class="transaction-card scale-100 transform rounded-lg bg-white p-6 shadow-md transition-transform duration-300 hover:scale-[1.02] dark:bg-gray-800"  >
			<div class="header mb-4 flex items-center justify-between">
				<div class="flex items-center space-x-4">
					<img
						src={transaction.user_img}
						alt={transaction.user_name}
						class="h-12 w-12 rounded-full border-2 border-gray-200 object-cover dark:border-gray-700"
					/>
					<div>
						<h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">
							{transaction.user_name}
						</h2>
						<p
							class="rounded bg-blue-100 px-2 py-1 text-sm text-blue-800 dark:bg-blue-700 dark:text-blue-200"
						>
							{transaction.user_email}
						</p>
					</div>
				</div>
				<span
					class={`badge rounded-full px-3 py-1 text-white ${getStatusBadgeClass(transaction.challenged_transaction.status)}`}
				>
					{transaction.challenged_transaction.status}
				</span>
			</div>
			<div class="transaction-details space-y-2">
				<p class="text-gray-700 dark:text-gray-300">
					<strong>Transaction ID:</strong>
					{transaction.challenged_transaction.id}
				</p>
				<p class="text-gray-700 dark:text-gray-300">
					<strong>Plan ID:</strong>
					{transaction.plan_id}
				</p>
				<p class="text-gray-700 dark:text-gray-300">
					<strong>Plan Price:</strong> KES {transaction.plan_price}
				</p>
				<p class="flex items-center text-gray-700 dark:text-gray-300">
					<Calendar class="mr-1 h-4 w-4" /> <strong>Subscription Period:</strong>
					{formatDate(transaction.start_date)} - {formatDate(transaction.end_date)}
				</p>
			</div>
			<div class="challenged-transaction mt-6 border-t border-gray-200 pt-4">
				<button
					on:click={toggleDetails}
					class="toggle-details text-blue-500 hover:text-blue-700 focus:outline-none"
				>
					{#if detailsVisible}
						Hide Details
					{:else}
						Show More Details
					{/if}
				</button>
				{#if detailsVisible}
					<div class="details mt-4 space-y-2">
						<p class="text-gray-700 dark:text-gray-300">
							<strong>Reference:</strong>
							{transaction.challenged_transaction.reference}
						</p>
						<p class="flex items-center text-gray-700 dark:text-gray-300">
							<Link class="mr-1 h-4 w-4" /> <strong>Authorization URL:</strong>
							<a
								href={transaction.challenged_transaction.authorization_url}
								class="text-blue-500 hover:underline">Click here</a
							>
						</p>
						<p class="text-gray-700 dark:text-gray-300">
							<strong>Created At:</strong>
							{formatDate(transaction.challenged_transaction.created_at)}
						</p>
						<p class="text-gray-700 dark:text-gray-300">
							<strong>Updated At:</strong>
							{formatDate(transaction.challenged_transaction.updated_at)}
						</p>
					</div>
				{/if}
			</div>
		</div>
	{/each}
</div>
