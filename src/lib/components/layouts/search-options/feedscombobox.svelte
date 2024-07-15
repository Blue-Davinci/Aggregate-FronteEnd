<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import Tinyloader from '$lib/components/layouts/tinyloader.svelte';
	import { getFeedSearchOptions } from '$lib/dataservice/searchOptionsDataService';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import { Check, ChevronsUpDown } from 'lucide-svelte';
	import { tick } from 'svelte';
	import { cn } from '$lib/utils.js';

	let isFetching = false;
	let feeds = [];
	async function fetchFeedsSearchInfo() {
		isFetching = true;
		const data = await getFeedSearchOptions();
		feeds = data.feeds;
		isFetching = false;
	}

	onMount(() => {
		fetchFeedsSearchInfo(); // Fetch feeds when the component mounts
	});

	let open = false;
	let value = '';
	let searchQuery = '';
	const dispatch = createEventDispatcher();

	$: selectedFeed = feeds.find((f) => f.feed_id === value)?.feed_name ?? 'Filter by feeds...';
	$: filteredFeeds = feeds.filter(
		(f) =>
			f.feed_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			f.feed_id.toLowerCase().includes(searchQuery.toLowerCase())
	);

	function closeAndFocusTrigger(triggerId) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	function handleSelect(feed_id, triggerId) {
		value = feed_id;
		closeAndFocusTrigger(triggerId);
		dispatch('select', feed_id);
	}

	/* Debugging statements
  $: console.log("searchQuery:", searchQuery);
  $: console.log("filteredFeeds:", filteredFeeds);
  */
</script>

{#if isFetching}
	<Tinyloader message="Loading filters.."/>
{:else}
	<Popover.Root bind:open let:ids>
		<Popover.Trigger asChild let:builder>
			<Button
				builders={[builder]}
				variant="outline"
				role="combobox"
				aria-expanded={open}
				class="w-full justify-between rounded-full border border-gray-300 shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 md:w-[200px]"
			>
				{selectedFeed}
				<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
			</Button>
		</Popover.Trigger>
		<Popover.Content
			class="w-full rounded-lg border border-gray-300 p-0 shadow-md dark:border-gray-700 md:w-[300px]"
		>
			<Command.Root>
				<Command.Input
					placeholder="Search feeds..."
					class="mt-2 h-9 rounded-t-lg border-b border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700"
					bind:value={searchQuery}
				/>
				<Command.Empty>
					{#if filteredFeeds.length === 0}
						<div class="p-4 text-gray-600 dark:text-gray-400">No feed found.</div>
					{/if}
				</Command.Empty>
				<Command.Group>
					{#each filteredFeeds as feed}
						<Command.Item
							value={feed.feed_name}
							onSelect={() => handleSelect(feed.feed_id, ids.trigger)}
							class="px-4 py-2 transition duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700"
						>
							<Check class={cn('mr-2 h-4 w-4', value !== feed.feed_id && 'text-transparent')} />
							{feed.feed_name}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
{/if}
