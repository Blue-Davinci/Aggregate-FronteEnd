<script>
    import Metamanager from "$lib/components/layouts/metatags/metamanager.svelte";
	import PageHeader from '$lib/components/layouts/general/pageheader.svelte';
    import Subscriptionplans from "$lib/components/layouts/cards/subscriptionplans.svelte";
    import {ShoppingBasket} from 'lucide-svelte'
    import { fade, fly, slide } from 'svelte/transition';
    export let data;
    
    let user = data.props.user;
    let pagemetadata = data?.props?.metadata ?? {};
    let pageInfo = {
        title: 'Subscription Plans',
        message: 'Choose the best plan that suits your needs and enjoy premium features.',
        icon: ShoppingBasket
    };

    const plans = data.plans;
    console.log(plans);
    
</script>

<Metamanager {pagemetadata} {pageInfo} />

<PageHeader title={pageInfo.title} message={pageInfo.message} icon={pageInfo.icon} />

<div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8"
in:fly={{ y: 100, duration: 700 }} out:slide={{ duration: 600 }}
>
    <div class="max-w-7xl w-full space-y-8">
        <h1 class="text-4xl font-extrabold text-center text-white">Choose Your Plan</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each plans as plan}
                <Subscriptionplans {plan} {user}/>
            {/each}
        </div>
    </div>
</div>
