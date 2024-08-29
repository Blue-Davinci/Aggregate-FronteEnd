<script>
    import Alertconfirmationdialog from '$lib/components/layouts/general/alertconfirmationdialog.svelte';
    import {adminUpdateFeed} from '$lib/dataservice/admin/adminFeedsDataService.js';
    import { fly, fade } from 'svelte/transition';
    import {  XCircle, VenetianMask, ExternalLink } from 'lucide-svelte';

    export let data;
    const dlgMessage = "Are you sure you want to approve this feed? Once approved, it will be unleashed to the wild world of users, wolves, and dogs alike!";
    
    let pendingFeeds = data?.feeds ?? [];

    // Function to open the feed URL in a new tab
    function openFeedUrl(feedUrl) {
        window.open(feedUrl, '_blank');
    }

    async function handleApproveFeed(feed) {
        // Call the API to approve the feed

        console.log('Feed approved: ', feed);
    }
</script>
<div class="space-y-4">
    {#each pendingFeeds as { feed, feed_user, approval_status, priority }}
      <div
        in:fly={{ y: 50, duration: 500 }}
        out:fade
        class="relative flex flex-col lg:flex-row border rounded-lg shadow-md transition-transform transform hover:scale-[1.02] w-full max-w-4xl mx-auto bg-white dark:bg-gray-800"
      >
        <!-- Image Section -->
        <div class="flex-shrink-0 w-full lg:w-40 p-2 bg-gray-100 dark:bg-gray-700">
          <img
            src={feed.img_url}
            alt="Feed"
            class="w-full h-32 lg:h-full object-cover rounded-md"
          />
        </div>

        <!-- Content Section -->
        <div class="flex flex-col justify-between flex-grow p-4 text-gray-900 dark:text-gray-100 relative">
          <div>
            <h3 class="text-lg font-bold flex items-center space-x-2">
              {feed.name}
              {#if feed.is_hidden}
                <VenetianMask class="w-5 h-5 text-red-500 dark:text-red-300" />
              {/if}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Date Added: {new Date(feed.created_at).toLocaleDateString()}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">Updated At: {new Date(feed.updated_at).toLocaleDateString()} ({feed.version} time(s))</p>

            <!-- Feed URL with Test Button -->
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Feed URL: {feed.url}
              <button 
                class="ml-2 inline-flex items-center space-x-1 bg-blue-100 text-blue-600 rounded-full px-3 py-1 text-xs font-semibold hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-200 transition-transform transform hover:scale-105"
                on:click={() => openFeedUrl(feed.url)}
              >
                <ExternalLink class="w-4 h-4" /> <span>Test</span>
              </button>
            </p>

            <p class="text-sm text-gray-600 dark:text-gray-400">Feed Type: {feed.feed_type}</p>
            <p class="mt-2 text-gray-700 dark:text-gray-300">{feed.feed_description}</p>

            <!-- Days Pending Badge -->
            <div class="mt-2 flex items-center space-x-2">
              <span class="bg-yellow-200 text-yellow-700 text-xs font-semibold px-2 py-0.5 rounded-full dark:bg-yellow-800 dark:text-yellow-200 border border-yellow-400">
                {Math.floor((new Date() - new Date(feed.created_at)) / (1000 * 60 * 60 * 24))} days pending
              </span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="mt-4 flex space-x-4">
            <Alertconfirmationdialog on:continue={handleApproveFeed(feed)} {dlgMessage} />
            <button
              class="flex items-center space-x-1 bg-red-100 text-red-600 rounded-full px-3 py-1 text-sm font-semibold hover:bg-red-200 dark:bg-red-800 dark:text-red-200 transition-transform transform hover:scale-105"
            >
              <XCircle class="w-4 h-4" /> <span>Reject</span>
            </button>
          </div>

          <!-- Tags Section for Hidden Feed -->
          {#if feed.is_hidden}
            <div class="mt-4 flex space-x-2">
              <span class="bg-red-200 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-full dark:bg-red-800 dark:text-red-200 border border-red-400">
                Hidden
              </span>
            </div>
          {/if}
        </div>

        <!-- User Details Section -->
        <div class="flex items-center justify-center p-4 lg:w-48">
          <div class="flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full p-4">
            <img
              src={feed_user.user_img}
              alt="User"
              class="w-12 h-12 rounded-full"
            />
            <p class="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
              {feed_user.name}
            </p>
          </div>
        </div>

        <!-- Feed Type Badge -->
        <span
          class={`absolute top-4 right-4 px-2 py-1 text-xs font-semibold rounded-full ${
            feed.feed_type === 'diy' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
          }`}
        >
          {feed.feed_type}
        </span>
      </div>
    {/each}
</div>
