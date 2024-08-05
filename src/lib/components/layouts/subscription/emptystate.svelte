<script>
    import { Snail } from 'lucide-svelte';
  </script>
  
  <div class="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead class="bg-gray-50 dark:bg-gray-800">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Plan</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Start Date</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">End Date</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"></th>
        </tr>
      </thead>
      <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
        <tr>
          <td colspan="6" class="px-6 py-12 whitespace-nowrap text-center">
            <div class="flex flex-col items-center justify-center">
              <Snail class="w-16 h-16 text-gray-600 dark:text-gray-400 mb-4" />
              <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">No Subscriptions Found</h2>
              <p class="text-gray-600 dark:text-gray-400 mb-4">It looks like you don't have any subscriptions yet. Start subscribing to enjoy our services.</p>
              <a href="/subscriptions" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Go to Subscriptions</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  