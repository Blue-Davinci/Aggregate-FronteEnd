<script>
    import { fly, fade } from 'svelte/transition';
    import Alertconfirmationdialog from '$lib/components/layouts/general/alertconfirmationdialog.svelte';
	import { XCircle, VenetianMask, ExternalLink, Clock, CheckCircle, CalendarMinus } from 'lucide-svelte';
    import { invalidateAll } from '$app/navigation';
    import { setToast } from '$lib/utilities/utils.js';
    import {adminUpdateFeed} from '$lib/dataservice/admin/adminFeedsDataService.js';

    export let pendingFeeds = [];

    const dlgMessage =
    'Are you sure you want to approve this feed? Once approved, it will be unleashed to the wild world of users, wolves, and dogs alike!';
    const dlgMessageReject = 
    'Are you sure you want to reject this feed? This action will send it back to the drawing board, where it will face the scrutiny of its creators!'
    	// Function to open the feed URL in a new tab
	function openFeedUrl(feedUrl) {
		window.open(feedUrl, '_blank');
	}

    async function handleRejectFeed(event) {
        const feedID = event.detail;
        // Call the API to reject the feed
        const response = await adminUpdateFeed(feedID, { approval_status: 'rejected' });
        if (response) {
            setToast('success', 'Feed rejected successfully!');
            // remove the feed from the list
            pendingFeeds = pendingFeeds.filter((feed) => feed.feed.id !== feedID);
            invalidateAll();
        }
        //console.log('Feed rejected: ', feedID);
    }

	async function handleApproveFeed(event) {
		const feedID = event.detail;
		// Call the API to approve the feed
		const response = await adminUpdateFeed(feedID, { approval_status: 'approved' });
		if (response) {
			setToast('success', 'Feed approved successfully!');
			// remove the feed from the list
			pendingFeeds = pendingFeeds.filter((feed) => feed.feed.id !== feedID);
            invalidateAll();
		}
	}
</script>

<div class="space-y-4">
	{#each pendingFeeds as { feed, feed_user, approval_status, priority }}
		<div
			in:fly={{ y: 50, duration: 500 }}
			out:fade
			class="relative mx-auto flex w-full transform flex-col rounded-lg border bg-white shadow-md transition-transform hover:scale-[1.02] dark:bg-gray-800 lg:flex-row"
		>
			<!-- Image Section -->
			<div class="w-full flex-shrink-0 bg-gray-100 p-2 dark:bg-gray-700 lg:w-40">
				<img src={feed.img_url} alt="Feed" class="h-32 w-full rounded-md object-cover lg:h-full" />
			</div>

			<!-- Content Section -->
			<div
				class="relative flex flex-grow flex-col justify-between p-4 text-gray-900 dark:text-gray-100"
			>
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
						Updated At: {new Date(feed.updated_at).toLocaleDateString()} ({feed.version} time(s))
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

					<!-- Days Pending Badge -->
					<div class="mt-2 flex items-center space-x-2">
						<span
							class="rounded-full border border-yellow-400 bg-yellow-200 px-2 py-0.5 text-xs font-semibold text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
						>
							{Math.floor((new Date() - new Date(feed.created_at)) / (1000 * 60 * 60 * 24))} days pending
						</span>
					</div>
				</div>
        <hr class="mt-2 w-max-full"/>
				<!-- Action Buttons -->
				<div class="mt-4 flex space-x-4">
					<Alertconfirmationdialog on:continue={handleApproveFeed} {dlgMessage} itemID={feed.id} isPositive={true} />
                    <Alertconfirmationdialog on:continue={handleRejectFeed} dlgMessage={dlgMessageReject} itemID={feed.id} isPositive={false} />
				</div>
			</div>

			<!-- User Details Section -->
			<div class="flex items-center justify-center p-4 lg:w-48">
				<div
					class="flex flex-col items-center justify-center rounded-full bg-gray-200 p-4 dark:bg-gray-700"
				>
					<img src={feed_user.user_img} alt="User" class="h-12 w-12 rounded-full" />
					<p class="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
						{feed_user.name}
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
	{/each}
</div>