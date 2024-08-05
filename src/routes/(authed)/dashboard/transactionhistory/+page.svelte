<script>
import Goback from '$lib/components/layouts/general/goback.svelte';
import PageHeader from '$lib/components/layouts/general/pageheader.svelte';
import Metamanager from '$lib/components/layouts/metatags/metamanager.svelte';
import EmptyState from '$lib/components/layouts/subscription/emptystate.svelte';
import Subscriptionstable from '$lib/components/layouts/subscription/subscriptionstable.svelte';
export let data;

let pagemetadata = data?.props?.metadata ?? {};
let pageInfo = {
    title: 'Transaction History',
    message: 'Review all your past transactions and stay on top of your financial activities.',
    icon: null
};
let subscriptions = data.subscriptions;
//console.log("Transaction History Data: ", data);
</script>

<Metamanager {pagemetadata} {pageInfo} />
<Goback />
<PageHeader title={pageInfo.title} message={pageInfo.message} icon={pageInfo.icon}/>

{#if subscriptions.length === 0}
  <EmptyState />
{:else}
  <Subscriptionstable {subscriptions} />
{/if}