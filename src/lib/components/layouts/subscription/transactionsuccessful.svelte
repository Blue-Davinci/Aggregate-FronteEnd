<script>
	import { ShoppingBasket } from 'lucide-svelte';
	export let data;

	// Format date to a more user-friendly format
	const formatDate = (dateStr) => {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateStr).toLocaleDateString(undefined, options);
	};
</script>

<div class="animate-fadeIn animate-popIn flex flex-col items-center">
	<ShoppingBasket class="mb-4 h-20 w-20 animate-bounce text-green-500" />
	<h1 class="animate-popIn mt-6 text-center text-4xl font-extrabold text-green-600">
		Subscription Verified!
	</h1>
	<p class="mt-2 text-center text-gray-600 dark:text-gray-300">
		Your transaction was successful. Here are your details:
	</p>
	<div class="mt-6 w-full overflow-x-auto">
		<table class="min-w-full border-collapse rounded-md bg-gray-100 dark:bg-gray-700">
			<tbody>
				<tr class="border-t border-gray-200 dark:border-gray-600">
					<td class="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200"> Plan </td>
					<td class="px-4 py-2">
						{data.payment_details.plan_id === 2 ? 'Monthly Plan' : 'Annual Plan'}
					</td>
				</tr>
				<tr class="border-t border-gray-200 dark:border-gray-600">
					<td class="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200"> Start Date </td>
					<td class="px-4 py-2">
						{formatDate(data.payment_details.start_date)}
					</td>
				</tr>
				<tr class="border-t border-gray-200 dark:border-gray-600">
					<td class="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200"> End Date </td>
					<td class="px-4 py-2">
						{formatDate(data.payment_details.end_date)}
					</td>
				</tr>
				<tr class="border-t border-gray-200 dark:border-gray-600">
					<td class="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200"> Amount </td>
					<td class="px-4 py-2">
						{data.payment_details.price}
						{data.payment_details.currency}
					</td>
				</tr>
				<tr class="border-t border-gray-200 dark:border-gray-600">
					<td class="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200"> Payment Method </td>
					<td class="px-4 py-2">
						{data.payment_details.payment_method} (
						{data.payment_details.card_type} ending in{' '}
						{data.payment_details.card_last4})
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<p class="mt-6 text-center text-gray-600 dark:text-gray-300">
		A confirmation email has been sent to:{' '}
		<span class="font-medium text-green-600 underline dark:text-green-400"
			>{data.transaction_data.email}</span
		>
	</p>
	<div class="mt-8 flex justify-center space-x-4">
		<a
			href="/dashboard"
			class="transform rounded-full bg-green-600 px-6 py-2 font-bold text-white shadow-md transition-transform hover:scale-105 hover:bg-green-700"
		>
			Go to Dashboard
		</a>
	</div>
</div>
