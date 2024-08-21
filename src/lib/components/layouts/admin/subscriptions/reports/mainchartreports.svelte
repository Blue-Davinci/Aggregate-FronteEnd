<script>
    import { fly, fade } from 'svelte/transition';
    import {
        Chart,
        CategoryScale,
        LinearScale,
        BarElement,
        ArcElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        PointElement,
        BarController,
        PieController,
        LineController
    } from 'chart.js';
    import { onMount } from 'svelte';

    Chart.register(
        CategoryScale,
        LinearScale,
        BarElement,
        ArcElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        PointElement,
        BarController,
        PieController,
        LineController
    );

    export let data;

    let revenueByPlanChart,
        challengedTransactionsChart,
        revenueByPaymentMethodChart,
        subscriptionsOverTimeChart,
        newVsCancelledSubscriptionsChart,
        subscriptionsByCurrencyChart;

    let singleSubscriptionReport = data.stats.single_subscription_report;
    let multiReport = data.stats.multi_report;

    onMount(() => {
        if (multiReport) {
            renderCharts();
        }

        // Listen to theme changes and update charts
        const observer = new MutationObserver(() => updateCharts());
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    });

    function getChartOptions(titleText) {
        const isDarkMode = document.documentElement.classList.contains('dark');
        return {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: isDarkMode ? '#FFFFFF' : '#000000'
                    }
                },
                title: {
                    display: true,
                    text: titleText,
                    color: isDarkMode ? '#FFFFFF' : '#000000'
                }
            },
            scales: {
                x: {
                    ticks: { color: isDarkMode ? '#FFFFFF' : '#000000' },
                    grid: { color: isDarkMode ? '#444444' : '#E5E5E5' }
                },
                y: {
                    ticks: { color: isDarkMode ? '#FFFFFF' : '#000000' },
                    grid: { color: isDarkMode ? '#444444' : '#E5E5E5' }
                }
            }
        };
    }

    function renderCharts() {
        revenueByPlanChart = new Chart(revenueByPlanChart, {
            type: 'bar',
            data: {
                labels: multiReport.revenue_by_plan.map((plan) => plan.PlanName),
                datasets: [
                    {
                        label: 'Total Revenue',
                        data: multiReport.revenue_by_plan.map((plan) => plan.TotalRevenue),
                        backgroundColor: '#4F46E5'
                    }
                ]
            },
            options: getChartOptions('Revenue by Plan')
        });

        challengedTransactionsChart = new Chart(challengedTransactionsChart, {
            type: 'pie',
            data: {
                labels: multiReport.challenged_transactions.map((tx) => tx.Status),
                datasets: [
                    {
                        data: multiReport.challenged_transactions.map((tx) => tx.OutcomeCount),
                        backgroundColor: ['#EF4444', '#FBBF24']
                    }
                ]
            },
            options: getChartOptions('Challenged Transactions')
        });

        revenueByPaymentMethodChart = new Chart(revenueByPaymentMethodChart, {
            type: 'pie',
            data: {
                labels: multiReport.revenue_by_payment_method.map((pm) => pm.PaymentMethod),
                datasets: [
                    {
                        data: multiReport.revenue_by_payment_method.map((pm) => pm.Revenue),
                        backgroundColor: ['#34D399', '#60A5FA']
                    }
                ]
            },
            options: getChartOptions('Revenue by Payment Method')
        });

        subscriptionsOverTimeChart = new Chart(subscriptionsOverTimeChart, {
            type: 'line',
            data: {
                labels: multiReport.subscriptions_over_time.map((sub) =>
                    new Date(sub.Day).toLocaleDateString()
                ),
                datasets: [
                    {
                        label: 'Subscriptions Count',
                        data: multiReport.subscriptions_over_time.map((sub) => sub.SubscriptionsCount),
                        borderColor: '#2563EB',
                        backgroundColor: 'rgba(37, 99, 235, 0.2)'
                    }
                ]
            },
            options: getChartOptions('Subscriptions Over Time')
        });

        newVsCancelledSubscriptionsChart = new Chart(newVsCancelledSubscriptionsChart, {
            type: 'bar',
            data: {
                labels: ['New Subscriptions', 'Cancelled Subscriptions'],
                datasets: [
                    {
                        label: 'Count',
                        data: [
                            singleSubscriptionReport.new_vs_cancelled_subscriptions.NewSubscriptions,
                            singleSubscriptionReport.new_vs_cancelled_subscriptions.CancelledSubscriptions
                        ],
                        backgroundColor: ['#10B981', '#EF4444']
                    }
                ]
            },
            options: getChartOptions('New vs Cancelled Subscriptions')
        });

        subscriptionsByCurrencyChart = new Chart(subscriptionsByCurrencyChart, {
            type: 'pie',
            data: {
                labels: multiReport.subscriptions_by_currency.map((currency) => currency.Currency),
                datasets: [
                    {
                        data: multiReport.subscriptions_by_currency.map((currency) => currency.CurrencyCount),
                        backgroundColor: ['#F87171', '#60A5FA', '#34D399', '#FBBF24']
                    }
                ]
            },
            options: getChartOptions('Subscriptions by Currency')
        });
    }

    function updateCharts() {
        if (revenueByPlanChart) revenueByPlanChart.options = getChartOptions('Revenue by Plan');
        if (challengedTransactionsChart)
            challengedTransactionsChart.options = getChartOptions('Challenged Transactions');
        if (revenueByPaymentMethodChart)
            revenueByPaymentMethodChart.options = getChartOptions('Revenue by Payment Method');
        if (subscriptionsOverTimeChart)
            subscriptionsOverTimeChart.options = getChartOptions('Subscriptions Over Time');
        if (newVsCancelledSubscriptionsChart)
            newVsCancelledSubscriptionsChart.options = getChartOptions('New vs Cancelled Subscriptions');
        if (subscriptionsByCurrencyChart)
            subscriptionsByCurrencyChart.options = getChartOptions('Subscriptions by Currency');

        [
            revenueByPlanChart,
            challengedTransactionsChart,
            revenueByPaymentMethodChart,
            subscriptionsOverTimeChart,
            newVsCancelledSubscriptionsChart,
            subscriptionsByCurrencyChart
        ].forEach((chart) => {
            if (chart) chart.update();
        });
    }
</script>

<div class="space-y-6"
in:fly={{ x: -200, duration: 1000 }}
    out:fade
>
    <!-- Revenue Charts Group -->
    <div class="space-y-4">
        <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200">Revenue Charts</h2>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                <canvas bind:this={revenueByPlanChart}></canvas>
            </div>
            <div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                <canvas bind:this={revenueByPaymentMethodChart}></canvas>
            </div>
        </div>
    </div>

    <!-- Subscription Trends Group -->
    <div class="space-y-4">
        <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200">Subscription Trends</h2>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                <canvas bind:this={subscriptionsOverTimeChart}></canvas>
            </div>
            <div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                <canvas bind:this={newVsCancelledSubscriptionsChart}></canvas>
            </div>
        </div>
    </div>

    <!-- Other Metrics Group -->
    <div class="space-y-4">
        <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200">Other Metrics</h2>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                <canvas bind:this={challengedTransactionsChart}></canvas>
            </div>
            <div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                <canvas bind:this={subscriptionsByCurrencyChart}></canvas>
            </div>
        </div>
    </div>
</div>
