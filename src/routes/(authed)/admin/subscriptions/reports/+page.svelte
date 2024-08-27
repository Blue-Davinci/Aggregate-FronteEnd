<script>
	import Totalsreportcards from '$lib/components/layouts/admin/subscriptions/reports/totalsreportcards.svelte';
	import HiglightsReportcards from '$lib/components/layouts/admin/subscriptions/reports/highlightsreportcards.svelte';
	import Mainchartreports from '$lib/components/layouts/admin/subscriptions/reports/mainchartreports.svelte';
	import Quicklinks from '$lib/components/layouts/admin/subscriptions/reports/quicklinks.svelte';

	export let data;
	let singleSubscriptionReport = data?.stats?.single_subscription_report ?? {};

</script>

<div class="container mx-auto space-y-6 p-4">
	<!-- Report Cards Section -->
	<HiglightsReportcards {singleSubscriptionReport} />
	<Totalsreportcards {singleSubscriptionReport} />
	<!-- Charts Section -->
	<Mainchartreports {data} />
	<!-- Quick Links Section -->
	<Quicklinks />
</div>
