<script>
  import { onMount } from 'svelte';
  import * as Dialog from '$lib/components/ui/dialog';
  import { Button } from '$lib/components/ui/button';
  import { saveSessionData, getSessionPostData } from '$lib/store/sessionStore.js';
  import { getChallengedTransaction } from '$lib/dataservice/subscriptionDataService.js';
  import { ShieldAlert, X, CheckCircle2, RefreshCw } from 'lucide-svelte';

  let isOpen = false;
  let transaction = {};
  const today = new Date().toISOString().slice(0, 10);

  // Simulate fetching challenged transactions
  const getChallengedItems = async () => {
    let response = await getChallengedTransaction();
    if (response.error) {
      console.error('Error: ', response.error);
      return;
    }
    const data = response.data.challenged_transactions;
    console.log('Fetching challenged transactions: ', response.data);
    console.log('Challenged transactions: ', data);

    // Check if data is not empty and contains the expected structure
    if (data && data.length > 0 && data[0].authorization_url && data[0].referenced_subscription_id) {
      console.log("Polling Data: Last Polled Date: ", transaction.lastPolledDate);
      let challenged_transaction = {
        authorizationUrl: data[0].authorization_url,
        referencedSubscriptionID: data[0].referenced_subscription_id,
        reference: data[0].reference,
        status: data[0].status,
        createdAt: data[0].created_at,
        updatedAt: data[0].updated_at,
        lastPolledDate: today,
        hidden: false
      };
      saveSessionData('challenged_transaction', challenged_transaction);
      transaction = challenged_transaction; // Ensure transaction is set
      console.log("Challenged transaction: ", challenged_transaction);
      isOpen = true; // Open dialog only when valid data exists
    } else {
      console.log('No challenged transactions found');
      transaction = {}; // Reset transaction to ensure it's empty
      isOpen = false;   // Ensure dialog is closed
    }
  };

  // Reset the last polled date to a previous date
  function resetLastPolledDate() {
    console.log('Resetting last polled date');
    saveSessionData('challenged_transaction', {
      ...transaction,
      lastPolledDate: '2024-08-01', // Set this to a date in the past to trigger the modal on reload
    });
  }

  function handleResolve() {
    window.open(transaction.authorizationUrl, '_blank');
    isOpen = false;
  }

  function handleCancel() {
    isOpen = false;
  }

  function handleHide() {
    console.log('Hiding transaction for today');
    saveSessionData('challenged_transaction', {
      ...transaction,
      hidden: true
    });
    isOpen = false;
  }

  onMount(() => {
    // Retrieve transaction data from session
    transaction = getSessionPostData('challenged_transaction') || {};

    // Initial check and data polling on mount
    if (transaction.lastPolledDate !== today) {
      getChallengedItems();
    } else if (transaction.lastPolledDate === today && !transaction.hidden && Object.keys(transaction).length !== 0) {
      console.log('Last Polled Date is today, not running the polling');
      isOpen = true;
    } else {
      isOpen = false;
    }
  });
</script>

<svelte:head>
  <link rel="stylesheet" href="/transactionfab.css" />
</svelte:head>

<Dialog.Root bind:open={isOpen}>
  <Dialog.Trigger>
    {#if Object.keys(transaction).length !== 0}
    <button
      class="transaction-fab z-[1] fixed bottom-20 right-4 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-pink-500 shadow-lg text-white hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 animate-bounce"
    >
      <ShieldAlert size="28" class="m-1" />
      <span class="transaction-fab-text hidden ml-2 text-sm font-medium">Check Transaction Status</span>
    </button>
    {/if}
  </Dialog.Trigger>
  <Dialog.Content class="max-w-lg mx-auto mt-10 rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
    <Dialog.Header>
      <Dialog.Title class="text-lg font-semibold text-gray-900 dark:text-white">
        <ShieldAlert class="inline-block mr-2 text-red-500" size="24" /> Transaction Challenged
      </Dialog.Title>
      <Dialog.Description class="text-sm text-gray-500 dark:text-gray-400">
        Your transaction has been challenged. Please review the details below and take action.
      </Dialog.Description>
    </Dialog.Header>
    <div class="space-y-6 mt-4">
      <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
        <p class="text-gray-800 dark:text-gray-200">
          <strong>Reference:</strong> <span class="font-medium">{transaction.reference ?? 'N/A'}</span>
        </p>
        <p class="text-gray-800 dark:text-gray-200">
          <strong>Subscription ID:</strong> <span class="font-medium">{transaction.referencedSubscriptionID ?? 'N/A'}</span>
        </p>
      </div>
      <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
        <p class="text-gray-800 dark:text-gray-200">
          <strong>Created At:</strong> <span class="font-medium">{transaction.createdAt ? new Date(transaction.createdAt).toLocaleString() : 'N/A'}</span>
        </p>
        <p class="text-gray-800 dark:text-gray-200">
          <strong>Updated At:</strong> <span class="font-medium">{transaction.updatedAt ? new Date(transaction.updatedAt).toLocaleString() : 'N/A'}</span>
        </p>
      </div>
    </div>
    <div class="mt-6 flex flex-wrap justify-end space-x-2">
      <Button 
        on:click={handleCancel} 
        class="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
        <X size="18" class="inline-block mr-1" /> Cancel
      </Button>
      <Button 
        on:click={handleResolve} 
        class="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <CheckCircle2 size="18" class="inline-block mr-1" /> Resolve
      </Button>
      <Button 
        on:click={handleHide} 
        class="flex-1 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
        <X size="18" class="inline-block mr-1" /> Hide for Today
      </Button>
      <Button 
        on:click={resetLastPolledDate} 
        class="flex-1 mt-3 px-4 py-2 bg-green-500 hover:bg-green-600 dark:bg-green-400 dark:hover:bg-green-500 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
        <RefreshCw size="18" class="inline-block mr-1" /> Reset Date
      </Button>
    </div>
  </Dialog.Content>
</Dialog.Root>