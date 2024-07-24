<script>
    import { invalidate } from '$app/navigation';
    let currentPassword = '';
    let newPassword = '';
    let confirmPassword = '';
  
    async function resetPassword() {
        alert('Password reset successful!');
    }
  </script>
  
  <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Reset Password</h2>
    <div class="mb-4">
      <label class="block text-gray-700 dark:text-gray-300 mb-2" for="newPassword">New Password</label>
      <input 
        class="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg" 
        type="password" 
        id="newPassword" 
        bind:value={newPassword} 
        placeholder="Enter new password" 
      />
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 dark:text-gray-300 mb-2" for="confirmPassword">Confirm New Password</label>
      <input 
        class="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg" 
        type="password" 
        id="confirmPassword" 
        bind:value={confirmPassword} 
        placeholder="Confirm new password" 
      />
    </div>
    <button 
      class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300" 
      on:click={resetPassword}>
      Reset Password
    </button>
  </div>
  