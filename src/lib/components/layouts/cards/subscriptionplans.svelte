<script>
    import { initializeSubscription } from '$lib/dataservice/susbcriptionDataService';
    import { setToast } from '$lib/utilities/utils';
    export let plan;
    export let user;
  
    let isSaving = false;
  
    const handlePurchase = async () => {
      if (plan.amount === 0) {
        setToast(
          true,
          'You have selected the free plan. Who says the best things in life aren’t free?',
          4000
        );
        return;
      }
      if (!user || user === undefined) {
        setToast(false, 'You need to login to purchase a plan.');
        return;
      }
      isSaving = true;
      let response = await initializeSubscription(plan.id, plan.amount);
      if (response.error) {
        setToast(false, response.message, 3000);
        isSaving = false; // Reset isSaving in case of error
        return;
      } else {
        console.log('Response: ', response.data);
        let payment_gateway_url = response.data.initialization.data.authorization_url;
        setToast(true, 'Redirecting to payment gateway...', 3000);
        window.location.href = payment_gateway_url;
      }
    };
  
    function formatAmount(plan_duration, plan_amount) {
      if (plan_duration === 'month') {
        return `$${plan_amount}/month`;
      } else if (plan_duration === 'year') {
        return `$${plan_amount}/year`;
      } else {
        return '$0/month';
      }
    }
  
    function splitFeature(feature) {
      const [title, ...description] = feature.split(':');
      return { title: title.trim(), description: description.join(':').trim() };
    }
  </script>
  
  <div class="flex flex-col h-full transform overflow-hidden rounded-lg bg-white shadow-lg transition duration-500 ease-in-out hover:scale-105 dark:bg-gray-800">
    <button
      type="button"
      class="relative h-48 w-full cursor-pointer object-cover focus:outline-none"
      on:click={handlePurchase}
      style="background-image: url('{plan.image}'); background-size: cover; background-position: center;"
    >
      <span class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100">
        {#if plan.amount !== 0}
          <span class="text-lg font-semibold text-white">Purchase Plan</span>
        {/if}
      </span>
    </button>
    <div class="flex h-full flex-col justify-between p-4 hover:bg-gradient-to-r hover:from-gray-100 hover:via-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:via-gray-800 dark:hover:to-gray-900">
      <div>
        <h2 class="cursor-pointer text-2xl font-semibold text-gray-900 dark:text-white">
          {plan.name}
        </h2>
        <p class="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">
          {formatAmount(plan.duration, plan.amount)}
        </p>
        <ul class="mt-4 space-y-2">
          {#each plan.features as feature}
            {#if feature}
              <li class="flex items-start text-gray-700 dark:text-gray-300">
                <svg
                  class="mt-1 h-5 w-5 text-green-500 dark:text-green-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4-1.41-1.42L11 11.17l-1.59-1.59L8 10l1 1z" />
                </svg>
                <div class="ml-3">
                  <span class="font-bold">{splitFeature(feature).title}:</span>
                  <span class="ml-1">{splitFeature(feature).description}</span>
                </div>
              </li>
            {/if}
          {/each}
        </ul>
      </div>
      <div class="mt-4">
        <button
          class="flex items-center justify-center w-full rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 px-5 py-3 text-lg font-medium text-white shadow-md transition duration-300 hover:from-blue-600 hover:to-teal-500 hover:shadow-lg dark:from-blue-600 dark:to-teal-500 dark:hover:from-blue-700 dark:hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          on:click={handlePurchase}
          disabled={isSaving}
        >
          {#if isSaving}
            <svg
              class="mr-2 h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Loading...
          {:else}
            Buy Now
          {/if}
        </button>
      </div>
    </div>
  </div>
  