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

<div class="feed-card mx-auto max-w-3xl rounded-lg p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl">
	<Card.Root class="flex h-full w-full flex-col items-center space-y-4">
		<Card.Title class="text-xl font-semibold text-center">{feed.name}</Card.Title>
		<img src={imageUrl} alt="Feed" class="feed-image rounded-full object-cover" />
		<div class="flex flex-col items-center text-sm">
			<span class="inline-block rounded bg-blue-500 px-2.5 py-0.5 text-sm font-semibold text-white">
				{feed.feed_type}
			</span>
			<p class="italic">Created at: {new Date(feed.created_at).toLocaleDateString()}</p>
			<p>Updated at: {new Date(feed.updated_at).toLocaleDateString()}</p>
		</div>
		<hr class="border-gray-500" style="width:90%;" />
		<Label for="feed-type" class="block text-sm font-medium text-center">Description:</Label>
		<p class="text-sm text-center">
			{feed.feed_description.length > 100
				? `${feed.feed_description.slice(0, 100)}...`
				: feed.feed_description}
		</p>
		<div class="flex items-center justify-center mt-2">
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
	</Card.Root>
</div>
