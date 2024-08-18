<script>
    import { Pie, Bar } from 'svelte-chartjs';
    import { fly, fade } from 'svelte/transition';
    import { ChevronDown, ChevronUp, DollarSign, Award, Users, CreditCard, BarChart2, Trash2, AlertTriangle } from 'lucide-svelte';
    import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

    // Register necessary Chart.js components
    Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

    export let data;
    let subscriptions = data.subscriptions;

    let planCounts = subscriptions.reduce((acc, sub) => {
        const planName = sub.payment_history.plan_name;
        acc[planName] = (acc[planName] || 0) + 1;
        return acc;
    }, {});

    let mostSubscribedPlanName = Object.keys(planCounts).reduce((a, b) => planCounts[a] > planCounts[b] ? a : b, '');

    let totalAmountReceived = subscriptions.reduce((total, sub) => total + sub.payment_history.subscription.price, 0);
    let bestSubscriber = subscriptions.reduce((best, sub) => sub.payment_history.subscription.price > best.payment_history.subscription.price ? sub : best, subscriptions[0]);

    // Additional Stats
   let paymentMethodCounts = subscriptions.reduce((acc, sub) => {
        const method = sub.payment_history.payment_method;
        acc[method] = (acc[method] || 0) + 1;
        return acc;
    }, {});

    let mostUsedPaymentMethod = Object.keys(paymentMethodCounts).reduce((a, b) => paymentMethodCounts[a] > paymentMethodCounts[b] ? a : b, '');

    // Chart Data for Payment Methods
    const paymentMethodsChartData = {
        labels: Object.keys(paymentMethodCounts),
        datasets: [
            {
                data: Object.values(paymentMethodCounts),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    };

    // Chart Data for Plan Types
    const plansChartData = {
        labels: Object.keys(planCounts),
        datasets: [
            {
                data: Object.values(planCounts),
                backgroundColor: ['#4A90E2', '#50E3C2', '#F5A623', '#9013FE', '#D0021B'],
            },
        ],
    };
</script>

<!-- Statistics Cards -->
<div class="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
    <!-- Total Revenue Card -->
    <div class="p-4 bg-blue-500 dark:bg-blue-600 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
        <div class="flex items-center justify-between">
            <p class="text-3xl font-extrabold font-mono">{totalAmountReceived} KES</p>
            <DollarSign class="w-10 h-10" />
        </div>
        <h3 class="text-sm font-medium mt-2 text-right">Total Revenue</h3>
    </div>
    
    <!-- Best Subscriber Card -->
    <div class="p-4 bg-green-500 dark:bg-green-600 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
        <div class="flex items-center justify-between">
            <p class="text-3xl font-extrabold font-mono">User ID: {bestSubscriber.payment_history.subscription.user_id}</p>
            <Award class="w-10 h-10" />
        </div>
        <h3 class="text-sm font-medium mt-2 text-right">Best Subscriber</h3>
    </div>

    <!-- Most Subscribed Plan Card -->
    <div class="p-4 bg-purple-500 dark:bg-purple-600 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
        <div class="flex items-center justify-between">
            <p class="text-3xl font-extrabold font-mono">{mostSubscribedPlanName}</p>
            <Users class="w-10 h-10" />
        </div>
        <h3 class="text-sm font-medium mt-2 text-right">Most Subscribed Plan</h3>
    </div>

    <!-- Most Used Payment Method Card -->
    <div class="p-4 bg-teal-500 dark:bg-teal-600 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
        <div class="flex items-center justify-between">
            <p class="text-3xl font-extrabold font-mono">{mostUsedPaymentMethod}</p>
            <CreditCard class="w-10 h-10" />
        </div>
        <h3 class="text-sm font-medium mt-2 text-right">Most Used Payment Method</h3>
    </div>
</div>

<!-- Charts Container -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
    <!-- Payment Methods Chart -->
    <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <h2 class="text-xl font-semibold mb-4 flex items-center">
            <BarChart2 class="mr-2 text-blue-500 dark:text-blue-300" />
            Payment Methods Overview
        </h2>
        <div class="h-64">
            <Pie data={paymentMethodsChartData} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>
    </div>

    <!-- Plans Chart -->
    <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <h2 class="text-xl font-semibold mb-4 flex items-center">
            <BarChart2 class="mr-2 text-purple-500 dark:text-purple-300" />
            Plans Overview
        </h2>
        <div class="h-64">
            <Bar data={plansChartData} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>
    </div>
</div>

<!-- Subscriptions Table -->
<table class="w-full table-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg"
    in:fly={{ x: 200, duration: 1000 }}
    out:fade
>
    <thead class="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white dark:bg-gradient-to-r dark:from-purple-700 dark:via-pink-700 dark:to-red-700">
        <tr>
            <th class="px-4 py-2 text-left font-semibold">Plan Image</th>
            <th class="px-4 py-2 text-left font-semibold">Plan Name</th>
            <th class="px-4 py-2 text-left font-semibold">Status</th>
            <th class="px-4 py-2 text-left font-semibold">Price</th>
            <th class="px-4 py-2 text-right font-semibold">Details</th>
        </tr>
    </thead>
    <tbody>
        {#each subscriptions as subscription}
            <tr class="hover:bg-purple-100 dark:hover:bg-purple-900 cursor-pointer transition-colors">
                <td class="px-4 py-2">
                    <img src={subscription.payment_history.plan_image} alt={subscription.payment_history.plan_name} class="w-12 h-12 rounded-full shadow-sm"/>
                </td>
                <td class="px-4 py-2">{subscription.payment_history.plan_name}</td>
                <td class="px-4 py-2">{subscription.payment_history.subscription.status}</td>
                <td class="px-4 py-2">{subscription.payment_history.subscription.price} {subscription.payment_history.currency}</td>
                <td class="px-4 py-2 text-right">
                    <button on:click={() => subscription.showDetails = !subscription.showDetails} class="focus:outline-none">
                        {#if subscription.showDetails}
                            <ChevronUp class="text-gray-600 dark:text-gray-300" />
                        {:else}
                            <ChevronDown class="text-gray-600 dark:text-gray-300" />
                        {/if}
                    </button>
                </td>
            </tr>
            <!-- Expandable Panel -->
<!-- Expandable Panel -->
{#if subscription.showDetails}
<tr in:fly={{ x: 200, duration: 1000 }} out:fade={{ duration: 300 }}>
    <td colspan="5" class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-inner">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <p class="text-sm font-medium text-gray-600 dark:text-gray-300">
                    <span class="font-semibold text-gray-800 dark:text-gray-100">Transaction ID:</span> {subscription.payment_history.transaction_id}
                </p>
                <p class="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                    <span class="font-semibold text-gray-800 dark:text-gray-100">Payment Method:</span> {subscription.payment_history.payment_method} ending in {subscription.payment_history.card_last4}
                </p>
                <p class="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                    <span class="font-semibold text-gray-800 dark:text-gray-100">Plan Duration:</span> {subscription.payment_history.subscription.duration}
                </p>
            </div>
            <div>
                <p class="text-sm font-medium text-gray-600 dark:text-gray-300">
                    <span class="font-semibold text-gray-800 dark:text-gray-100">Expiration year:</span> {subscription.payment_history.card_exp_year}
                </p>
                <p class="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                    <span class="font-semibold text-gray-800 dark:text-gray-100">Subscriber ID:</span> {subscription.payment_history.subscription.user_id}
                </p>
            </div>
        </div>

        <!-- Button Container with Flexbox -->
        <div class="flex space-x-4 mt-4">
            {#if subscription.has_challenged_transactions}
                <a href="#a" class="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 focus:outline-none flex items-center">
                    <AlertTriangle class="w-5 h-5 mr-2" />
                    View Challenged Transactions
                </a>
            {/if}
            <button class="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 focus:outline-none flex items-center">
                <Trash2 class="w-5 h-5 mr-2" />
                Cancel Subscription
            </button>
        </div>
    </td>
</tr>
{/if}

        {/each}
    </tbody>
</table>