<script>
    import CalendarRange from 'lucide-svelte/icons/calendar-range';
	import { Toggle } from '$lib/components/ui/toggle';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import { Label } from '$lib/components/ui/label';
	import { checkForHTMLTags } from '$lib/utilities/utils.js';
	import { Separator } from '$lib/components/ui/separator';
	import {saveSessionData} from '$lib/store/sessionStore.js';
	import { postDetail } from '$lib/store/postDetailStore.js';
	export let post;

	let defaultimgurl = 'https://media.themoviedb.org/t/p/original/svYyAWAH3RThMmHcCaJZ97jnTtT.jpg';
	let imageUrl;
	// check if the description is html content
	const descriptionLength = 100;
	let itemDescription = post.Channel.Item[0].Description;
	let itemTitle = post.Channel.Item[0].Title;
	let isHTMLDescription = checkForHTMLTags(itemDescription);

	function format(str) {
		let convertedStr = str.replace(/<\/?[^>]+(>|$)/g, '');
		return convertedStr.slice(0, descriptionLength) + '...';
	}
    function handleCardClick(){
        //store the post in local storage passing the data and HTML status
        console.log("Setting session data ")
		const postData = {
                "info": post,
                "htmlstatus": isHTMLDescription
            }
        /*postDetail.set(
            postData
        );*/
		//save session data
		saveSessionData('rssFeed', postData);
		goto('/dashboard/post');
    }
	try {
		new URL(post.Channel.Item[0].ImageURL);
		imageUrl = post.Channel.Item[0].ImageURL;
	} catch {
		imageUrl = defaultimgurl;
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="/card.css" />
</svelte:head>

<div class="feed-card">
	<Card.Root class="h-full w-full space-y-4 overflow-hidden p-6 shadow-lg rounded-2xl transition-transform transform hover:scale-105">
		<Card.Header class="flex flex-col items-center">
			<Card.Title class="w-full text-center text-xl font-semibold">
				Feed: {itemTitle.slice(0, 50)}...
			</Card.Title>
			<a href="/dashboard/post" on:click={() => handleCardClick()} class="rounded-lg overflow-hidden">
				<img src={imageUrl} alt="Post" class="fixed-size-img mx-auto my-4 rounded-lg shadow-md hover:shadow-lg transition-shadow" />
			</a>
		</Card.Header>
		<Card.Content class="custom-card-content p-4">
			<p class="mb-4 truncate font-small">
				{post.Channel.Item[0].Title}
			</p>
			<p class="text-sm">Published: {post.Channel.Item[0].PubDate}</p>
			<Separator class="my-4" />
			<Label for="feed-type" class="text-lg font-semibold">Description:</Label>
			<Separator class="my-2" />
			{#if isHTMLDescription}
				<p class="text-base font-normal">{format(itemDescription)}</p>
			{:else}
				<p class="text-base">{itemDescription.slice(0, descriptionLength)}...</p>
			{/if}
		</Card.Content>
		<Card.Footer class="flex justify-center gap-10 p-2.7">
			<Button on:click={() => goto('/dashboard')} class="bg-blue-500 text-white hover:bg-blue-600 transition-colors">
				{post.Channel.Language === '' ? 'English' : post.Channel.Language}
			</Button>
			<Tooltip.Root>
				<Tooltip.Trigger>
					<Toggle variant="outline" aria-label="Toggle favorite" class="mr-10">
						<CalendarRange class="h-4 w-4 mr-2" />
						{post.updated_at}
					</Toggle>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p class="text-xs">Created At</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</Card.Footer>
	</Card.Root>
	
	
</div>
