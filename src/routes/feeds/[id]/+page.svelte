<script>
  import Metamanager from '$lib/components/layouts/metatags/metamanager.svelte';
  import SamplePosts from '$lib/components/layouts/samples/sampleposts.svelte';
  import Goback from '$lib/components/layouts/general/goback.svelte';
  import Sharecomponent from '$lib/components/layouts/general/sharecomponent.svelte';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  export let data;
  let pagemetadata = data?.props?.metadata ?? {};

  let pageInfo = {
		title: 'Feed View',
		message: 'Explore the latest feeds from the community.',
		icon: null
	};

  let user = data.props;
  //console.log("Feed View Data:", data);
  export let feedData = data.feed;
  let animateImage = false;
  onMount(() => {
    animateImage = true;
  });
  
</script>

<Metamanager {pagemetadata} {pageInfo} />

<Goback/>

<div class="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 min-h-screen">
  <div class="max-w-4xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
    <div class="flex flex-col items-center px-6 py-4">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">{feedData.feed.name}</h1>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">{new Date(feedData.feed.created_at).toLocaleDateString()}</p>
      {#if animateImage}
        <div class="image-placeholder">
          <img class="animated-image w-20 h-20 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-gray-300 dark:border-gray-700 fade-transition" src={feedData.feed.img_url} alt="Feed" on:load={() => { animateImage = true; }} on:error={() => { animateImage = false; }} />
        </div>
      {/if}
      <p class="text-lg text-gray-700 dark:text-gray-300 text-center mb-4">{feedData.feed.feed_description}</p>
      <a href={feedData.feed.url} class="text-blue-500 hover:underline mb-2" target="_blank">Visit Feed</a>
      <Sharecomponent
        channelTitle={feedData.name}
        imgURL={feedData.url}
      />
      <SamplePosts feedID={feedData.feed.id} {user} />
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

<style>
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animated-image {
    animation: fadeInUp 0.8s ease-in-out;
    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  }

  /* Smooth fade effect for image */
  .fade-transition {
    transition: opacity 0.5s ease-in-out;
  }

  /* Image placeholder for better UX */
  .image-placeholder {
    background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
    width: 20rem;
    height: 20rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 9999px;
  }
</style>