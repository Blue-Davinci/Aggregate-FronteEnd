<script>
    import { fly, fade, slide } from 'svelte/transition';
    import { XCircle, VenetianMask, ExternalLink, User, Clock, CheckCircle } from 'lucide-svelte';

    export let data;

    $: feeds = data?.feeds ?? [];
    $: statistics = data?.statistics ?? [];

    function togglePanel(index) {
        feeds = feeds.map((feed, i) => ({
            ...feed,
            isExpanded: i === index ? !feed.isExpanded : feed.isExpanded
        }));
    }

    // Open feed URL in a new tab
    function openFeedUrl(feedUrl) {
        window.open(feedUrl, '_blank');
    }
</script>

<!-- Layout -->
<div class="space-y-6">
    <!-- Feed Statistics -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h4 class="text-gray-700 dark:text-gray-300">Total Pending Feeds</h4>
            <p class="mt-1 text-2xl font-semibold text-yellow-600 dark:text-yellow-300">{statistics.admin_pending_feed_stats.total_pending_feeds}</p>
        </div>
        <div class="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h4 class="text-gray-700 dark:text-gray-300">Total Approved Feeds</h4>
            <p class="mt-1 text-2xl font-semibold text-green-600 dark:text-green-300">{statistics.admin_pending_feed_stats.total_approved_feeds}</p>
        </div>
        <div class="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h4 class="text-gray-700 dark:text-gray-300">Total Rejected Feeds</h4>
            <p class="mt-1 text-2xl font-semibold text-red-600 dark:text-red-300">{statistics.admin_pending_feed_stats.total_rejected_feeds}</p>
        </div>
        <div class="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h4 class="text-gray-700 dark:text-gray-300">Most Common Feed Type</h4>
            <p class="mt-1 text-xl font-semibold text-blue-600 dark:text-blue-300">{statistics.most_common_feed_type}</p>
        </div>
    </div>

    <!-- Feeds List -->
    <div class="space-y-4">
        {#each feeds as { feed, feed_user, approval_status, follow_count, isExpanded }, i}
            <div
                in:fly={{ y: 50, duration: 500 }}
                out:fade
                class="relative mx-auto flex w-full transform flex-col rounded-lg border bg-white shadow-md transition-transform hover:scale-[1.02] dark:bg-gray-800 lg:flex-row"
                class:opacity-50={feed.is_hidden}
            >
                <!-- Image Section -->
                <div class="w-full flex-shrink-0 bg-gray-100 p-2 dark:bg-gray-700 lg:w-40">
                    <img src={feed.img_url} alt="Feed" class="h-32 w-full rounded-md object-cover lg:h-full" />
                </div>

                <!-- Content Section -->
                <div class="relative flex flex-grow flex-col justify-between p-4 text-gray-900 dark:text-gray-100">
                    <div>
                        <h3 class="flex items-center space-x-2 text-lg font-bold">
                            {feed.name}
                            {#if feed.is_hidden}
                                <span
                                    class="ml-1 rounded-full border border-red-400 bg-red-200 px-2 py-0.5 text-xs font-semibold text-red-700 dark:bg-red-800 dark:text-red-200"
                                >
                                    Hidden
                                </span>
                                <VenetianMask class="ml-2 h-5 w-5 text-red-500 dark:text-red-300" />
                            {/if}
                        </h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            Date Added: {new Date(feed.created_at).toLocaleDateString()}
                        </p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            Updated At: {new Date(feed.updated_at).toLocaleDateString()} ({feed.version} version)
                        </p>

                        <!-- Follow Count -->
                        <p class="text-sm font-semibold text-blue-600 dark:text-blue-300">
                            Followers: {follow_count}
                        </p>

                        <!-- Feed URL with Test Button -->
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            Feed URL: {feed.url}
                            <button
                                class="ml-2 inline-flex transform items-center space-x-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600 transition-transform hover:scale-105 hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-200"
                                on:click={() => openFeedUrl(feed.url)}
                            >
                                <ExternalLink class="h-4 w-4" /> <span>Test</span>
                            </button>
                        </p>

                        <p class="text-sm text-gray-600 dark:text-gray-400">Feed Type: {feed.feed_type}</p>
                        <p class="mt-2 text-gray-700 dark:text-gray-300">{feed.feed_description}</p>

                        <!-- Approval Status Badge -->
                        <div class="mt-2 flex items-center space-x-2">
                            {#if approval_status === 'pending'}
                                <span
                                    class="rounded-full border border-yellow-400 bg-yellow-200 px-2 py-0.5 text-xs font-semibold text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
                                >
                                    Pending
                                </span>
                            {/if}
                            {#if approval_status === 'approved'}
                                <span
                                    class="rounded-full border border-green-400 bg-green-200 px-2 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-800 dark:text-green-200"
                                >
                                    Approved
                                </span>
                            {/if}
                            {#if approval_status === 'rejected'}
                                <span
                                    class="rounded-full border border-red-400 bg-red-200 px-2 py-0.5 text-xs font-semibold text-red-700 dark:bg-red-800 dark:text-red-200"
                                >
                                    Rejected
                                </span>
                            {/if}
                        </div>
                    </div>

                    <!-- Toggle Panel Button -->
                    <button
                        class="mt-4 text-sm font-semibold text-gray-700 dark:text-gray-300"
                        on:click={() => togglePanel(i)}
                    >
                        {isExpanded ? 'Hide Details' : 'Show Details'}
                    </button>
                </div>

                <!-- User Details Section -->
                <div class="flex items-center justify-center p-4 lg:w-48">
                    <div class="flex flex-col items-center justify-center rounded-full bg-gray-200 p-4 dark:bg-gray-700">
                        <img src={feed_user.user_img} alt="User" class="h-12 w-12 rounded-full" />
                        <p class="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                            {feed_user.name}
                        </p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            {feed_user.email}
                        </p>
                    </div>
                </div>

                <!-- Feed Type Badge -->
                <span
                    class={`absolute right-4 top-4 rounded-full px-2 py-1 text-xs font-semibold ${
                        feed.feed_type === 'diy' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                    }`}
                >
                    {feed.feed_type}
                </span>
            </div>

            <!-- Expandable Panel -->
            {#if isExpanded}
                <div class="p-4 bg-gray-50 dark:bg-gray-900" in:slide={{ duration: 300 }} out:fade>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        More detailed information about this feed can go here. This can include extended descriptions, additional metadata, or other relevant content.
                    </p>
                </div>
            {/if}
        {/each}
    </div>
</div>
