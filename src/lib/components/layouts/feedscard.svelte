<script>
	import Star from 'lucide-svelte/icons/star';
	import { Toggle } from '$lib/components/ui/toggle';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Card from '$lib/components/ui/card';
	import { goto } from '$app/navigation';
	import { Label } from '$lib/components/ui/label';
	import { addFeedFollow, unfollowFollowedFeed } from '$lib/dataservice/feedfollowDataService';
	import { setToast } from '$lib/utilities/utils';

	export let feed;

	let defaultimgurl = 'https://media.themoviedb.org/t/p/original/svYyAWAH3RThMmHcCaJZ97jnTtT.jpg';
	let imageUrl;
	let isFollowed = feed?.isFollowed === true;

	async function followFeed() {
		try {
			const data = await addFeedFollow(feed.id);
			if (data?.error) {
				handleError(data.error);
			} else {
				setToast(true, 'Feed followed successfully');
				isFollowed = true;
				feed.isFollowed = true;
			}
		} catch (err) {
			setToast(false, 'An error occurred while following the feed.');
		}
	}

	async function unfollowFeed() {
		if (feed?.follow_id === undefined || feed.follow_id === null) {
			setToast(false, 'Feed is not followed');
			return;
		}
		console.log('Unfollowing feed: ', feed.id, " || Follow ID", feed.follow_id);
		try {
			const data = await unfollowFollowedFeed(feed.follow_id);
			if (data?.error) {
				handleError(data.error);
			} else {
				setToast(true, 'Feed unfollowed successfully');
				isFollowed = false;
				feed.isFollowed = false;
				feed.follow_id = null;
			}
		} catch (err) {
			setToast(false, 'An error occurred while unfollowing the feed.');
		}
	}

	function handleError(error) {
		if (error.follow === 'cannot follow the same feed twice') {
			setToast(false, 'Cannot follow the same feed twice.');
		} else if (error.status === 401) {
			setToast(false, 'You need to login to follow feeds');
		} else {
			setToast(false, 'An error occurred while following the feed.');
		}
	}

	function toggleFollow() {
		isFollowed ? unfollowFeed() : followFeed();
	}

	try {
		new URL(feed.img_url);
		imageUrl = feed.img_url;
	} catch {
		imageUrl = defaultimgurl;
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="/feedcard.css" />
</svelte:head>

<div class="feed-card mx-auto max-w-3xl rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
	<Card.Root class="flex h-full w-full flex-col">
		<div class="top-section flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-800 p-4">
			<img src={imageUrl} alt="Feed" class="feed-image rounded-full object-cover" />
			<Card.Title class="mt-2 text-xl font-semibold text-center">{feed.name}</Card.Title>
		</div>
		<div class="content-section flex flex-grow flex-col p-4">
			<div class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
				<p>Created: {new Date(feed.created_at).toLocaleDateString()}</p>
				<p>Updated: {new Date(feed.updated_at).toLocaleDateString()}</p>
			</div>
			<span class="inline-block rounded bg-blue-500 px-2.5 py-0.5 text-sm font-semibold text-white mb-2">
				{feed.feed_type}
			</span>
			<hr class="mb-2 border-gray-300" />
			<Label for="feed-type" class="mb-1 block text-sm font-medium">Description:</Label>
			<p class="overflow-hidden text-ellipsis text-sm mb-2">
				{feed.feed_description.length > 100
					? `${feed.feed_description.slice(0, 100)}...`
					: feed.feed_description}
			</p>
			<div class="mt-2 flex items-center justify-center">
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Toggle
							variant="outline"
							aria-label="Toggle favorite"
							class="toggle-button"
							pressed={isFollowed}
							on:click={toggleFollow}
						>
							<Star class="h-4 w-4" />
							{isFollowed ? 'Unfollow feed' : 'Follow feed'}
						</Toggle>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p class="text-xs">{isFollowed ? 'Unfollow feed' : 'Follow feed'}</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</div>
		</div>
	</Card.Root>
</div>
