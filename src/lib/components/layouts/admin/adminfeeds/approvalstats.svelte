<script>
	import { XCircle,Clock, CheckCircle, CalendarMinus } from 'lucide-svelte';
    import { fly, fade } from 'svelte/transition';

    export let statistics ={};
</script>

<div
  class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
  in:fly={{ x: -200, duration: 1000 }}
  out:fade={{ duration: 300 }}
>
  <!-- Feed Approval Statistics Label -->
  <div class="col-span-3">
    <p class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
      Feed Approval Statistics
    </p>
  </div>

  <!-- Total Pending Feeds Card -->
  <div
    class="transform rounded-lg bg-yellow-500 p-4 text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-yellow-600"
  >
    <div class="flex items-center justify-between">
      <p class="truncate font-mono text-3xl font-extrabold">{statistics.total_pending_feeds}</p>
      <Clock class="h-10 w-10" />
    </div>
    <h3 class="mt-2 text-right font-sans text-sm font-medium">Pending Feeds</h3>
  </div>

  <!-- Total Approved Feeds Card -->
  <div
    class="transform rounded-lg bg-green-500 p-4 text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-green-600"
  >
    <div class="flex items-center justify-between">
      <p class="truncate font-mono text-3xl font-extrabold">{statistics.total_approved_feeds}</p>
      <CheckCircle class="h-10 w-10" />
    </div>
    <h3 class="mt-2 text-right font-sans text-sm font-medium">Approved Feeds</h3>
  </div>

  <!-- Total Rejected Feeds Card -->
  <div
    class="transform rounded-lg bg-red-500 p-4 text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-red-600"
  >
    <div class="flex items-center justify-between">
      <p class="truncate font-mono text-3xl font-extrabold">{statistics.total_rejected_feeds}</p>
      <XCircle class="h-10 w-10" />
    </div>
    <h3 class="mt-2 text-right font-sans text-sm font-medium">Rejected Feeds</h3>
  </div>

  <!-- Oldest Pending Feed Card (Full Width) -->
  <div
    class="transform col-span-1 md:col-span-2 lg:col-span-3 rounded-lg bg-purple-500 p-4 text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-purple-600"
  >
    <div class="flex items-center justify-between">
      <p class="truncate font-mono text-3xl font-extrabold">{statistics.oldest_pending_feed} days</p>
      <CalendarMinus class="h-10 w-10" />
    </div>
    <h3 class="mt-2 text-right font-sans text-sm font-medium">Oldest Pending Feed</h3>
  </div>
</div>