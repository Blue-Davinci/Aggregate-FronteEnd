<script>
    import Updateplan from './updateplan.svelte';
    import { CheckCircle } from 'lucide-svelte';
    import { fly, fade } from 'svelte/transition';

    export let form;
    export let plans;

    function handleUpdatePlan(plan) {
		const updatedPlan = plan.detail;
        plans = plans.map(plan => plan.id === updatedPlan.id ? updatedPlan : plan);
	}
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4"
    in:fly={{ x: -200, duration: 1000 }} 
    out:fade={{ duration: 300 }}>
    {#each plans as plan}
        <div 
            class={`plan-view rounded-lg shadow-lg overflow-hidden flex flex-col transition transform hover:scale-105 duration-300 
            ${plan.status === 'inactive' ? 'bg-gray-200 dark:bg-gray-800 opacity-75 grayscale' : 'bg-white dark:bg-gray-800'}`}
        >
            <!-- Plan View Label -->
            <div class="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs font-bold uppercase p-2 text-center">
                Plan View
            </div>
            <div class="relative">
                <img class="w-full h-48 object-cover ${plan.status === 'inactive' ? 'opacity-50' : ''}" src={plan.image} alt={plan.name} />
                {#if plan.status === 'inactive'}
                    <span class="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        Not Visible
                    </span>
                {/if}
            </div>
            <div class="p-4 flex flex-col flex-grow items-center">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2 ${plan.status === 'inactive' ? 'opacity-75' : ''}">
                    {plan.name}
                </h2>
                <p class="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 p-3 rounded-md text-center mb-4 ${plan.status === 'inactive' ? 'opacity-75' : ''}">
                    {plan.description}
                </p>
                <ul class="text-gray-600 dark:text-gray-400 mb-4 space-y-1 ${plan.status === 'inactive' ? 'opacity-75' : ''}">
                    {#each plan.features as feature}
                        <li class="flex items-center space-x-2">
                            <CheckCircle class="text-blue-500" />
                            <span>{feature}</span>
                        </li>
                    {/each}
                </ul>
                <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 w-full ${plan.status === 'inactive' ? 'opacity-75' : ''}">
                    <span class="text-lg font-semibold text-blue-600 dark:text-blue-400">
                        {plan.amount == 0 ? 'Free' : `$${plan.amount}`}
                    </span>
                    <span class="text-sm text-gray-500 dark:text-gray-400 capitalize badge">
                        {plan.duration}
                    </span>
                </div>
            </div>
            <Updateplan {plan} {form} on:updatePlan={handleUpdatePlan}/>
        </div>
    {/each}
</div>
