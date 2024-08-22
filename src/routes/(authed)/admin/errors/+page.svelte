<script>
    import { Trash2, AlertTriangle, Server, Globe, CheckCircle } from 'lucide-svelte';
    export let data;
    const errorLogs = data.error_logs;

    // Function to handle deletion of an error log
    function deleteLog(logId) {
        console.log(`Delete log with ID: ${logId}`);
    }

    // Function to handle managing a feed
    function manageFeed(feedId) {
        console.log(`Manage feed with ID: ${feedId}`);
    }

    // Function to mark a log as resolved
    function markAsResolved(logId) {
        console.log(`Mark log with ID: ${logId} as resolved`);
        // Here, you can trigger the logic to update the resolved state in your backend
    }

    // Calculate the statistics
    let mostCommonErrorType = "";
    let mostFrequentErrorStatus = "";
    let mostProblematicUrl = "";

    // Helper function to get the most frequent item in an array
    function getMostFrequent(arr) {
        return arr.reduce((acc, item) => {
            acc[item] = (acc[item] || 0) + 1;
            return acc;
        }, {});
    }

    // Process the data to calculate the stats
    if (errorLogs.length > 0) {
        const errorTypeFrequency = getMostFrequent(errorLogs.map(log => log.error_type));
        mostCommonErrorType = Object.keys(errorTypeFrequency).reduce((a, b) => errorTypeFrequency[a] > errorTypeFrequency[b] ? a : b);

        const statusCodeFrequency = getMostFrequent(errorLogs.map(log => log.status_code));
        mostFrequentErrorStatus = Object.keys(statusCodeFrequency).reduce((a, b) => statusCodeFrequency[a] > statusCodeFrequency[b] ? a : b);

        mostProblematicUrl = errorLogs.reduce((prev, current) => (prev.occurence_count > current.occurence_count) ? prev : current).feed_details.feed_url;
    }
</script>

<section class="container mx-auto p-4">
    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <div class="transform rounded-lg bg-yellow-500 p-4 text-white shadow-lg transition-transform hover:scale-105 hover:shadow-2xl dark:bg-yellow-600">
            <div class="flex items-center justify-between">
                <p class="font-mono text-2xl font-extrabold">{mostCommonErrorType}</p>
                <AlertTriangle class="h-10 w-10" />
            </div>
            <h3 class="mt-2 text-right text-sm font-medium">Most Common Error Type</h3>
        </div>

        <div class="transform rounded-lg bg-purple-500 p-4 text-white shadow-lg transition-transform hover:scale-105 hover:shadow-2xl dark:bg-purple-600">
            <div class="flex items-center justify-between">
                <p class="font-mono text-2xl font-extrabold">{mostFrequentErrorStatus}</p>
                <Server class="h-10 w-10" />
            </div>
            <h3 class="mt-2 text-right text-sm font-medium">Most Frequent Error Status</h3>
        </div>

        <div class="transform rounded-lg bg-red-500 p-4 text-white shadow-lg transition-transform hover:scale-105 hover:shadow-2xl dark:bg-red-600">
            <div class="flex items-center justify-between">
                <p class="font-mono text-sm font-extrabold truncate">{mostProblematicUrl}</p>
                <Globe class="h-10 w-10" />
            </div>
            <h3 class="mt-2 text-right text-sm font-medium">Most Problematic URL</h3>
        </div>
    </div>

    <h1 class="text-2xl font-semibold mb-4">Scraper Error Logs</h1>

    <div class="grid grid-cols-1 gap-4">
        {#each errorLogs as log}
            <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <div class="flex justify-between items-center mb-4">
                    <div>
                        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Error Type: {log.error_type}</h2>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Occurred At: {new Date(log.occurred_at).toLocaleString()}</p>
                    </div>
                    <span class="px-3 py-1 rounded-full text-sm font-medium {log.resolved ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}">
                        {log.resolved ? 'Resolved' : 'Unresolved'}
                    </span>
                </div>
                
                <p class="text-gray-600 dark:text-gray-300 mb-2">Message: {log.message}</p>
                
                <div class="flex items-center space-x-4 mb-4">
                    <img src={log.feed_details.feed_img} alt={log.feed_details.feed_name} class="w-16 h-16 rounded-lg object-cover shadow-md" />
                    
                    <div class="flex-1">
                        <p class="text-gray-500 dark:text-gray-400"><strong>Feed:</strong> {log.feed_details.feed_name}</p>
                        <p class="text-gray-500 dark:text-gray-400"><strong>URL:</strong> <a href={log.feed_details.feed_url} class="text-blue-600 hover:underline" target="_blank">{log.feed_details.feed_url}</a></p>
                    </div>
                    
                    <a href={`/feeds/${log.feed_id}`} target="_blank" class="ml-4 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-semibold py-1 px-3 rounded-lg shadow-sm">
                        View Feed
                    </a>
                </div>

                <div class="flex justify-between items-center">
                    <div class="text-gray-500 dark:text-gray-400">
                        <p><strong>Status Code:</strong> {log.status_code}</p>
                        <p><strong>Retry Attempts:</strong> {log.retry_attempts}</p>
                    </div>

                    <div class="text-gray-500 dark:text-gray-400 text-right">
                        <p><strong>Last Occurrence:</strong> {new Date(log.last_occurrence).toLocaleString()}</p>
                        <p><strong>Tried to fetch </strong> {log.occurence_count} time(s)</p>
                    </div>
                </div>
                <hr class="mt-2"/>
                <div class="flex justify-end space-x-4 mt-4">
                    <!-- Manage Feed Button -->
                    <button on:click={() => manageFeed(log.feed_id)} 
                        class="text-blue-500 hover:text-blue-600 text-sm font-semibold transition-transform transform active:scale-95">
                        Manage Feed
                    </button>

                    <!-- Mark as Resolved Button -->
                    <button on:click={() => markAsResolved(log.id)} 
                        class="text-green-500 hover:text-green-600 transform transition-transform duration-150 ease-in-out hover:scale-105 active:scale-110">
                        <CheckCircle class="w-5 h-5"/>
                    </button>

                    <!-- Delete Button -->
                    <button on:click={() => deleteLog(log.id)} 
                        class="text-red-500 hover:text-red-600 transform transition-transform duration-150 ease-in-out hover:scale-105 active:scale-110">
                        <Trash2 class="w-5 h-5"/>
                    </button>
                </div>
            </div>
        {/each}
    </div>
</section>

<style>
    .container {
        max-width: 1200px;
    }
</style>
