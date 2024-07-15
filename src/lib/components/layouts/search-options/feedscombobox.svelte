<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import * as Command from "$lib/components/ui/command";
  import * as Popover from "$lib/components/ui/popover";
  import { Button } from "$lib/components/ui/button";
  import { Check, ChevronsUpDown } from "lucide-svelte";
  import { tick } from "svelte";
  import { cn } from "$lib/utils.js";

  // Sample data
  const feeds = [
    { feed_id: "84eac4a2-63d4-47f9-b927-2a0ca41352e2", feed_name: "The Truth About Cars" },
    { feed_id: "7a467466-e92c-44ed-a206-3a460c867f3b", feed_name: "Lane's Blog" },
    { feed_id: "d54414ed-a09f-42c6-9d5c-cebcf04fb848", feed_name: "Engadget" },
    { feed_id: "62dfa525-3e6e-428c-8694-80ded8a71b0a", feed_name: "Megaphone Podcast" },
    { feed_id: "1cf1649d-00fe-4602-a774-84cbaa5668de", feed_name: "Android Authority" },
    { feed_id: "ccabe4bd-97da-4454-900d-0e7f00bc59d6", feed_name: "BBC Cricket" },
    { feed_id: "f0b1cdfa-6955-4de8-85ad-a2d8c2a2dc62", feed_name: "101 Cook Books" },
    { feed_id: "c5f950a6-290d-4a38-a817-f49f2bb52b2f", feed_name: "Scott Hanselman" },
    { feed_id: "a8cbfebc-44b0-4555-b3ed-d22ade604c6c", feed_name: "All About Android" },
    { feed_id: "7e6cb75c-70e5-4908-87c9-e33a224b7499", feed_name: "The Guardian UK" },
    { feed_id: "d29836ab-ad69-4797-af4d-5ffd42d32366", feed_name: "Sydney Morning Australia" },
    { feed_id: "e372884a-e587-4b2a-a802-3573236f0600", feed_name: "BBC News" },
    { feed_id: "c4de09a3-45a5-48db-921a-52ed4f578fa9", feed_name: "Reddit Android" }
  ];

  let open = false;
  let value = "";
  let searchQuery = "";
  const dispatch = createEventDispatcher();

  $: selectedFeed = feeds.find(f => f.feed_id === value)?.feed_name ?? "Select a feed...";
  $: filteredFeeds = feeds.filter(f => 
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

  // Debugging statements
  $: console.log("searchQuery:", searchQuery);
  $: console.log("filteredFeeds:", filteredFeeds);
</script>

<Popover.Root bind:open let:ids>
  <Popover.Trigger asChild let:builder>
    <Button
      builders={[builder]}
      variant="outline"
      role="combobox"
      aria-expanded={open}
      class="w-[200px] justify-between"
    >
      {selectedFeed}
      <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </Popover.Trigger>
  <Popover.Content class="w-[300px] p-0">
    <Command.Root>
      <Command.Input 
        placeholder="Search feeds..." 
        class="h-9"
        bind:value={searchQuery}
      />
      <Command.Empty>
        {#if filteredFeeds.length === 0}
          No feed found.
        {/if}
      </Command.Empty>
      <Command.Group>
        {#each filteredFeeds as feed}
          <Command.Item
            value={feed.feed_name}
            onSelect={() => handleSelect(feed.feed_id, ids.trigger)}
          >
            <Check
              class={cn(
                "mr-2 h-4 w-4",
                value !== feed.feed_id && "text-transparent"
              )}
            />
            {feed.feed_name}
          </Command.Item>
        {/each}
      </Command.Group>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
