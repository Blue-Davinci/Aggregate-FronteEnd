<script>
	import { ShoppingBasket } from 'lucide-svelte';
	export let data;
  
	// Format date to a more user-friendly format
	const formatDate = (dateStr) => {
	  const options = { year: 'numeric', month: 'long', day: 'numeric' };
	  return new Date(dateStr).toLocaleDateString(undefined, options);
	};
	const formatAmount = (amount) => {
	  return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: data.payment_details.currency,
	  }).format(amount);
	};
  </script>
  
  <div class="flex flex-col items-center px-4 py-6 space-y-8 sm:px-6 md:px-8 lg:px-10 animate-fadeIn">
	<div class="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full animate-bounce sm:w-20 sm:h-20 md:w-24 md:h-24">
	  <ShoppingBasket class="h-8 w-8 text-green-500 sm:h-10 sm:w-10 md:h-12 md:w-12" />
	</div>
	<h1 class="text-center text-2xl font-extrabold text-green-600 sm:text-3xl md:text-4xl animate-popIn pop-out">
	  Subscription Verified!
	</h1>
	<p class="text-center text-gray-600 dark:text-gray-300 max-w-md sm:text-lg animate-fadeIn pop-out">
	  Your transaction was successful. Here are your details:
	</p>
	<div class="mt-6 w-full overflow-x-auto  pop-out">
	  <table class="min-w-full border-collapse rounded-md bg-gray-100 dark:bg-gray-700 shadow-lg">
		<tbody>
		  <tr class="border-t border-gray-200 dark:border-gray-600">
			<td class="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200">Plan</td>
			<td class="px-4 py-2">
			  {data.payment_details.plan_id === 2 ? 'Monthly Plan' : 'Annual Plan'}
			</td>
		  </tr>
		  <tr class="border-t border-gray-200 dark:border-gray-600">
			<td class="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200">Start Date</td>
			<td class="px-4 py-2">
			  {formatDate(data.payment_details.start_date)}
			</td>
		  </tr>
		  <tr class="border-t border-gray-200 dark:border-gray-600">
			<td class="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200">End Date</td>
			<td class="px-4 py-2">
			  {formatDate(data.payment_details.end_date)}
			</td>
		  </tr>
		  <tr class="border-t border-gray-200 dark:border-gray-600">
			<td class="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200">Amount</td>
			<td class="px-4 py-2">
			  {formatAmount(data.payment_details.price)}
			</td>
		  </tr>
		  <tr class="border-t border-gray-200 dark:border-gray-600">
			<td class="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200">Payment Method</td>
			<td class="px-4 py-2">
			  {data.payment_details.payment_method} ({data.payment_details.card_type} ending in{' '}
			  {data.payment_details.card_last4})
			</td>
		  </tr>
		</tbody>
	  </table>
	</div>
	<p class="mt-6 text-center text-gray-600 dark:text-gray-300 max-w-md sm:text-lg animate-fadeIn">
	  A confirmation email has been sent to:{' '}
	  <span class="font-medium text-green-600 underline dark:text-green-400">
		{data.transaction_data.email}
	  </span>
	</p>
	<div class="mt-8 flex justify-center space-x-4 animate-popIn">
	  <a
		href="/dashboard"
		class="transform rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white shadow-md transition-transform hover:scale-105 hover:bg-green-700 sm:px-6 sm:py-3 sm:text-base"
	  >
		Go to Dashboard
	  </a>
	</div>
  </div>
  
  