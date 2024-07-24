<script>
	import { Twitter, Facebook, Linkedin, MessageCircleHeart } from 'lucide-svelte';
	import AlertComponent from '$lib/components/layouts/general/alertcomponent.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { onMount } from 'svelte';
  
	export let channelTitle;
	export let imgURL;
  
	let currentUrl = '';
	
	function generateTwitterShareUrl(title, url) {
	  return `https://twitter.com/share?source=tweetbutton&text=${title}&url=${url}`;
	}
  
	function generateFacebookShareUrl(url) {
	  return `https://www.facebook.com/sharer.php?u=${url}`;
	}
  
	function generateLinkedInShareUrl(title, url, summary, source) {
	  let encodedUrl = encodeURIComponent(url);
	  let encodedTitle = encodeURIComponent(title);
	  let encodedSummary = encodeURIComponent(summary);
	  let encodedSource = encodeURIComponent(source);
	  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedSummary}&source=${encodedSource}`;
	}
  
	function generatePinterestShareUrl(url, media, description) {
	  return `https://pinterest.com/pin/create/button/?url=${url}&media=${media}&description=${description}`;
	}
  
	function copyToClipboard() {
	  navigator.clipboard
		.writeText(currentUrl)
		.then(() => {
		  console.log('Copied to the clipboard');
		})
		.catch((err) => {
		  console.error('Failed to copy URL: ', err);
		});
	}
  
	onMount(() => {
	  if (typeof window !== 'undefined') {
		currentUrl = window.location.href;
	  }
	});
  </script>
  
  <div class="mb-3 flex space-x-4">
	<Tooltip.Root>
	  <Tooltip.Trigger>
		<a
		  href={generateTwitterShareUrl(channelTitle, currentUrl)}
		  target="_blank"
		  class="inline-flex h-10 w-10 items-center justify-center rounded-full text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900"
		>
		  <Twitter class="h-6 w-6" />
		</a>
	  </Tooltip.Trigger>
	  <Tooltip.Content>
		<p>Share to Twitter</p>
	  </Tooltip.Content>
	</Tooltip.Root>
  
	<Tooltip.Root>
	  <Tooltip.Trigger>
		<a
		  href={generateFacebookShareUrl(currentUrl)}
		  target="_blank"
		  class="inline-flex h-10 w-10 items-center justify-center rounded-full text-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900"
		>
		  <Facebook class="h-6 w-6" />
		</a>
	  </Tooltip.Trigger>
	  <Tooltip.Content>
		<p>Share to Facebook</p>
	  </Tooltip.Content>
	</Tooltip.Root>
  
	<Tooltip.Root>
	  <Tooltip.Trigger>
		<a
		  href={generateLinkedInShareUrl(
			channelTitle,
			currentUrl,
			'Check out this post on Aggregate',
			'Aggregate'
		  )}
		  target="_blank"
		  class="inline-flex h-10 w-10 items-center justify-center rounded-full text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900"
		>
		  <Linkedin class="h-6 w-6" />
		</a>
	  </Tooltip.Trigger>
	  <Tooltip.Content>
		<p>Share to LinkedIn</p>
	  </Tooltip.Content>
	</Tooltip.Root>
  
	<Tooltip.Root>
	  <Tooltip.Trigger>
		<a
		  href={generatePinterestShareUrl(currentUrl, imgURL ?? '', channelTitle)}
		  target="_blank"
		  class="inline-flex h-10 w-10 items-center justify-center rounded-full text-red-600 hover:bg-red-100 dark:hover:bg-red-900"
		>
		  <MessageCircleHeart class="h-6 w-6" />
		</a>
	  </Tooltip.Trigger>
	  <Tooltip.Content>
		<p>Share to Pinterest</p>
	  </Tooltip.Content>
	</Tooltip.Root>
  
	<Tooltip.Root>
	  <Tooltip.Trigger>
		<a
		  href="#share"
		  on:click={copyToClipboard}
		  class="inline-flex h-10 w-10 items-center justify-center rounded-full text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900"
		>
		  <AlertComponent/>
		</a>
	  </Tooltip.Trigger>
	  <Tooltip.Content>
		<p>Copy link</p>
	  </Tooltip.Content>
	</Tooltip.Root>
  </div>
  