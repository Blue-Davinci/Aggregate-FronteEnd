<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import { getErrorTypesSearchOptions } from '$lib/dataservice/searchOptionsDataService';
    import * as Command from '$lib/components/ui/command';
    import * as Popover from '$lib/components/ui/popover';
    import { Button } from '$lib/components/ui/button';
    import { Check, ChevronsUpDown } from 'lucide-svelte';
    import { tick } from 'svelte';
    import { cn } from '$lib/utils.js';

    let isFetching = false;
    let errors = [];

    async function fetchErrorTypesSearchInfo() {
      isFetching = true;
      let data = await getErrorTypesSearchOptions();
      errors = data?.error_types ?? [];
      isFetching = false;
    }

    onMount(() => {
      fetchErrorTypesSearchInfo(); // Fetch errors when the component mounts
    });

    let open = false;
    let value = '';
    let searchQuery = '';

    const dispatch = createEventDispatcher();

    $: selectedError = errors.find((e) => e.error_id === value)?.error_type ?? 'Filter by error types...';
    $: filteredErrors = errors.filter(
      (e) =>
        e.error_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.error_id.toString().includes(searchQuery) // Convert error_id to string for comparison
    );

    function closeAndFocusTrigger(triggerId) {
      open = false;
      tick().then(() => {
        document.getElementById(triggerId)?.focus();
      });
    }

    function handleSelect(error, triggerId) {
      value = error.error_id;
      closeAndFocusTrigger(triggerId);
      dispatch('select', { error_id: error.error_id, error_type: error.error_type });
    }

    function handleReset(triggerId) {
      value = '';
      searchQuery = '';
      closeAndFocusTrigger(triggerId);
      dispatch('select', { error_id: '', error_type: '' });
    }
</script>

<svelte:head>
  <link rel="stylesheet" href="/loader-tiny.css" />
</svelte:head>

{#if isFetching}
  <div class="flex items-center space-x-2">
    <div class="tinyloader"></div>
    <span class="text-sm">Loading filters...</span>
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
        {selectedError}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </Popover.Trigger>
    <Popover.Content
      class="w-full rounded-lg border border-gray-300 p-0 shadow-md dark:border-gray-700 md:w-[300px]"
    >
      <Command.Root>
        <Command.Input
          placeholder="Search error types..."
          class="mt-2 h-9 rounded-t-lg border-b border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700"
          bind:value={searchQuery}
        />
        <Command.Empty>
          {#if filteredErrors.length === 0}
            <div class="p-4 text-gray-600 dark:text-gray-400">No error type found.</div>
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
          {#each filteredErrors as error}
            <Command.Item
              value={error.error_type}
              onSelect={() => handleSelect(error, ids.trigger)}
              class="px-4 py-2 transition duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Check class={cn('mr-2 h-4 w-4', value !== error.error_id && 'text-transparent')} />
              {error.error_type}
            </Command.Item>
          {/each}
        </Command.Group>
      </Command.Root>
    </Popover.Content>
  </Popover.Root>
{/if}
