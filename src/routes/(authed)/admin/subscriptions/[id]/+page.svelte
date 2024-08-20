<script>
    import { XCircle} from 'lucide-svelte';
    import { fly, fade } from 'svelte/transition';
    import Goback from '$lib/components/layouts/general/goback.svelte';
    import Challangedtransactionscard from '$lib/components/layouts/cards/challangedtransactionscard.svelte';
    export let data;
    export let transactions = data.transactions ?? [];
</script>

<Goback />

<!-- If No Transactions -->
{#if transactions.length === 0}
<div class="flex flex-col items-center justify-center h-screen"
in:fly={{ x: 200, duration: 1000 }}
out:fade
>
    <XCircle class="w-16 h-16 text-red-400 mb-4" />
    <p class="text-xl text-gray-600 dark:text-gray-300">No transactions found.</p>
    <p class="text-sm text-gray-500 dark:text-gray-400">Please ensure you have a valid challenged transaction.</p>
</div>
{:else}
    <Challangedtransactionscard {transactions} />
{/if}
