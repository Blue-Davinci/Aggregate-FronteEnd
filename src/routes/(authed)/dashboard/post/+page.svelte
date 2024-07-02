<script>
    import { postDetail } from '$lib/store/postDetailStore.js';
    import { Separator } from '$lib/components/ui/separator';
    import { Button } from '$lib/components/ui/button';
    import { goto, beforeNavigate } from '$app/navigation';
    import { onMount} from 'svelte';
    import { fade, blur, fly, slide, scale } from "svelte/transition";
    import {getSessionPostData, clearSessionData} from '$lib/store/sessionStore.js';
  
    let post = $postDetail;
    let htmlstatus;
    if (post !== undefined || post !== null) {
      htmlstatus = post?.htmlstatus;
    }
    beforeNavigate((event) => {
        // Clear the session storage when navigating away
        clearSessionData('rssFeed');
        //sessionStorage.removeItem('rssFeed');
        console.log('Session storage cleared');
    });
    const savedPost = getSessionPostData('rssFeed');
        if (!savedPost?.error && savedPost !== null) {
            //postDetail.set(postData);
            
            let poster = savedPost?.info;
            let htmlstatuse = savedPost.htmlstatus;
            console.log("Local Session storage HtmlStatus: ", poster, "|| ", htmlstatuse);
        }
    onMount(() => {

    });
  </script>
          <a 
          href="/dashboard" 
          class="text-blue-500 hover:underline block mb-4">Go Back</a>
  
  <div class="container mx-auto p-4" in:fly={{ y: 200, duration: 1500 }} out:fade>
    <h1 class="text-2xl font-bold mb-4">Post Details</h1>
  
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
                <div class="text-base" >{@html item.Description}</div>
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
  </div>
  
  <style>
    .container {
      max-width: 800px;
    }
  </style>
  