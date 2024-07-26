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
	import { addFavoritePost, removeFavoritePost } from '$lib/dataservice/postFavoriteDataService';
	import { setToast } from '$lib/utilities/utils';
	// confetti
	import { tick } from 'svelte';
	import { Confetti } from 'svelte-confetti';

	//isFromFavorite is just a flag, if true, we send the user back to the
	//favorites page, else we send them back to the dashboard
	export let isFromFavorite = false;
	export let rsspost;

	let post = rsspost.feed;
	let back_url = isFromFavorite ? `/dashboard/${post.id}?redirectTo=/dashboard/favorites`: `/dashboard/${post.id}`;
	//console.log("Post on client follow: ", post)
	let defaultimgurl = 'https://media.themoviedb.org/t/p/original/svYyAWAH3RThMmHcCaJZ97jnTtT.jpg';
	let imageUrl;
	const descriptionLength = 100;
	let itemDescription = post.Channel.Item[0].Description;
	let itemTitle = post.Channel.Item[0].Title;
	let isHTMLDescription = checkForHTMLTags(itemDescription);
	// get the isFavorite tag from the main object
	$: isFavorite = rsspost.isFavorite;
	// if the description is in HTML format, we need to convert it to plain text
	function format(str) {
		let convertedStr = str.replace(/<\/?[^>]+(>|$)/g, '');
		return convertedStr.slice(0, descriptionLength) + '...';
	}

	// since the time will always be in the same format, we can just slice it
	function formatTime(tdata) {
		return tdata.slice(0, 10);
	}

	function handleCardClick() {
		const postData = {
			info: post,
			htmlstatus: isHTMLDescription,
			isFollowed: rsspost.isFollowed
		};
		saveSessionData('rssFeed', postData);
		goto(`/dashboard/${post.id}`);
	}
	function favoritePost() {
		//console.log('Post: ', post.id, '|| Feed: ', post.feed_id);
		try {
			const data = addFavoritePost(post.id, post.feed_id);
			if (data?.error) {
				handleError(data.error);
			} else {
				setToast(true, 'Post added to favorites successfully');
				rsspost.isFavorite = true;
				//console.log("Favorite Post");
			}
		} catch (err) {
			setToast(false, 'An error occurred while following the feed.');
		}
	}
	function unFavoritePost() {
		if (!isFavorite) {
			setToast(false, 'Post is not favorited');
			return;
		}
		console.log('UnFavorite Post');
		try {
			const data = removeFavoritePost(post.id);
			if (data?.error) {
				handleError(data.error);
			} else {
				setToast(true, 'Post removed from favorites successfully');
				rsspost.isFavorite = false;
			}
		} catch (err) {
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
		showConfetti();
		// Save favorite status if needed
	}
	// confetti
	let active = false;
	async function showConfetti() {
		active = false;
		await tick();
		active = true;
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
	<Card.Root
		class="h-full w-full transform space-y-4 overflow-hidden rounded-2xl p-6 shadow-lg transition-transform hover:scale-105"
	>
		<Card.Header class="flex flex-col items-center">
			<Card.Title class="w-full text-center text-xl font-semibold line-clamp-2">
				Feed: {itemTitle.slice(0, 50)}...
			</Card.Title>
			<a
				href={back_url}
				on:click={handleCardClick}
				class="overflow-hidden rounded-lg"
			>
				<img
					src={imageUrl}
					alt="Post"
					class="fixed-size-img mx-auto my-4 rounded-lg shadow-md transition-shadow hover:shadow-lg"
				/>
			</a>
		</Card.Header>
		<Card.Content class="custom-card-content p-4">
			<p class="font-small mb-4 truncate">
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
		<Card.Footer class="p-2.7 flex items-center justify-between gap-10">
			<Button
				on:click={() => goto('/dashboard')}
				class="bg-blue-500 text-white transition-colors hover:bg-blue-600"
			>
				{post.Channel.Language === '' ? 'English' : post.Channel.Language}
			</Button>
			<div class="flex items-center">
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Toggle variant="outline" aria-label="Toggle favorite">
							<CalendarRange class="mr-2 h-4 w-4" />
							{formatTime(post.updated_at)}
						</Toggle>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p class="text-xs">Created At</p>
					</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Toggle
							variant="outline"
							aria-label="Toggle favorite"
							class="ml-5 mr-4 "
							style="background-color: transparent; border: none;"
							on:click={toggleFavorite}
						>
							<div
								class={`heart-container flex h-8 w-8 items-center justify-center rounded-full transition-all duration-150 ease-in-out ${isFavorite ? 'bg-red-100' : 'bg-gray-200'}`}
							>
								<Heart
									class={`h-4 w-4 ${isFavorite ? 'text-red-500' : 'text-gray-800'} ${isFavorite ? 'scale-110' : 'scale-100'} transition-transform duration-150 ease-in-out`}
								/>
								{#if active}
								<Confetti x={[-0.5, 0.5]} y={[0.25, 1]} />
								{/if}
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
