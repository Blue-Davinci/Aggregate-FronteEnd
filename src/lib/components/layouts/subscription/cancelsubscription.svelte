<script>
    import { XCircle, CheckCircle, AlertCircle, RefreshCcw } from 'lucide-svelte';
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
    export let status;
    export let subscriptionID;
    export let cancelSubscription = () => {};
</script>

{#if status === 'active'}
    <AlertDialog.Root>
        <AlertDialog.Trigger>
            <button
                class="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
                <XCircle class="mr-2 w-5 h-5" />
                Cancel Subscription
            </button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
            <AlertDialog.Header>
                <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
                <AlertDialog.Description>
                    This action cannot be undone. Please confirm your decision.
                </AlertDialog.Description>
            </AlertDialog.Header>
            <AlertDialog.Footer>
                <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                <AlertDialog.Action on:click={() => cancelSubscription(subscriptionID)}>Confirm</AlertDialog.Action>
            </AlertDialog.Footer>
        </AlertDialog.Content>
    </AlertDialog.Root>
{:else if status === 'cancelled'}
    <div class="flex items-center justify-center bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-4 py-3 rounded-md shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105">
        <CheckCircle class="w-6 h-6 mr-3 animate-bounce" />
        <div>
            <h3 class="text-lg font-semibold">Subscription Cancelled</h3>
            <p class="text-sm">Your subscription has already been cancelled.</p>
        </div>
    </div>
{:else if status === 'expired'}
    <div class="flex items-center justify-center bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 px-4 py-3 rounded-md shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105">
        <AlertCircle class="w-6 h-6 mr-3 animate-pulse" />
        <div>
            <h3 class="text-lg font-semibold">Subscription Expired</h3>
            <p class="text-sm">Your subscription has already expired.</p>
        </div>
    </div>
{:else}
    <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-4 py-3 rounded-md shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105">
        <RefreshCcw class="w-6 h-6 mr-3 animate-spin" />
        <div>
            <h3 class="text-lg font-semibold">Subscription Renewed</h3>
            <p class="text-sm">Your subscription was renewed.</p>
        </div>
    </div>
{/if}
