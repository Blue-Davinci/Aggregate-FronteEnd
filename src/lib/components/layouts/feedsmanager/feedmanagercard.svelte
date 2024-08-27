<script>
  import { VenetianMask, Pencil } from 'lucide-svelte';
  import UpdateFeedModal from '$lib/components/layouts/feedsmanager/updatefeedmodal.svelte';

  export let form;
  export let feed;
  export let follow_count;

  let isModalOpen = false;
  let isLoading = false;

  const handleUpdate = () => {
    isModalOpen = true;
    //console.log('Original Feed Detail: ', feed);
  };
</script>

<div class="flex border-2 border-transparent hover:border-[#00a892] rounded-lg shadow-md hover:shadow-[#00a892] transition-shadow overflow-hidden w-full max-w-4xl mx-auto my-4 relative bg-white dark:bg-gray-800">
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
        {/if}
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-400">Date Added: {new Date(feed.created_at).toLocaleDateString()}</p>
      <p class="text-sm text-gray-600 dark:text-gray-400">Updated At: {new Date(feed.updated_at).toLocaleDateString()} ({feed.version} time(s))</p>
      <p class="text-sm text-gray-600 dark:text-gray-400">Feed Type: {feed.feed_type}</p>
      <p class="mt-2 text-gray-700 dark:text-gray-300">{feed.feed_description}</p>
    </div>
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
