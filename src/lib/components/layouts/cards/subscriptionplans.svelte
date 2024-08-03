<script>
    import { goto } from '$app/navigation';
    export let plan;
    export let user;

    function handlePurchase() {
        if (!user || user === undefined) {
            alert('Please login to purchase a plan');
            //goto("/login");
        } else {
            alert(`You have selected the ${plan.name} plan!`);
        }
    }

    function formatAmount(plan_name, plan_amount) {
        if (plan_name === 'Monthly') {
            return `$${plan_amount}/month`;
        } else if (plan_name === 'Annual') {
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

<div class="transform overflow-hidden rounded-lg bg-white shadow-lg transition duration-500 ease-in-out hover:scale-105 dark:bg-gray-800">
    <button
        type="button"
        class="relative h-48 w-full cursor-pointer object-cover focus:outline-none"
        on:click={handlePurchase}
        style="background-image: url('{plan.image}'); background-size: cover; background-position: center;"
    >
        <span class="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100">
            {#if plan.amount !== 0}
            <span class="text-white text-lg font-semibold">Purchase Plan</span>
            {/if}
        </span>
    </button>
    <div class="flex h-full flex-col justify-between p-6 hover:bg-gradient-to-r hover:from-gray-100 hover:via-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:via-gray-800 dark:hover:to-gray-900">
        <div>
            <h2 class="cursor-pointer text-2xl font-semibold text-gray-900 dark:text-white">
                {plan.name}
            </h2>
            <p class="mt-4 text-4xl font-extrabold text-gray-900 dark:text-white">
                {formatAmount(plan.name, plan.amount)}
            </p>
            <ul class="mt-6 space-y-4">
                {#each plan.features as feature}
                    {#if feature}
                        <li class="flex items-start text-gray-700 dark:text-gray-300">
                            <svg class="h-6 w-6 text-green-500 dark:text-green-300 mt-1" fill="currentColor" viewBox="0 0 24 24">
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
        <div class="mt-6">
            <button
                class="w-full rounded bg-blue-600 px-4 py-2 text-white transition duration-150 hover:bg-blue-700 dark:hover:bg-blue-500"
                on:click={handlePurchase}
            >
                Buy Now
            </button>
            <button
                class="w-full mt-4 rounded border-2 border-blue-600 px-4 py-2 text-blue-600 transition duration-150 hover:bg-blue-600 hover:text-white dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white"
                on:click={handlePurchase}
            >
                Learn More
            </button>
        </div>
    </div>
</div>
