<script>
    import { onMount } from 'svelte';
    import * as Dialog from '$lib/components/ui/dialog';
    import { Button } from '$lib/components/ui/button';
    import {saveSessionData,getSessionPostData} from '$lib/store/sessionStore.js';
  
    let isOpen = false;
    let transaction = getSessionPostData('challenged_transaction')??[];
  
    const today = new Date().toISOString().slice(0, 10);
  
    // Simulate fetching challenged transactions
    function getChallengedItems() {
        console.log('Fetching challenged transactions');
      const sampleData = {
        challenged_transactions: [
          {
            ID: 'txn-123',
            AuthorizationUrl: 'https://example.com/authorize',
            ReferencedSubscriptionID: 'sub-123',
            Reference: 'txn-456',
            Status: 'pending',
            Created_At: '2024-08-05T12:00:00Z',
            Updated_At: '2024-08-06T12:00:00Z',
            Hidden: false,
          },
        ],
      };
  
      const data = sampleData;
  
      if (data && data.challenged_transactions.length > 0) {
        console.log("Polling Data: Last Polled Date: ", transaction.lastPolledDate);
        let challenged_transaction = {
            authorizationUrl: data.challenged_transactions[0].AuthorizationUrl,
            referencedSubscriptionID: data.challenged_transactions[0].ReferencedSubscriptionID,
            reference: data.challenged_transactions[0].Reference,
            status: data.challenged_transactions[0].Status,
            createdAt: data.challenged_transactions[0].Created_At,
            updatedAt: data.challenged_transactions[0].Updated_At,
            lastPolledDate: today,
            };
        saveSessionData('challenged_transaction', challenged_transaction);
        transaction = challenged_transaction;
         //transaction = $transactionStore;
        console.log("After Update Last Polled Date: ", challenged_transaction.lastPolledDate);
        isOpen = true;
      }else{
        console.log('No challenged transactions found');
        isOpen = false;
      }
    }
  
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
  
    onMount(() => {
      // Initial check and data polling on mount
      if (transaction.lastPolledDate !== today) {
        getChallengedItems();
      }else if (transaction.lastPolledDate === today && !transaction.hidden){
        console.log('Last Polled Date is today Not running the polling');
        isOpen = true;
      }
    });
  </script>
  
  
  <Dialog.Root bind:open={isOpen}>
    <Dialog.Trigger>
      <button
        class="fixed bottom-12 right-4 flex items-center space-x-2 rounded-full bg-red-500 px-4 py-2 font-bold text-white shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 animate-bounce"
        title="Check Transaction Status"
      >
        <svg
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
        <span>Check Transaction</span>
      </button>
    </Dialog.Trigger>
    <Dialog.Content class="max-w-lg mx-auto mt-10 rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <Dialog.Header>
        <Dialog.Title class="text-lg font-semibold text-gray-900 dark:text-white">
          Transaction Challenged
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
      <div class="mt-6 flex justify-end space-x-4">
        <Button 
          on:click={handleCancel} 
          class="px-4 py-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          Cancel
        </Button>
        <Button 
          on:click={handleResolve} 
          class="px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Resolve
        </Button>
        <Button 
          on:click={resetLastPolledDate} 
          class="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
          Reset Date
        </Button>
      </div>
    </Dialog.Content>
  </Dialog.Root>
  
  
  
  <style>
    :global(.animate-bounce) {
      animation: bounce 1s infinite;
    }
  
    @keyframes bounce {
      0%,
      100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }
  </style>
  