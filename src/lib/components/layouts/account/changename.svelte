<script>
  import { Input } from '$lib/components/ui/input';
  export let currentName = ''; // Prop to display the current username
  let newName = '';
</script>

<form action="?username" method="post" class="flex flex-col items-center space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full">
  <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Change Username</h2>

  <div class="mb-4 w-full">
      <label for="current-name" class="block text-gray-700 dark:text-gray-300 mb-1">Current Name:</label>
      <Input
          id="current-name"
          type="text"
          bind:value={currentName}
          readOnly
          class="w-full p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200"
      />
  </div>

  <div class="mb-4 w-full">
      <label for="new-name" class="block text-gray-700 dark:text-gray-300 mb-1">New Name:</label>
      <Input
          id="new-name"
          type="text"
          name="name"
          bind:value={newName}
          placeholder="Enter new username"
          class="w-full p-2 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
  </div>

  <button
      type="submit"
      class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-blue-500 transition duration-300"
  >
      Update Username
  </button>
</form>
