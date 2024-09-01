<script>
	import { fly, fade, slide } from 'svelte/transition';
    import {
		XCircle,
		VenetianMask,
		ExternalLink,
		EyeOff,
		Eye,
		CheckCircle,
		Edit,
		Gem
	} from 'lucide-svelte';
    export let feeds;
    
	function togglePanel(index) {
		feeds = feeds.map((feed, i) => ({
			...feed,
			isExpanded: i === index ? !feed.isExpanded : feed.isExpanded
		}));
	}

	function openFeedUrl(feedUrl) {
		window.open(feedUrl, '_blank');
	}

	function navigateToApprovalPage(feedId) {
		window.location.href = `/admin/feeds/approvals?feedId=${feedId}`;
	}

	function handleHideUnhide(feedId) {
		// Logic for hiding or unhiding the feed
	}

	function handleDelete(feedId) {
		// Logic for deleting the feed
	}

	function handleUpdate(feedId) {
		// Logic for updating the feed, e.g., navigating to update page
		window.location.href = `/admin/feeds/update?feedId=${feedId}`;
	}

</script> 

<!-- Feeds List -->
<div class="space-y-4">
    {#each feeds as { feed, feed_user, approval_status, follow_count, isExpanded, priority }, i}
    {feed.is_hidden}
        <div
            in:fly={{ y: 50, duration: 500 }}
            out:fade
            class="relative mx-auto flex w-full transform flex-col rounded-lg border bg-white transition-transform hover:scale-[1.02] dark:bg-gray-800 lg:flex-row"
            class:shadow-lg={priority === 'high'}
            class:border-2={priority === 'high'}
            class:border-indigo-500={priority === 'high'}
            class:hover:shadow-indigo-400={priority === 'high'}
            class:opacity-50={feed.is_hidden}
            class:hover:shadow-md={priority === 'high'}
            style="padding: 0.5em;"
        >
            <!-- Email Tab -->
            <div
                class="absolute -top-3 left-1/2 mt-1 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 text-xs font-semibold text-white shadow-md"
            >
                {feed_user.email}
            </div>

            <!-- Image Section -->
            <div class="w-full flex-shrink-0 bg-gray-100 p-2 dark:bg-gray-700 lg:w-40">
                <img
                    src={feed.img_url}
                    alt="Feed"
                    class="h-32 w-full rounded-md object-cover lg:h-full"
                />
            </div>

            <!-- Content Section -->
            <div
                class="relative flex flex-grow flex-col justify-between p-4 text-gray-900 dark:text-gray-100"
            >
                <div class="flex items-center space-x-2 text-lg font-bold">
                    {#if priority === 'high'}
                        <Gem class="h-5 w-5 text-indigo-500" /> <!-- Gem icon for high priority -->
                    {/if}
                    <h3 class="flex items-center space-x-2">
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
                </div>

                <p class="text-sm text-gray-600 dark:text-gray-400">
                    Date Added: {new Date(feed.created_at).toLocaleDateString()}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    Updated At: {new Date(feed.updated_at).toLocaleDateString()} ({feed.version} version)
                </p>

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

                    {#if priority === 'high'}
                        <span
                            class="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-800 dark:text-indigo-200"
                        >
                            Priority
                        </span>
                    {/if}
                </div>

                <button
                    class="mt-4 text-sm font-semibold text-gray-700 dark:text-gray-300"
                    on:click={() => togglePanel(i)}
                >
                    {isExpanded ? 'Hide Actions' : 'Show Actions'}
                </button>
            </div>

            <!-- User Details Section -->
            <div class="flex flex-shrink-0 items-center justify-center p-4 lg:w-48">
                <div
                    class="flex flex-col items-center justify-center rounded-full bg-gray-200 p-4 shadow-lg transition-transform hover:rotate-6 dark:bg-gray-700"
                >
                    <img src={feed_user.user_img} alt="User" class="h-12 w-12 rounded-full" />
                    <p class="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                        {feed_user.name}
                    </p>
                </div>
            </div>

            <!-- Feed Type Badge -->
            <span
                class={`absolute right-4 top-4 rounded-full px-2 py-1 text-xs font-semibold ${feed.feed_type === 'diy' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}
            >
                {feed.feed_type}
            </span>
        </div>

        {#if isExpanded}
            <div
                class="space-y-4 rounded-b-lg bg-white p-4 dark:bg-gray-800"
                in:slide={{ duration: 300 }}
                out:fade
            >
                <div class="flex justify-center space-x-4">
                    <button
                        class="flex transform items-center space-x-1 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-600 transition-transform hover:scale-105 hover:bg-green-200 dark:bg-green-800 dark:text-green-200"
                        on:click={() => navigateToApprovalPage(feed.id)}
                    >
                        <CheckCircle class="h-4 w-4" /> <span>Approve/Reject</span>
                    </button>

                    <button
                        class="flex transform items-center space-x-1 rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-600 transition-transform hover:scale-105 hover:bg-yellow-200 dark:bg-yellow-800 dark:text-yellow-200"
                        on:click={() => handleHideUnhide(feed.id)}
                    >
                        {#if feed.is_hidden}
                            <Eye class="h-4 w-4" />
                            <span>Unhide</span>
                        {:else}
                            <EyeOff class="h-4 w-4" />
                            <span>Hide</span>
                        {/if}
                    </button>

                    <button
                        class="flex transform items-center space-x-1 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600 transition-transform hover:scale-105 hover:bg-red-200 dark:bg-red-800 dark:text-red-200"
                        on:click={() => handleDelete(feed.id)}
                    >
                        <XCircle class="h-4 w-4" /> <span>Delete</span>
                    </button>

                    <button
                        class="flex transform items-center space-x-1 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-600 transition-transform hover:scale-105 hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-200"
                        on:click={() => handleUpdate(feed.id)}
                    >
                        <Edit class="h-4 w-4" /> <span>Update</span>
                    </button>
                </div>
            </div>
        {/if}
    {/each}
</div>