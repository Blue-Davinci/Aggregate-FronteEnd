<script>
    import { ChevronDown, ChevronUp } from 'lucide-svelte';
    import { fly, fade } from 'svelte/transition';
    
    export let subscriptions = [];
  
    let expandedIndex = null;
    let totalPurchases = 0;
    let monthlyPurchases = 0;
    let annualPurchases = 0;
    let mostFrequentPaymentMethod = '';
  
    const toggleExpand = (index) => {
      expandedIndex = (expandedIndex === index ? null : index);
    };
  
    $: {
      // Calculate statistics when subscriptions change
      totalPurchases = subscriptions.length;
      monthlyPurchases = subscriptions.filter(sub => sub.plan_duration === 'month').length;
      annualPurchases = subscriptions.filter(sub => sub.plan_duration === 'year').length;
  
      const paymentMethods = subscriptions.map(sub => sub.payment_method);
      const frequency = paymentMethods.reduce((acc, method) => {
        acc[method] = (acc[method] || 0) + 1;
        return acc;
      }, {});
      mostFrequentPaymentMethod = Object.keys(frequency).reduce((a, b) => (frequency[a] > frequency[b] ? a : b));
  
      totalPurchases = new Intl.NumberFormat().format(totalPurchases);
      monthlyPurchases = new Intl.NumberFormat().format(monthlyPurchases);
      annualPurchases = new Intl.NumberFormat().format(annualPurchases);
    }
  </script>
  
  <style>
    .plan-image {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 2px solid #4A5568; /* Custom border color */
    }
  </style>
  
  <div class="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
    <div class="flex justify-between mb-4" in:fly={{ x: 200, duration: 1000 }} out:fade>
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Subscription Overview</h2>
        <p class="text-sm text-gray-600 dark:text-gray-400">Here's an overview of your subscription purchases.</p>
      </div>
      <div class="flex space-x-4">
        <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
          <p class="text-lg font-semibold text-gray-900 dark:text-gray-100">{totalPurchases}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Total Purchases</p>
        </div>
        <div class="p-4 bg-green-100 dark:bg-green-800 rounded-lg shadow-md">
          <p class="text-lg font-semibold text-gray-900 dark:text-gray-100">{monthlyPurchases}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Monthly Plans</p>
        </div>
        <div class="p-4 bg-blue-100 dark:bg-blue-800 rounded-lg shadow-md">
          <p class="text-lg font-semibold text-gray-900 dark:text-gray-100">{annualPurchases}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Annual Plans</p>
        </div>
        <div class="p-4 bg-purple-100 dark:bg-purple-800 rounded-lg shadow-md">
          <p class="text-lg font-semibold text-gray-900 dark:text-gray-100">{mostFrequentPaymentMethod}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Most Used Payment Method</p>
        </div>
      </div>
    </div>
  
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700" in:fly={{ x: 200, duration: 1000 }} out:fade>
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Plan</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Start Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">End Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {#each subscriptions as { subscription, plan_name, plan_image, plan_duration, transaction_id, payment_method, card_last4, card_exp_month, card_exp_year, card_type, currency, created_at }, index}
            <tr class={`transition-transform transform hover:bg-gray-100 dark:hover:bg-gray-700 ${plan_duration === 'year' ? 'bg-blue-50 dark:bg-blue-900' : 'bg-green-50 dark:bg-green-900'}`}>
              <td class="px-6 py-4 whitespace-nowrap flex items-center">
                <img src={plan_image} alt="Plan" class="plan-image mr-4" />
                <div>
                  <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{plan_name}</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">{plan_duration}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-gray-100">{new Date(subscription.start_date).toLocaleDateString()}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-gray-100">{new Date(subscription.end_date).toLocaleDateString()}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-gray-100">{subscription.price.toLocaleString()} {currency}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100">
                  {subscription.status}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-indigo-600 dark:text-indigo-300 hover:text-indigo-900" on:click={() => toggleExpand(index)}>
                  {#if expandedIndex === index}
                    <ChevronUp class="inline-block" />
                  {:else}
                    <ChevronDown class="inline-block" />
                  {/if}
                </button>
              </td>
            </tr>
            {#if expandedIndex === index}
              <tr class="transition-height duration-700 ease-in-out bg-gray-50 dark:bg-gray-800" in:fly={{ x: -200, duration: 1000 }} out:fade >
                <td colspan="6" class="px-6 py-4">
                  <div class="flex flex-col lg:flex-row justify-between">
                    <div class="mb-4 lg:mb-0 lg:w-1/2">
                      <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Transaction Details</h4>
                      <p class="text-sm text-gray-600 dark:text-gray-400">Transaction ID: {transaction_id}</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">Payment Method: {payment_method}</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">Card Ending: {card_last4} {card_type ? `(${card_type})` : ''}</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">Card Expiry: {card_exp_month}/{card_exp_year}</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">Created At: {new Date(created_at).toLocaleString()}</p>
                    </div>
                    <div class="flex flex-col lg:w-1/2 lg:items-end">
                      <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Additional Information</h4>
                      <p class="text-sm text-gray-600 dark:text-gray-400">Plan Duration: {plan_duration}</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">Price: {subscription.price.toLocaleString()} {currency}</p>
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
  