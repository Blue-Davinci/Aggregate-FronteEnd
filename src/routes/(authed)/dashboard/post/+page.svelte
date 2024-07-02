<script>
  import { postDetail } from '$lib/store/postDetailStore.js';
  import { onMount } from 'svelte';
  import { getSessionPostData } from '$lib/store/sessionStore.js';
  import { fade } from "svelte/transition";
  import { Separator } from '$lib/components/ui/separator';

  let post;
  let htmlstatus;
  let isLoading = true;

  onMount(() => {
      post = getSessionPostData('rssFeed');
      if (post) {
          htmlstatus = post.htmlstatus;
          isLoading = false;
      }
  });
</script>
<svelte:head>
  <link rel="stylesheet" href="/loader.css" />
</svelte:head>
<a href="/dashboard" class="text-blue-500 hover:underline block mb-4">Go Back</a>

<div class="container mx-auto p-4" in:fade={{ duration: 300 }}>
  <h1 class="text-2xl font-bold mb-4">Post Details</h1>

  {#if isLoading}
      <div class="text-center py-20">
        <div class="saving-container">
          <span class="loader"></span>
          <span class="saving">Loading..</span>
        </div>
          <p class="mt-2 text-gray-600">Loading...</p>
      </div>
  {:else}
      {#if post}
          <div class="shadow-md rounded-lg p-6">
              <h2 class="text-xl font-semibold mb-4">{post.info.Channel.Title}</h2>
              <a href="{post.info.Channel.Link}" class="text-blue-500 hover:underline block mb-4">{post.info.Channel.Link}</a>
              <p class="mb-6">{post.info.Channel.Description}</p>
              <Separator class="my-4" />
              {#each post.info.Channel.Item as item}
                  <div class="mb-8">
                      {#if item.ImageURL}
                          <div class="flex justify-center">
                              <img src="{item.ImageURL}" alt="{item.Title}" class="rounded-md max-w-full h-auto">
                          </div>
                          <Separator class="my-4" />
                      {/if}
                      <div>
                          <h3 class="text-lg font-bold mb-2">{item.Title}</h3>
                          <a href="{item.Link}" class="text-blue-500 hover:underline block mb-2">{item.Link}</a>
                          <div class="flex justify-between items-center mb-4">
                              <p class="italic">Published on: {item.PubDate}</p>
                              <p class="italic">Updated on: {post.info.updated_at}</p>
                          </div>
                          {#if htmlstatus}
                              <div class="text-base">{@html item.Description}</div>
                          {:else}
                              <p class="text-base">{item.Description}</p>
                          {/if}
                      </div>
                      <Separator class="my-4" />
                  </div>
              {/each}
              <div class="text-center">
                  <a href="/dashboard" class="text-blue-500 hover:underline">Go Back</a>
              </div>
          </div>
      {:else}
          <Separator class="my-4" />
          <p class="text-gray-600">No post data available.</p>
          <Separator class="my-4" />
      {/if}
  {/if}
</div>

<style>
  .container {
      max-width: 800px;
  }
</style>
