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

    // followFeed() works by sending the feed_id to our helper function.
    // we use addFeedFollow to send the request to our API endpoint.
	async function followFeed() {
		try {
			const data = await addFeedFollow(feed.id);
			if (data?.error) {
				handleError(data.error);
			} else {
				setToast(true, 'Feed followed successfully');
                //update the feed's details
				isFollowed = true;
			}
		} catch (err) {
			setToast(false, 'An error occurred while following the feed.');
		}
	}

    // unfollowFeed() works by sending the ID of the follow UUID and not the feed_id.
    // we get this follow_id as a custom field in the from the server loader alongside
    // the isfollowed boolean!
    // we use unfollowFollowedFeed to send the request to our API endpoint.
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
                //update the feed's details
				isFollowed = false;
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
<div
	class="feed-card mx-auto flex max-w-3xl flex-col rounded-lg p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl"
>
	<Card.Root class="flex h-full w-full flex-row space-x-4">
		<img src={imageUrl} alt="Feed" class="feed-image self-start rounded-full object-cover" />
		<div class="flex flex-grow flex-col justify-between">
			<span
				class="mr-2 inline-block rounded bg-blue-500 px-2.5 py-0.5 text-sm font-semibold text-white"
			>
				{feed.feed_type}
			</span>
			<div class="flex-grow overflow-hidden">
				<Card.Title class="mb-2 mt-2 text-xl font-semibold">{feed.name}</Card.Title>
				<p class="mb-2 text-sm italic">
					Created at: {new Date(feed.created_at).toLocaleDateString()}
				</p>
				<p class="mb-2 text-sm">Updated at: {new Date(feed.updated_at).toLocaleDateString()}</p>
				<hr class="mb-2 border-gray-300" style="width: 90%;" />
				<Label for="feed-type" class="mb-1 mt-5 block text-sm font-medium">Description:</Label>
				<p class="mb-2 mr-2 overflow-hidden text-ellipsis text-sm">
					{feed.feed_description.length > 100
						? `${feed.feed_description.slice(0, 100)}...`
						: feed.feed_description}
				</p>
			</div>
			<div class="mt-2 flex items-center justify-between">
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Toggle
							variant="outline"
							aria-label="Toggle favorite"
							class="toggle-button mb-2 mr-2"
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
