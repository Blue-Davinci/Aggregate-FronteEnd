<script>
	import { Pie, Bar } from 'svelte-chartjs';
    import {BarChart2} from 'lucide-svelte';

    export let paymentMethodCounts;
    export let planCounts;
    	// Chart Data for Payment Methods
	const paymentMethodsChartData = {
		labels: Object.keys(paymentMethodCounts),
		datasets: [
			{
				data: Object.values(paymentMethodCounts),
				backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
			}
		]
	};

	// Chart Data for Plan Types
	const plansChartData = {
		labels: Object.keys(planCounts),
		datasets: [
			{
				data: Object.values(planCounts),
				backgroundColor: ['#4A90E2', '#50E3C2', '#F5A623', '#9013FE', '#D0021B']
			}
		]
	};
</script>

<div class="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">
	<!-- Payment Methods Chart -->
	<div
		class="rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl dark:bg-gray-800"
	>
		<h2 class="mb-4 flex items-center text-xl font-semibold">
			<BarChart2 class="mr-2 text-blue-500 dark:text-blue-300" />
			Payment Methods Overview
		</h2>
		<div class="h-64">
			<Pie
				data={paymentMethodsChartData}
				options={{ responsive: true, maintainAspectRatio: true }}
			/>
		</div>
	</div>

	<!-- Plans Chart -->
	<div
		class="rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl dark:bg-gray-800"
	>
		<h2 class="mb-4 flex items-center text-xl font-semibold">
			<BarChart2 class="mr-2 text-purple-500 dark:text-purple-300" />
			Plans Overview
		</h2>
		<div class="h-64">
			<Bar data={plansChartData} options={{ responsive: true, maintainAspectRatio: true }} />
		</div>
	</div>
</div>