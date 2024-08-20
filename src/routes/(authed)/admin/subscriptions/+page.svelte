<script>
	import Subscriptionstatistics from '$lib/components/layouts/admin/subscriptions/subscriptionstatistics.svelte';
	import Subscriptioncharts from '$lib/components/layouts/admin/subscriptions/subscriptioncharts.svelte';
	import Adminsubscriptionstable from '$lib/components/layouts/admin/subscriptions/adminsubscriptionstable.svelte';
	import {
		Chart,
		CategoryScale,
		LinearScale,
		BarElement,
		ArcElement,
		Title,
		Tooltip,
		Legend
	} from 'chart.js';
	export let data;
	// Register necessary Chart.js components
	Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

	//export let data;
	let subscriptions = data.subscriptions;
	//console.log(subscriptions);
	let planCounts = subscriptions.reduce((acc, sub) => {
		const planName = sub.payment_history.plan_name;
		acc[planName] = (acc[planName] || 0) + 1;
		return acc;
	}, {});

	let mostSubscribedPlanName = Object.keys(planCounts).reduce(
		(a, b) => (planCounts[a] > planCounts[b] ? a : b),
		''
	);

	let totalAmountReceived = new Intl.NumberFormat().format(subscriptions.reduce(
		(total, sub) => total + sub.payment_history.subscription.price,
		0
	));
	let bestSubscriber = subscriptions.reduce(
		(best, sub) =>
			sub.payment_history.subscription.price > best.payment_history.subscription.price ? sub : best,
		subscriptions[0]
	);

	// Additional Stats
	let paymentMethodCounts = subscriptions.reduce((acc, sub) => {
		const method = sub.payment_history.payment_method;
		acc[method] = (acc[method] || 0) + 1;
		return acc;
	}, {});

	let mostUsedPaymentMethod = Object.keys(paymentMethodCounts).reduce(
		(a, b) => (paymentMethodCounts[a] > paymentMethodCounts[b] ? a : b),
		''
	);


</script>

<!-- Statistics Cards -->
<Subscriptionstatistics {totalAmountReceived} {bestSubscriber} {mostSubscribedPlanName} {mostUsedPaymentMethod} />

<!-- Charts Container -->
<Subscriptioncharts {paymentMethodCounts} {planCounts} />

<!-- Subscriptions Table -->
<Adminsubscriptionstable {subscriptions}/>