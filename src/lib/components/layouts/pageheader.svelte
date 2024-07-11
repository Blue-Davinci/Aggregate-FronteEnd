<script>
    import { fly, slide} from 'svelte/transition';
    export let title;
    export let message;
    export let icon;
    
</script>

<!-- Horizontal Header Section -->
<div 
in:fly={{ y: 200, duration: 1000 }} out:slide={{ duration: 200 }}
class="header-section bg-gray-100 dark:bg-gray-700 p-6 rounded-lg mb-6 shadow-md">
    <div class="flex items-center justify-center">
            <svelte:component this={icon} class="text-gray-800 dark:text-white w-10 h-10 mr-4"/>
        <div class="text-center">
            <h1 class="text-3xl font-bold text-gray-800 dark:text-white">{title}</h1>
            <p class="text-gray-600 dark:text-gray-300">{message}</p>
        </div>
    </div>
</div>

<style>
    .header-section {
        width: 100%; /* Full width header */
        text-align: center; /* Center content horizontally */
    }
</style>
