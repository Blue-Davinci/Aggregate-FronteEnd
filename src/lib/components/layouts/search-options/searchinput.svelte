<script>
    import { createEventDispatcher } from 'svelte';
    import { onMount } from 'svelte';
    import { Input } from '$lib/components/ui/input';
    import { Search } from 'lucide-svelte';
    import lodash from 'lodash';

    export let searchQuery = '';

    //console.log('--Search Query:', searchQuery);

    const { debounce } = lodash;
  
    let searchTerm = searchQuery;
    const dispatch = createEventDispatcher();
  
    const handleInput = debounce((event) => {
      searchTerm = event.target.value;
      dispatch('search', { query: searchTerm });
    }, 500);
  </script>
  
  <div class="relative mb-4">
    <Input
      value={searchTerm}
      on:input={handleInput}
      placeholder="Search feeds..."
      class="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 dark:border-gray-700 shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
    />
    <Search class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
  </div>
  