<script>
    import { Share, Undo2 } from 'lucide-svelte';
    export let data;
    let feeds = data.feeds;

    function shareFeed(url) {
        const shareUrl = 'http://localhost:4000/v1/feeds'; // Replace with your actual share URL
        console.log(`Sharing feed: ${url}`);
        // window.open(shareUrl);
    }
</script>

<svelte:head>
	<title>My Follows • Aggregate</title>
</svelte:head>  
<a href="/dashboard" class="mt-10 flex items-center text-white bg-blue-500 hover:bg-blue-700 transition-colors duration-300 px-4 py-2 rounded-md">
    <Undo2 class="mr-2 h-5 w-5" />
    <span class="font-medium">Go Back</span>
</a>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-semibold mb-4">Feeds You Follow</h1>

    <div class="overflow-x-auto">
        <table class="min-w-full border-gray-200 shadow-md rounded-lg overflow-hidden">
            <thead>
                <tr class="bg-gray-100 text-gray-800 uppercase text-sm leading-normal">
                    <th class="py-3 px-6 text-left">Name</th>
                    <th class="py-3 px-6 text-left">URL</th>
                    <th class="py-3 px-6 text-left">Type</th>
                    <th class="py-3 px-6 text-left">Created At</th>
                    <th class="py-3 px-6 text-left">Updated At</th>
                    <th class="py-3 px-6 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                {#each feeds as feed}
                <tr class="border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <td class="py-3 px-6 text-left whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="mr-2">
                                <img src={feed.img_url} alt={feed.name} class="h-10 w-10 rounded-full" />
                            </div>
                            <span class="font-medium">{feed.name}</span>
                        </div>
                    </td>
                    <td class="py-3 px-6 text-left">
                        <a href={feed.url} target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">{feed.url}</a>
                    </td>
                    <td class="py-3 px-6 text-left">
                        <span class="bg-blue-200 text-blue-800 py-1 px-3 rounded-full text-xs">{feed.feed_type}</span>
                    </td>
                    <td class="py-3 px-6 text-left">{new Date(feed.created_at).toLocaleDateString()}</td>
                    <td class="py-3 px-6 text-left">{new Date(feed.updated_at).toLocaleDateString()}</td>
                    <td class="py-3 px-6 text-left">
                        <button class="flex items-center text-indigo-600 hover:text-indigo-900 focus:outline-none px-4 py-2 bg-indigo-100 hover:bg-indigo-200 rounded-md" onclick={() => shareFeed(feed.url)}>
                            <Share class="mr-2 h-5 w-5" /> <span>Share</span>
                        </button>
                    </td>
                </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<style>
    /* Additional styling can be applied here */
</style>
