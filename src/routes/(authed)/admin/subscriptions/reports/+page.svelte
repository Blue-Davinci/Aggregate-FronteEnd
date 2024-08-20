<script>
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
	import { DollarSign, Award, Users, CreditCard } from 'lucide-svelte';

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
		subscriptionsOverTimeChart;

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
	}

	function updateCharts() {
		if (revenueByPlanChart) revenueByPlanChart.options = getChartOptions('Revenue by Plan');
		if (challengedTransactionsChart)
			challengedTransactionsChart.options = getChartOptions('Challenged Transactions');
		if (revenueByPaymentMethodChart)
			revenueByPaymentMethodChart.options = getChartOptions('Revenue by Payment Method');
		if (subscriptionsOverTimeChart)
			subscriptionsOverTimeChart.options = getChartOptions('Subscriptions Over Time');

		[
			revenueByPlanChart,
			challengedTransactionsChart,
			revenueByPaymentMethodChart,
			subscriptionsOverTimeChart
		].forEach((chart) => {
			if (chart) chart.update();
		});
	}
</script>

<!-- Layout using Tailwind CSS -->
<div class="container mx-auto space-y-6 p-4">
	<!-- Single Subscription Report Section -->
	<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
		<!-- Total Active Subscriptions Card -->
		<div
			class="transform rounded-lg bg-blue-500 p-4 text-white shadow-lg transition-transform hover:scale-105 hover:shadow-2xl dark:bg-blue-600"
		>
			<div class="flex items-center justify-between">
				<p class="font-mono text-3xl font-extrabold">
					{singleSubscriptionReport.total_active_subscriptions}
				</p>
				<Users class="h-10 w-10" />
			</div>
			<h3 class="mt-2 text-right text-sm font-medium">Total Active Subscriptions</h3>
		</div>

		<!-- Churn Rate Card -->
		<div
			class="transform rounded-lg bg-red-500 p-4 text-white shadow-lg transition-transform hover:scale-105 hover:shadow-2xl dark:bg-red-600"
		>
			<div class="flex items-center justify-between">
				<p class="font-mono text-3xl font-extrabold">{singleSubscriptionReport.churn_rate}%</p>
				<Award class="h-10 w-10" />
			</div>
			<h3 class="mt-2 text-right text-sm font-medium">Churn Rate</h3>
		</div>

		<!-- Average Revenue Per User Card -->
		<div
			class="transform rounded-lg bg-green-500 p-4 text-white shadow-lg transition-transform hover:scale-105 hover:shadow-2xl dark:bg-green-600"
		>
			<div class="flex items-center justify-between">
				<p class="font-mono text-3xl font-extrabold">
					{singleSubscriptionReport.average_revenue_per_user.toFixed(2)}
				</p>
				<DollarSign class="h-10 w-10" />
			</div>
			<h3 class="mt-2 text-right text-sm font-medium">Average Revenue Per User</h3>
		</div>
	</div>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
		<!-- Total Revenue Card -->
		<div
			class="transform rounded-lg bg-purple-500 p-4 text-white shadow-lg transition-transform hover:scale-105 hover:shadow-2xl dark:bg-purple-600"
		>
			<div class="flex items-center justify-between">
				<p class="font-mono text-3xl font-extrabold">{singleSubscriptionReport.total_revenue}</p>
				<DollarSign class="h-10 w-10" />
			</div>
			<h3 class="mt-2 text-right text-sm font-medium">Total Revenue</h3>
		</div>

		<!-- Most Popular Payment Method Card -->
		<div
			class="transform rounded-lg bg-teal-500 p-4 text-white shadow-lg transition-transform hover:scale-105 hover:shadow-2xl dark:bg-teal-600"
		>
			<div class="flex items-center justify-between">
				<p class="font-mono text-3xl font-extrabold">
					{singleSubscriptionReport.most_popular_payment_method}
				</p>
				<CreditCard class="h-10 w-10" />
			</div>
			<h3 class="mt-2 text-right text-sm font-medium">Most Popular Payment Method</h3>
		</div>

		<!-- Most Subscribed Plan Card -->
		<div
			class="transform rounded-lg bg-indigo-500 p-4 text-white shadow-lg transition-transform hover:scale-105 hover:shadow-2xl dark:bg-indigo-600"
		>
			<div class="flex items-center justify-between">
				<p class="font-mono text-3xl font-extrabold">
					{singleSubscriptionReport.most_subscribed_plan}
				</p>
				<Users class="h-10 w-10" />
			</div>
			<h3 class="mt-2 text-right text-sm font-medium">Most Subscribed Plan</h3>
		</div>
	</div>

	<!-- Charts Section -->
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
		<div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
			<canvas bind:this={revenueByPlanChart}></canvas>
		</div>
		<div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
			<canvas bind:this={challengedTransactionsChart}></canvas>
		</div>
		<div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
			<canvas bind:this={revenueByPaymentMethodChart}></canvas>
		</div>
		<div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
			<canvas bind:this={subscriptionsOverTimeChart}></canvas>
		</div>
	</div>

	<!-- New vs Cancelled Subscriptions Section -->
	<div class="rounded-lg bg-white p-6 shadow-lg">
		<h2 class="text-lg font-semibold">New vs Cancelled Subscriptions</h2>
		<p class="text-2xl font-bold">
			New: {singleSubscriptionReport.new_vs_cancelled_subscriptions.NewSubscriptions}
		</p>
		<p class="text-2xl font-bold">
			Cancelled: {singleSubscriptionReport.new_vs_cancelled_subscriptions.CancelledSubscriptions}
		</p>
	</div>

	<!-- Subscriptions by Currency Section -->
	<div class="rounded-lg bg-white p-6 shadow-lg">
		<h2 class="text-lg font-semibold">Subscriptions by Currency</h2>
		<ul>
			{#each multiReport.subscriptions_by_currency as currency}
				<li class="text-lg">{currency.Currency}: {currency.CurrencyCount}</li>
			{/each}
		</ul>
	</div>
</div>
