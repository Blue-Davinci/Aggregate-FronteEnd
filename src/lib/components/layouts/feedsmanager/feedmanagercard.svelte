<script>
  import { fly, fade } from 'svelte/transition';
  import { VenetianMask, Pencil, ChevronDown, ChevronUp } from 'lucide-svelte';
  import UpdateFeedModal from '$lib/components/layouts/feedsmanager/updatefeedmodal.svelte';

  export let form;
  export let feed;
  export let follow_count;
  export let approval_status;
  export let rejected_feed;

  let isModalOpen = false;
  let isLoading = false;
  let isExpanded = false;

  const handleUpdate = () => {
    isModalOpen = true;
  };

  const toggleExpand = () => {
    isExpanded = !isExpanded;
  };
</script>

<div
  in:fly={{ y: 50, duration: 500 }}
  out:fade
  class={`flex border-2 rounded-lg shadow-md transition-all overflow-hidden w-full max-w-4xl mx-auto my-4 relative bg-white dark:bg-gray-800 hover:scale-[1.02] ${
    approval_status === 'pending'
      ? 'border-yellow-500 shadow-yellow-500'
      : approval_status === 'rejected'
      ? 'border-red-500 shadow-red-500'
      : 'border-transparent hover:border-[#00a892] hover:shadow-[#00a892]'
  } ${feed.is_hidden ? 'opacity-80' : ''}`}
>
  <!-- Image section -->
  <div class="w-32 flex-shrink-0 p-2">
    <img src={feed.img_url} alt="Feed" class="w-full h-full object-cover rounded-md"/>
  </div>

  <!-- Content section -->
  <div class="flex flex-col justify-between p-4 flex-grow text-gray-900 dark:text-gray-100">
    <div>
      <h3 class="text-lg font-bold flex items-center">
        {feed.name}
        {#if feed.is_hidden}
          <VenetianMask class="ml-2 text-red-500 dark:text-red-400 border rounded-full transform transition-transform duration-300 hover:scale-110" />
          <span class="ml-2 bg-gray-300 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-gray-600 dark:text-gray-200">Hidden Feed</span>
        {/if}
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-400">Date Added: {new Date(feed.created_at).toLocaleDateString()}</p>
      <p class="text-sm text-gray-600 dark:text-gray-400">Updated At: {new Date(feed.updated_at).toLocaleDateString()} ({feed.version} time(s))</p>
      <p class="text-sm text-gray-600 dark:text-gray-400">Feed Type: {feed.feed_type}</p>
      <p class="mt-2 text-gray-700 dark:text-gray-300">{feed.feed_description}</p>
    </div>

    <!-- Pending Badge -->
    {#if approval_status === 'pending'}
      <div class="mt-4">
        <span class="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Pending Approval</span>
      </div>
    {/if}

    <!-- Rejected Details Expansion -->
    {#if approval_status === 'rejected'}
      <div class="mt-4">
        <button on:click={toggleExpand} class="flex items-center text-red-700 dark:text-red-300">
          {#if isExpanded}
            <ChevronUp class="w-4 h-4 mr-2"/>
            Hide Rejection Details
          {:else}
            <ChevronDown class="w-4 h-4 mr-2"/>
            View Rejection Details
          {/if}
        </button>
        {#if isExpanded}
          <div class="mt-2 p-2 bg-red-50 dark:bg-red-900 rounded-md text-sm text-red-700 dark:text-red-300" in:fly={{ x: 200, duration: 1000 }} out:fade={{ duration: 300 }}>
            <p><strong>Rejected By:</strong> {rejected_feed.rejected_by_user_name}</p>
            <p><strong>Reason:</strong> {rejected_feed.reason}</p>
            <p><strong>Rejected At:</strong> {new Date(rejected_feed.rejected_at).toLocaleDateString()}</p>
          </div>
        {/if}
      </div>
    {/if}
  </div>

  <!-- Actions section -->
  <div class="z-[1] absolute top-2 right-2 flex items-center space-x-2">
    <button class="bg-gray-200 dark:bg-gray-700 p-1 rounded-full transform transition-transform duration-300 hover:scale-110" on:click={handleUpdate}>
      <Pencil class="w-4 h-4 text-gray-600 dark:text-gray-300"/>
    </button>
  </div>

  <!-- Follows count section -->
  <div class="flex items-center justify-center bg-gray-100 dark:bg-gray-900 relative">
    <div class="text-center p-4">
      <p class="text-lg font-semibold">{follow_count}</p>
      <p class="text-sm text-gray-600 dark:text-gray-400">Follows</p>
    </div>
  </div>

  <!-- Update button -->
  <UpdateFeedModal bind:isOpen={isModalOpen} form={form} feed={feed} isLoading={isLoading}/>
</div>
