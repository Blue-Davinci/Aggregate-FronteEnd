<script>
    import {Edit, PlusCircle, CheckCircle} from 'lucide-svelte'
    export let data;
    let plans = data.plans;
</script>
<div class="bg-gray-100 p-6 dark:bg-gray-900">
    <!-- Statistics Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div class="bg-blue-500 dark:bg-blue-700 text-white shadow-lg rounded-lg p-6 transform hover:scale-105 hover:bg-blue-600 dark:hover:bg-blue-800 transition duration-300">
            <div class="flex items-center">
                <CheckCircle class="text-white mr-2" />
                <h2 class="text-lg font-bold">Total Plans</h2>
            </div>
            <p class="text-4xl font-extrabold">{plans.length}</p>
        </div>
        <div class="bg-green-500 dark:bg-green-700 text-white shadow-lg rounded-lg p-6 transform hover:scale-105 hover:bg-green-600 dark:hover:bg-green-800 transition duration-300">
            <div class="flex items-center">
                <CheckCircle class="text-white mr-2" />
                <h2 class="text-lg font-bold">Most Used Plan</h2>
            </div>
            <p class="text-4xl font-extrabold">Free</p>
        </div>
        <div class="bg-purple-500 dark:bg-purple-700 text-white shadow-lg rounded-lg p-6 transform hover:scale-105 hover:bg-purple-600 dark:hover:bg-purple-800 transition duration-300">
            <div class="flex items-center">
                <CheckCircle class="text-white mr-2" />
                <h2 class="text-lg font-bold">Latest Plan</h2>
            </div>
            <p class="text-4xl font-extrabold">{plans[plans.length - 1].name}</p>
        </div>
    </div>

    <!-- Summary Section -->
    <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Available Plans</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each plans as plan}
                <div class={`flex items-center justify-between p-3 rounded-md shadow-sm ${plan.status === 'active' ? 'bg-gray-50 dark:bg-gray-700' : 'bg-red-50 dark:bg-red-700'}`}>
                    <span class="text-lg font-semibold text-blue-600 dark:text-blue-400">{plan.name}</span>
                    <span class="text-sm text-gray-500 dark:text-gray-400 capitalize badge">{plan.duration}</span>
                </div>
            {/each}
        </div>
    </div>



    <!-- Plans Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {#each plans as plan}
            <div class="plan-view bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col transition transform hover:scale-105 duration-300">
                <!-- Plan View Label -->
                <div class="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs font-bold uppercase p-2 text-center">
                    Plan View
                </div>
                <div class="relative">
                    <img class="w-full h-48 object-cover" src={plan.image} alt={plan.name} />
                </div>
                <div class="p-4 flex flex-col flex-grow items-center">
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h2>
                    <p class="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 p-3 rounded-md text-center mb-4">
                        {plan.description}
                    </p>
                    <ul class="text-gray-600 dark:text-gray-400 mb-4 space-y-1">
                        {#each plan.features as feature}
                            <li class="flex items-center space-x-2">
                                <CheckCircle class="text-blue-500" />
                                <span>{feature}</span>
                            </li>
                        {/each}
                    </ul>
                    <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 w-full">
                        <span class="text-lg font-semibold text-blue-600 dark:text-blue-400">{plan.amount == 0 ? 'Free' : `$${plan.amount}`}</span>
                        <span class="text-sm text-gray-500 dark:text-gray-400 capitalize badge">{plan.duration}</span>
                    </div>
                </div>
                <button class="absolute top-2 left-2 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-300">
                    <Edit />
                </button>
            </div>
        {/each}
    </div>

    <!-- Add Plan Button -->
    <button class="fixed bottom-4 right-4 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition duration-300">
        <PlusCircle />
    </button>
</div>
