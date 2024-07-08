<script>
	import CalendarRange from 'lucide-svelte/icons/calendar-range';
	import Heart from 'lucide-svelte/icons/heart';
	import { Toggle } from '$lib/components/ui/toggle';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import { Label } from '$lib/components/ui/label';
	import { checkForHTMLTags } from '$lib/utilities/utils.js';
	import { Separator } from '$lib/components/ui/separator';
	import { saveSessionData } from '$lib/store/sessionStore.js';
	import {addFavoritePost, removeFavoritePost} from '$lib/dataservice/postFavoriteDataService';
	import { setToast } from '$lib/utilities/utils';
	export let post;

	let defaultimgurl = 'https://media.themoviedb.org/t/p/original/svYyAWAH3RThMmHcCaJZ97jnTtT.jpg';
	let imageUrl;
	const descriptionLength = 100;
	let itemDescription = post.Channel.Item[0].Description;
	let itemTitle = post.Channel.Item[0].Title;
	let isHTMLDescription = checkForHTMLTags(itemDescription);
	let isFavorite = post.isFavorite;

	// if the description is in HTML format, we need to convert it to plain text
	function format(str) {
		let convertedStr = str.replace(/<\/?[^>]+(>|$)/g, '');
		return convertedStr.slice(0, descriptionLength) + '...';
	}

	// since the time will always be in the same format, we can just slice it
	function formatTime(tdata){
		return tdata.slice(0, 10);
	}

	function handleCardClick() {
		const postData = {
			"info": post,
			"htmlstatus": isHTMLDescription
		};
		saveSessionData('rssFeed', postData);
		goto('/dashboard/post');
	}
	function favoritePost(){
		console.log("Post: ", post.id, "|| Feed: ", post.feed_id);
		try{
			const data = addFavoritePost(post.id, post.feed_id);
			if (data?.error){
				handleError(data.error);
			}else{
				setToast(true, 'Post added to favorites successfully');
				isFavorite = true;
				//console.log("Favorite Post");
			}
		}catch(err){
			setToast(false, 'An error occurred while following the feed.');
		}
		
	}
	function unFavoritePost(){
		if (!isFavorite){
			setToast(false, 'Post is not favorited');
			return;
		}
		console.log("UnFavorite Post");
		try{
			const data = removeFavoritePost(post.id);
			if (data?.error){
				handleError(data.error);
			}else{
				setToast(true, 'Post removed from favorites successfully');
				isFavorite = false;
			}
		}catch(err){
			setToast(false, 'An error occurred while adding this post to your favorites.');
		
		}
	}
	function handleError(error) {
		if (error.follow === 'cannot favorite a post twice') {
			setToast(false, 'cannot favorite a post twice.');
		} else {
			setToast(false, 'An error occurred while following the feed.');
		}
	}
	function toggleFavorite() {
		isFavorite ? unFavoritePost() : favoritePost();
		// Save favorite status if needed
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
		<Card.Footer class="flex justify-between items-center gap-10 p-2.7">
			<Button on:click={() => goto('/dashboard')} class="bg-blue-500 text-white hover:bg-blue-600 transition-colors">
				{post.Channel.Language === '' ? 'English' : post.Channel.Language}
			</Button>
			<div class="flex items-center">
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Toggle variant="outline" aria-label="Toggle favorite">
							<CalendarRange class="h-4 w-4 mr-2" />
							{formatTime(post.updated_at)}
						</Toggle>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p class="text-xs">Created At</p>
					</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Toggle variant="outline" aria-label="Toggle favorite" class="ml-5 mr-4 " style="background-color: transparent; border: none;" on:click={toggleFavorite}>
							<div
								class={`heart-container flex items-center justify-center h-8 w-8 rounded-full transition-all duration-150 ease-in-out ${isFavorite ? 'bg-red-100' : 'bg-gray-200'}`}
							>
								<Heart class={`h-4 w-4 ${isFavorite ? 'text-red-500' : 'text-gray-800'} ${isFavorite ? 'scale-110' : 'scale-100'} transition-transform duration-150 ease-in-out`} />
							</div>
						</Toggle>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p class="text-xs">{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</div>
		</Card.Footer>
		
	</Card.Root>
</div>