<script>
  	import Metamanager from '$lib/components/layouts/metatags/metamanager.svelte';
  import {onMount} from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import Goback from '$lib/components/layouts/general/goback.svelte';
  import Postcomponent from '$lib/components/layouts/post/postcomponent.svelte';
  import { Unplug } from 'lucide-svelte';

  export let data;
  let pagemetadata = data?.props?.metadata ?? {};

  let redirectTo = '/dashboard'; 
  let pageInfo = {
		title: 'Post View',
		message: 'Dive into the latest community insights and updates.',
		icon: null
	};
  let isError = !data || data.error || !data.rss_post;
  let username = data?.props?.username;
  console.log('Error Data: ', isError?? data.error);
</script>

<svelte:head>
    <link rel="stylesheet" href="/loader.css" />
</svelte:head>

<Metamanager {pagemetadata} {pageInfo} />
<Goback />

<div in:fly={{ y: 200, duration: 800 }} out:fade>
{#if isError}
  <div class="flex flex-col items-center justify-center h-screen text-center">
    <Unplug class="w-24 h-24 text-gray-500 dark:text-gray-300" />
    <p class="mt-4 text-xl text-gray-700 dark:text-gray-200">
      There was an error and we could not load the post.
    </p>
  </div>
{:else}
  <Postcomponent fetchedData={data.rss_post} username={username}/>
{/if}
</div>