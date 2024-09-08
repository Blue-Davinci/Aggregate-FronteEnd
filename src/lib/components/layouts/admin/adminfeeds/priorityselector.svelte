<script>
    import ValidationMessage from '$lib/components/layouts/auth/authvalidation_message.svelte';
    import { adminUpdateFeed} from '$lib/dataservice/admin/adminFeedsDataService.js';
    import * as Dialog from '$lib/components/ui/dialog';
    import { ArrowUpWideNarrow, Star } from 'lucide-svelte'; // Adding an icon for priority
    import { createEventDispatcher } from 'svelte';
    import { setToast } from '$lib/utilities/utils';

    export let feedId;
    export let currentPriority = "Select priority";
    //console.log('Current Priority:', currentPriority, ' || Feed ID:', feedId);
    let isOpen = false;
    let priority = currentPriority;
    let formError = '';

    const options = [
        { value: "low", label: "Low Priority" },
        { value: "normal", label: "Normal Priority" },
        { value: "high", label: "High Priority" }
    ];

    const dispatch = createEventDispatcher();

    function handleSelect(e) {
        priority = e.target.value;
    }

    // handleSetPriority() sets/updates the feed's priority
    // we use the adminUpdateFeed function to update the feed's priority
    // we send the feed's id and the new priority as an object to the server
    // {priority: priority}
    //  dispatch("onsetpriority", priority);
    isOpen = false;
    async function handleSetPriority() {
        const response = await adminUpdateFeed(feedId, {priority: priority});
        console.log('Response:', response.error);
        if (response.success) {
            setToast(true, 'Feed priority updated successfully.', 3000);
            currentPriority = priority;
            dispatch('onsetpriority', true);
            formError = '';
            isOpen = false;
        }else{
            formError = response.error?.priority ?? 'Failed to update feed priority.';
            setToast(false, formError, 3000);
            dispatch('onsetpriority', false);
        }
       
    }

    function getBadgeColor(value) {
        if (value === 'low') return 'bg-red-500';
        if (value === 'medium') return 'bg-yellow-500';
        if (value === 'high') return 'bg-green-500';
        return 'bg-gray-300';
    }
</script>

<Dialog.Root bind:open={isOpen}>
    <button
        class="flex transform items-center space-x-1 rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-600 transition-transform hover:scale-105 hover:bg-purple-200 dark:bg-purple-800 dark:text-purple-200"
        on:click={() => isOpen = true}
    >
        <ArrowUpWideNarrow class="h-4 w-4" /> <span>Priority</span>
    </button>

    <Dialog.Content class="dialog-content rounded-lg p-6 shadow-md h-auto">
        <Dialog.Header>
            <Dialog.Title>Adjust the feed's priority</Dialog.Title>
            <Dialog.Description>
                <p>Select the feed's priority from the combo below and click 'Set' to update the priority.</p>
                <p class="mt-2"><b class="text-blue-500">High</b> priority feeds are recommended first, while <b class="text-red-500">low</b> ones are recommended last.</p>
            </Dialog.Description>
        </Dialog.Header>

        <!-- Enhanced Current Priority Badge -->
        <div class="flex justify-center mt-4">
            <span class="text-sm font-semibold text-gray-600 dark:text-gray-200 flex items-center space-x-2">
                <Star class="h-5 w-5 text-purple-500" /> <!-- Icon for priority -->
                <span>Current Priority:</span>
                <span class={`ml-2 px-3 py-1 rounded-full text-white font-medium shadow-lg ${getBadgeColor(currentPriority)} transform transition-transform duration-300 hover:scale-105`}>
                    {currentPriority.charAt(0).toUpperCase() + currentPriority.slice(1)}
                </span>
            </span>
        </div>

        <!-- Combo box section -->
        <div class="flex items-center space-x-4 mt-6 justify-center w-full">
            <select
                class="w-full rounded-full border border-gray-300 bg-white px-4 py-2 shadow-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-transform duration-300 ease-in-out dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
                bind:value={priority}
                on:change={handleSelect}
            >
                <option disabled>Select priority</option>
                {#each options as option}
                    <option
                        class={priority === option.value ? 'bg-blue-100' : ''}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                {/each}
            </select>
            <button
                class="rounded-full bg-purple-600 px-5 py-2 text-white font-semibold shadow-lg hover:bg-purple-700 transition-transform transform hover:scale-105 focus:outline-none"
                on:click={handleSetPriority}
            >
                Set
            </button>
        </div>
        <ValidationMessage error={formError} />
    </Dialog.Content>
</Dialog.Root>
