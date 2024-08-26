<script>
    import {CheckCircle} from 'lucide-svelte'
    import { fly, fade } from 'svelte/transition';
    export let plans;
</script>

    <!-- Statistics Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
    in:fly={{ x: -200, duration: 1000 }} 
    out:fade={{ duration: 300 }}>
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