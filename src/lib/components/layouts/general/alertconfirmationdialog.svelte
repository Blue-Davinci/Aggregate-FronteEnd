<script>
	import { createEventDispatcher } from 'svelte';
	import { CheckCircle, XCircle } from 'lucide-svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';

	export let isPositive = true;
	export let itemID;
	export let dlgTitle = "Are you absolutely sure?";
	export let dlgMessage = "Are you sure you want to perform this action? It might be fun, or it might not. Who knows?";

	let dispatcher = createEventDispatcher();

  function handleContinue() {
    //console.log('Continue clicked');
    dispatcher('continue', itemID);
  }

  function handleCancel() {
    //console.log('Cancel clicked');
    dispatcher('cancel', false);
  }
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger>
		{#if isPositive}
		<button
			class="flex transform items-center space-x-1 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-600 transition-transform hover:scale-105 hover:bg-green-200 dark:bg-green-800 dark:text-green-200"
		>
			<CheckCircle class="h-4 w-4" /> <span>Approve</span>
		</button>
		{:else}
		<button
		class="flex transform items-center space-x-1 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600 transition-transform hover:scale-105 hover:bg-red-200 dark:bg-red-800 dark:text-red-200"
	>
		<XCircle class="h-4 w-4" /> <span>Reject</span>
	</button>
		{/if}
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>{dlgTitle}?</AlertDialog.Title>
			<AlertDialog.Description>
				{dlgMessage}
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel on:click={handleCancel}>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action on:click={handleContinue}>Continue</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
