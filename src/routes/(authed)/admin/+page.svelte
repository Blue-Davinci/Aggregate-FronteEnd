<script>
    import { Bar, Pie } from 'svelte-chartjs';
    import { fly, slide, fade } from 'svelte/transition';
    import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
    import { onMount } from 'svelte';
  
    let icons;
    let environmentClass = 'prod-font'; // Default to production font class
  
    // Register necessary Chart.js components
    Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);
  
    onMount(async () => {
      icons = await import('lucide-svelte');
  
      // Update font class based on environment
      if (data.health.system_info.environment !== 'production') {
        environmentClass = 'dev-font';
      }
    });
  
    export let data;
    //console.log(data);
  
    // User Statistics Data
    const userChartData = {
      labels: ['Total Users', 'Active Users', 'New Signups'],
      datasets: [
        {
          label: 'User Statistics',
          data: [
            data.statistics.user_statistics.total_users,
            data.statistics.user_statistics.active_users,
            data.statistics.user_statistics.new_signups,
          ],
          backgroundColor: ['#4A90E2', '#50E3C2', '#9013FE'],
        },
      ],
    };
  
    // Subscription Statistics Data
    const subscriptionChartData = {
      labels: ['Active Subscriptions', 'Cancelled Subscriptions', 'Expired Subscriptions'],
      datasets: [
        {
          label: 'Subscription Statistics',
          data: [
            data.statistics.subscription_statistics.active_subscriptions,
            data.statistics.subscription_statistics.cancelled_subscriptions,
            data.statistics.subscription_statistics.expired_subscriptions,
          ],
          backgroundColor: ['#F5A623', '#D0021B', '#BD10E0'],
        },
      ],
    };
  
    // Revenue Data (Pie Chart)
    const revenueChartData = {
      labels: ['Total Revenue'],
      datasets: [
        {
          data: [data.statistics.subscription_statistics.total_revenue],
          backgroundColor: ['#F5A623'],
        },
      ],
    };
  
    // Memory Usage Data (Debug Vars)
    const memoryChartData = {
      labels: ['Heap Alloc', 'Heap Sys', 'Heap Idle', 'Heap Inuse'],
      datasets: [
        {
          label: 'Memory Usage (bytes)',
          data: [
            data.debugVars.memstats.HeapAlloc,
            data.debugVars.memstats.HeapSys,
            data.debugVars.memstats.HeapIdle,
            data.debugVars.memstats.HeapInuse,
          ],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        },
      ],
    };
  
    // Comment Statistics Data
    const commentChartData = {
      labels: ['Total Comments', 'Recent Comments'],
      datasets: [
        {
          label: 'Comment Statistics',
          data: [
            data.statistics.comment_statistics.total_comments,
            data.statistics.comment_statistics.recent_comments,
          ],
          backgroundColor: ['#9013FE', '#4A90E2'],
        },
      ],
    };
  </script>
  
  <style>
    /* Additional styling for different environments */
    .dev-font {
      font-family: 'Courier New', Courier, monospace;
    }
  
    .prod-font {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
  </style>
  
  <div class={`p-8 ${environmentClass}`}
  in:fly={{ x: 200, duration: 1000 }}
  out:fade
  >
    <!-- Section: System Overview -->
    <div>
      <h1 class="text-2xl font-bold mb-6 text-gray-700 dark:text-gray-300">System Overview</h1>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- User Statistics Card -->
        <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 class="text-xl font-semibold mb-4 flex items-center">
            {#if icons}
              <svelte:component this={icons.Users} class="mr-2 text-blue-500 dark:text-blue-300" />
            {/if}
            User Statistics
          </h2>
          <div class="h-64">
            <Bar data={userChartData} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>
        </div>
  
        <!-- Subscription Statistics Card -->
        <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 class="text-xl font-semibold mb-4 flex items-center">
            {#if icons}
              <svelte:component this={icons.DollarSign} class="mr-2 text-green-500 dark:text-green-300" />
            {/if}
            Subscription Statistics
          </h2>
          <div class="h-64">
            <Bar data={subscriptionChartData} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>
        </div>
  
        <!-- Revenue Chart (Pie) -->
        <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 class="text-xl font-semibold mb-4 flex items-center">
            {#if icons}
              <svelte:component this={icons.Activity} class="mr-2 text-yellow-500 dark:text-yellow-300" />
            {/if}
            Revenue Overview
          </h2>
          <div class="h-64">
            <Pie data={revenueChartData} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>
        </div>
  
        <!-- Memory Usage (Debug Vars) -->
        <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 class="text-xl font-semibold mb-4 flex items-center">
            {#if icons}
              <svelte:component this={icons.Memory} class="mr-2 text-red-500 dark:text-red-300" />
            {/if}
            Memory Usage
          </h2>
          <div class="h-64">
            <Bar data={memoryChartData} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>
        </div>
      </div>
    </div>
  
    <!-- Section: Comment Statistics -->
    <div class="mt-8">
      <h1 class="text-2xl font-bold mb-6 text-gray-700 dark:text-gray-300">Comment Statistics</h1>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 class="text-xl font-semibold mb-4 flex items-center">
            {#if icons}
              <svelte:component this={icons.MessageSquare} class="mr-2 text-purple-500 dark:text-purple-300" />
            {/if}
            Comments Overview
          </h2>
          <div class="h-64">
            <Bar data={commentChartData} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>
        </div>
      </div>
    </div>
  
    <!-- Section: System Info -->
    <div class="mt-8">
      <h1 class="text-2xl font-bold mb-6 text-gray-700 dark:text-gray-300">System Info</h1>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Health Status Card -->
        <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 class="text-xl font-semibold mb-4 flex items-center">
            {#if icons}
              <svelte:component this={icons.CheckCircle} class="mr-2 text-green-500 dark:text-green-300" />
            {/if}
            System Health
          </h2>
          <div class="flex items-center mb-2">
            <span class="mr-2">Status:</span>
            <span
              class={`px-2 py-1 rounded-full text-white ${data.health.status === 'available' ? 'bg-green-500' : 'bg-red-500'}`}>
              {data.health.status}
            </span>
          </div>
          <div class="flex items-center mb-2">
            <span class="mr-2">Environment:</span>
            <span
              class={`px-2 py-1 rounded-full text-white ${data.health.system_info.environment === 'production' ? 'bg-blue-500' : 'bg-gray-500'}`}>
              {data.health.system_info.environment}
            </span>
          </div>
          <p><strong>Version:</strong> {data.health.system_info.version}</p>
        </div>
  
        <!-- Debug Variables (Goroutines, Requests) -->
        <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 class="text-xl font-semibold mb-4 flex items-center">
            {#if icons}
              <svelte:component this={icons.Settings} class="mr-2 text-gray-500 dark:text-gray-300" />
            {/if}
            Debug Information
          </h2>
          <p><strong>Goroutines:</strong> {data.debugVars.goroutines}</p>
          <p><strong>Requests:</strong> {data.debugVars.total_requests_received}</p>
          <p><strong>Processing Time (μs):</strong> {data.debugVars.total_processing_time_μs}</p>
        </div>
      </div>
    </div>
  </div>
  