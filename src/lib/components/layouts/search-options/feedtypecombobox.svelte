<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import { getFeedTypesSearchOptions } from '$lib/dataservice/searchOptionsDataService';
    import * as Command from '$lib/components/ui/command';
    import * as Popover from '$lib/components/ui/popover';
    import { Button } from '$lib/components/ui/button';
    import { Check, ChevronsUpDown } from 'lucide-svelte';
    import { tick } from 'svelte';
    import { cn } from '$lib/utils.js';
  
    let isFetching = false;
    let feeds = [];
  
    async function fetchFeedsTypeSearchInfo() {
      isFetching = true;
      let data = await getFeedTypesSearchOptions();
      feeds = data?.feed_types ?? [];
      //console.log("Feed Types Data:", feeds);
      isFetching = false;
    }
  
    onMount(() => {
      fetchFeedsTypeSearchInfo(); // Fetch feeds when the component mounts
    });
  
    let open = false;
    let value = '';
    let searchQuery = '';
  
    const dispatch = createEventDispatcher();
  
    $: selectedFeed = feeds.find((f) => f.feed_id === value)?.feed_type ?? 'Filter by feed types...';
    $: filteredFeeds = feeds.filter(
      (f) =>
        f.feed_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.feed_id.toString().includes(searchQuery) // Convert feed_id to string for comparison
    );
  
    function closeAndFocusTrigger(triggerId) {
      open = false;
      tick().then(() => {
        document.getElementById(triggerId)?.focus();
      });
    }
  
    function handleSelect(feed, triggerId) {
      value = feed.feed_id;
      closeAndFocusTrigger(triggerId);
      dispatch('select', { feed_id: feed.feed_id, feed_type: feed.feed_type });
    }
  
    function handleReset(triggerId) {
      value = '';
      searchQuery = '';
      closeAndFocusTrigger(triggerId);
      dispatch('select', { feed_id: '', feed_type: '' });
    }
  </script>
  
  <svelte:head>
    <link rel="stylesheet" href="/loader-tiny.css" />
  </svelte:head>
  
  {#if isFetching}
    <div class="flex items-center space-x-2">
      <div class="tinyloader"></div>
      <span class="text-sm">Loading filters..</span>
    </div>
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
            <Command.Item
              value="Reset"
              onSelect={() => handleReset(ids.trigger)}
              class="px-4 py-2 transition duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Check class={cn('mr-2 h-4 w-4', value !== '' && 'text-transparent')} />
              Reset
            </Command.Item>
            {#each filteredFeeds as feed}
              <Command.Item
                value={feed.feed_type}
                onSelect={() => handleSelect(feed, ids.trigger)}
                class="px-4 py-2 transition duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Check class={cn('mr-2 h-4 w-4', value !== feed.feed_id && 'text-transparent')} />
                {feed.feed_type}
              </Command.Item>
            {/each}
          </Command.Group>
        </Command.Root>
      </Popover.Content>
    </Popover.Root>
  {/if}
  