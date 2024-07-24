<script>
    import Goback from '$lib/components/layouts/general/goback.svelte';
    import { fly, fade, slide } from 'svelte/transition';
    export let data;

    let back_url = "/feeds"
    console.log("Data: ",data.feed);

    export let feedData = data.feed;
    console.log("Feed Data: ", feedData);
  </script>
  
  <Goback {back_url} />

  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900" in:fly={{ y: 200, duration: 300 }} out:fade={{ duration: 400 }}>
    <div class="max-w-4xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      <div class="flex flex-col items-center px-6 py-4">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">{feedData.feed.name}</h1>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">{new Date(feedData.feed.created_at).toLocaleDateString()}</p>
        <img class="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-gray-300 dark:border-gray-700 mb-4" src={feedData.feed.img_url} alt="Feed">
        <p class="text-lg text-gray-700 dark:text-gray-300 text-center mb-4">{feedData.feed.feed_description}</p>
        <a href={feedData.feed.url} class="text-blue-500 hover:underline" target="_blank">Visit Feed</a>
      </div>
      <div class="flex flex-col md:flex-row items-center md:justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center mb-4 md:mb-0">
          <img class="w-16 h-16 rounded-full object-cover border-4 border-gray-300 dark:border-gray-700" src={feedData.user.user_img} alt="User">
          <div class="ml-4">
            <h2 class="text-xl font-bold text-gray-800 dark:text-white">{feedData.user.name}</h2>
            <p class="text-gray-600 dark:text-gray-400">User</p>
          </div>
        </div>
        <div class="text-center">
          <p class="text-lg font-semibold text-gray-800 dark:text-white">Liked Posts: <span class="text-blue-500">{feedData.liked_count}</span></p>
        </div>
      </div>
    </div>
  </div>
  