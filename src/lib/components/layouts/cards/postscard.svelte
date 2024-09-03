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
	import { tick } from 'svelte';
	import { Confetti } from 'svelte-confetti';

	export let isFromFavorite = false;
	export let rsspost;
	let post = rsspost.feed;
	let back_url = isFromFavorite ? `/dashboard/${post.id}?redirectTo=/dashboard/favorites` : `/dashboard/${post.id}`;
	let defaultimgurl = 'https://media.themoviedb.org/t/p/original/svYyAWAH3RThMmHcCaJZ97jnTtT.jpg';
	let imageUrl;
	const descriptionLength = 100;
	let itemDescription = post.Channel.Item[0].Description;
	let itemContent = post.Channel.Item[0].Content;
	let itemTitle = post.Channel.Item[0].Title;
	let isHTMLDescription = checkForHTMLTags(itemDescription);
	let isHTMLContent = checkForHTMLTags(itemContent);
	$: isFavorite = rsspost.isFavorite;

	function format(str) {
		let convertedStr = str.replace(/<\/?[^>]+(>|$)/g, '');
		return convertedStr.slice(0, descriptionLength) + '...';
	}

	function formatTime(tdata) {
		return tdata.slice(0, 10);
	}

	function handleCardClick() {
		const postData = {
			info: post,
			htmlstatus: isHTMLDescription,
			htmlstatuscontent: isHTMLContent,
			isFollowed: true
		};
		saveSessionData('rssFeed', postData);
		goto(`/dashboard/${post.id}`);
	}

	function favoritePost() {
		try {
			const data = addFavoritePost(post.id, post.feed_id);
			if (data?.error) {
				handleError(data.error);
			} else {
				setToast(true, 'Post added to favorites successfully', 2000);
				rsspost.isFavorite = true;
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
		try {
			const data = removeFavoritePost(post.id);
			if (data?.error) {
				handleError(data.error);
			} else {
				setToast(true, 'Post removed from favorites successfully', 2000);
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

<div class="flex flex-col justify-between h-[700px] max-w-[430px] p-4 mx-auto mt-4 rounded-lg border border-transparent transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:border-gray-300 hover:shadow-lg">
	<Card.Root class="h-full w-full space-y-4 rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-md transition-transform duration-300">
		<Card.Header class="flex flex-col items-center">
			<Card.Title class="w-full text-center text-xl font-semibold line-clamp-2 text-gray-900 dark:text-gray-100">
				Feed: {itemTitle.slice(0, 50)}...
			</Card.Title>
			<a href={back_url} on:click={handleCardClick} class="w-full mt-4 mb-4 rounded-lg">
				<img
					src={imageUrl}
					alt="Post"
					class="w-full h-[200px] object-cover rounded-lg shadow-sm transition-shadow duration-300 hover:shadow-md"
				/>
			</a>
		</Card.Header>
		<Card.Content class="space-y-4 overflow-hidden max-h-[200px]">
			<p class="truncate font-small mb-4 text-gray-700 dark:text-gray-300">{post.Channel.Item[0].Title}</p>
			<p class="text-sm text-gray-600 dark:text-gray-400">Published: {post.Channel.Item[0].PubDate}</p>
			<Separator />
			<Label for="feed-type" class="text-lg font-semibold text-gray-900 dark:text-gray-100">Description:</Label>
			<Separator />
			{#if isHTMLDescription}
				<p class="text-base font-normal text-gray-700 dark:text-gray-300">{format(itemDescription)}</p>
			{:else}
				<p class="text-base text-gray-700 dark:text-gray-300">{itemDescription.slice(0, descriptionLength)}...</p>
			{/if}
		</Card.Content>
		<Card.Footer class="flex items-center justify-between gap-4 p-2">
			<Button on:click={() => goto('/dashboard')} class="bg-blue-500 text-white transition-colors hover:bg-blue-600">
				{post.Channel.Language === '' ? 'English' : post.Channel.Language}
			</Button>
			<div class="flex items-center">
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Toggle variant="outline" aria-label="Toggle favorite">
							<CalendarRange class="mr-2 h-4 w-4 text-gray-600 dark:text-gray-400" />
							{formatTime(post.updated_at)}
						</Toggle>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p class="text-xs text-gray-700 dark:text-gray-300">Created At</p>
					</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Toggle
							variant="outline"
							aria-label="Toggle favorite"
							class="ml-5 mr-4"
							style="background-color: transparent; border: none;"
							on:click={toggleFavorite}
						>
							<div
								class={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-150 ease-in-out ${isFavorite ? 'bg-red-100 dark:bg-red-800' : 'bg-gray-200 dark:bg-gray-700'}`}
							>
								<Heart
									class={`h-4 w-4 ${isFavorite ? 'text-red-500' : 'text-gray-800 dark:text-gray-200'} ${isFavorite ? 'scale-110' : 'scale-100'} transition-transform duration-150 ease-in-out`}
								/>
								{#if active}
								<Confetti x={[-0.5, 0.5]} y={[0.25, 1]} />
								{/if}
							</div>
						</Toggle>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p class="text-xs text-gray-700 dark:text-gray-300">{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</div>
		</Card.Footer>
	</Card.Root>
</div>
