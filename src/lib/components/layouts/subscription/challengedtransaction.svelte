<script>
	import { onMount } from 'svelte';
	import { setToast } from '$lib/utilities/utils';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { cancelChallengedTransaction } from '$lib/dataservice/subscriptionDataService.js';
	import { saveSessionData, getSessionPostData } from '$lib/store/sessionStore.js';
	import { getChallengedTransaction } from '$lib/dataservice/subscriptionDataService.js';
	import { ShieldAlert, X, CheckCircle2, RefreshCw } from 'lucide-svelte';

  export let username;

	let isOpen = false;
	let transaction = {};
  let sessionKey = `challenged_transaction-${username}`;
	const today = new Date().toISOString().slice(0, 10);

  //resetLastPolledDate();
	// Simulate fetching challenged transactions
	const getChallengedItems = async () => {
		let response = await getChallengedTransaction();
		if (response.error) {
			console.error('Error: ', response.error);
			return;
		}
		const data = response.data.challenged_transactions;
		//console.log('Fetching challenged transactions: ', response.data);
		//console.log('Challenged transactions: ', data);

		// Check if data is not empty and contains the expected structure
		if (
			data &&
			data.length > 0 &&
			data[0].authorization_url &&
			data[0].referenced_subscription_id
		) {
			console.log('Polling Data: Last Polled Date: ', transaction.lastPolledDate);
			let challenged_transaction = {
				id: data[0].id,
				authorizationUrl: data[0].authorization_url,
				referencedSubscriptionID: data[0].referenced_subscription_id,
				reference: data[0].reference,
				status: data[0].status,
				createdAt: data[0].created_at,
				updatedAt: data[0].updated_at,
				lastPolledDate: today,
				hidden: false
			};
      transaction = challenged_transaction; // Ensure transaction is set
			saveSessionData(sessionKey, challenged_transaction);
			console.log('Challenged transaction: ', challenged_transaction);
			isOpen = true; // Open dialog only when valid data exists
		} else {
			console.log('No challenged transactions found');
			transaction = {}; // Reset transaction to ensure it's empty
			isOpen = false; // Ensure dialog is closed
		}
	};

	// Reset the last polled date to a previous date
	function resetLastPolledDate() {
		console.log('Resetting last polled date');
		saveSessionData(sessionKey, {
			...transaction,
			lastPolledDate: '2024-08-01' // Set this to a date in the past to trigger the modal on reload
		});
	}

	function handleResolve() {
		window.open(transaction.authorizationUrl, '_blank');
		isOpen = false;
	}

	const handleCancel = async (challenged_transaction_id) => {
		console.log('Cancelling transaction: ', challenged_transaction_id);

		try {
			const response = await cancelChallengedTransaction(challenged_transaction_id);
			//console.log('Response: ', response);
			if (response.error) {
				setToast(false, response.error.status, 3000);
				// Handle error (e.g., show a toast notification)
			} else {
				setToast(true, 'Transaction cancelled successfully', 3000);
				// update session storage, remove all data except lastPolledDate, which we update to today
				// reset transaction to empty object
				transaction = { lastPolledDate: today };
				saveSessionData(sessionKey, transaction);
			}
		} catch (error) {
			console.error('Unexpected error:', error);
			// Handle unexpected error
		}

		isOpen = false;
	};

	function handleHide() {
		console.log('Hiding transaction for today');
		saveSessionData(sessionKey, {
			...transaction,
			hidden: true
		});
		isOpen = false;
	}

	onMount(() => {
		// Retrieve transaction data from session
		transaction = getSessionPostData(sessionKey) || {};
		console.log('Challenged Transaction: ', transaction.id);

		// Initial check and data polling on mount
		if (transaction.lastPolledDate !== today) {
			getChallengedItems();
		} else if (
			transaction.lastPolledDate === today &&
			!transaction.hidden &&
			transaction.id &&
			transaction.referencedSubscriptionID
		) {
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
		{#if transaction.id && transaction.referencedSubscriptionID}
			<button
				class="transaction-fab fixed bottom-20 right-4 z-[1] flex h-16 w-16 animate-bounce items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
			>
				<ShieldAlert size="28" class="m-1" />
				<span class="transaction-fab-text ml-2 hidden text-sm font-medium"
					>Check Transaction Status</span
				>
			</button>
		{/if}
	</Dialog.Trigger>
	<Dialog.Content
		class="mx-auto mt-10 max-w-lg overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800"
	>
		<Dialog.Header>
			<Dialog.Title class="text-lg font-semibold text-gray-900 dark:text-white">
				<ShieldAlert class="mr-2 inline-block text-red-500" size="24" /> Transaction Challenged
			</Dialog.Title>
			<Dialog.Description class="text-sm text-gray-500 dark:text-gray-400">
				Your transaction has been challenged. Please review the details below and take action.
			</Dialog.Description>
		</Dialog.Header>
		<div class="mt-4 space-y-6">
			<div class="rounded-lg bg-gray-100 p-4 shadow-sm dark:bg-gray-700">
				<p class="text-gray-800 dark:text-gray-200">
					<strong>Reference:</strong>
					<span class="font-medium">{transaction.reference ?? 'N/A'}</span>
				</p>
				<p class="text-gray-800 dark:text-gray-200">
					<strong>Subscription ID:</strong>
					<span class="font-medium">{transaction.referencedSubscriptionID ?? 'N/A'}</span>
				</p>
			</div>
			<div class="rounded-lg bg-gray-100 p-4 shadow-sm dark:bg-gray-700">
				<p class="text-gray-800 dark:text-gray-200">
					<strong>Created At:</strong>
					<span class="font-medium"
						>{transaction.createdAt
							? new Date(transaction.createdAt).toLocaleString()
							: 'N/A'}</span
					>
				</p>
				<p class="text-gray-800 dark:text-gray-200">
					<strong>Updated At:</strong>
					<span class="font-medium"
						>{transaction.updatedAt
							? new Date(transaction.updatedAt).toLocaleString()
							: 'N/A'}</span
					>
				</p>
			</div>
		</div>
		<div class="mt-6 flex flex-wrap justify-end space-x-2">
			<Button
				on:click={handleCancel(transaction.id)}
				class="flex-1 rounded-md bg-gray-300 px-4 py-2 text-gray-800 shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
			>
				<X size="18" class="mr-1 inline-block" /> Cancel
			</Button>
			<Button
				on:click={handleResolve}
				class="flex-1 rounded-md bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-400 dark:hover:bg-blue-500"
			>
				<CheckCircle2 size="18" class="mr-1 inline-block" /> Resolve
			</Button>
			<Button
				on:click={handleHide}
				class="flex-1 rounded-md bg-yellow-500 px-4 py-2 text-white shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:bg-yellow-400 dark:hover:bg-yellow-500"
			>
				<X size="18" class="mr-1 inline-block" /> Hide for Today
			</Button>
			<Button
				on:click={resetLastPolledDate}
				hidden={true}
				class="mt-3 flex-1 rounded-md bg-green-500 px-4 py-2 text-white shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:bg-green-400 dark:hover:bg-green-500"
			>
				<RefreshCw size="18" class="mr-1 inline-block" /> Reset Datee
			</Button>
		</div>
	</Dialog.Content>
</Dialog.Root>
