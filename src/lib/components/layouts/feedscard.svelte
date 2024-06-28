<script>

	import Star from 'lucide-svelte/icons/star';
	import { Toggle } from '$lib/components/ui/toggle';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import { Label } from "$lib/components/ui/label";
	export let feed;

	let defaultimgurl = 'https://media.themoviedb.org/t/p/original/svYyAWAH3RThMmHcCaJZ97jnTtT.jpg';
	let imageUrl;
	let isFollowed = false;
	try {
		new URL(feed.img_url);
		imageUrl = feed.img_url;
	} catch {
		imageUrl = defaultimgurl;
	}
</script>

<svelte:head>
    <link rel="stylesheet" href="/card.css" />
</svelte:head>

<div class="feed-card">
	<Card.Root class="w-[400px] space-y-3">
		<Card.Header>
			<Card.Title>{feed.name}</Card.Title>
			<a href="/feeds">
				<img src="{imageUrl}" alt="Feed" class="fixed-size-img mx-auto my-1" />
			</a>
			<hr />
		</Card.Header>
		<Card.Content class="custom-card-content p-3">
			<p class="mb-4">
				{feed.name}
			</p>
			<p>Updated at: 	{feed.updated_at}</p>
			<Label for="feed-type" class="mt-4">Description:</Label>
			<p>{feed.feed_description.length > 100 ? `${feed.feed_description.slice(0, 100)}...` : feed.feed_description}</p>
		</Card.Content>
		<Card.Footer class="flex justify-center gap-10 p-4">
			<Button on:click={() => goto('/feeds')}>{feed.feed_type}</Button>
			<Tooltip.Root>
				<Tooltip.Trigger>
					<Toggle variant="outline" aria-label="Toggle favorite" class="mr-10" bind:pressed={isFollowed}>
						<Star class="h-4 w-4" />
					</Toggle>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>{isFollowed ? 'Unfollow feed' : 'Follow feed'}</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</Card.Footer>
	</Card.Root>
</div>

