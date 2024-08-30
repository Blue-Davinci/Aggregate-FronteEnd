<script>
  import Adminapprovalcards from '$lib/components/layouts/cards/adminapprovalcards.svelte';
  import Approvalstats from '$lib/components/layouts/admin/adminfeeds/approvalstats.svelte';

	export let data;

	$: pendingFeeds = data?.feeds ?? [];
  $: statistics = data?.statistics ?? {};

  //$: console.log('Pending Feeds: ', statistics);

</script>

<Approvalstats {statistics} />

<!-- Adjusted Feed Cards -->
<Adminapprovalcards {pendingFeeds} />

