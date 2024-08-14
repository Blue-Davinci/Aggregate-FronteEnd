<script>
    import { toTitleCase } from '$lib/utilities/utils';
    import { User, Shield, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-svelte';
    import { fly, fade } from 'svelte/transition';

    export let data;
    console.log(data);
    let users = data.users;

    let totalUsers = users.length;
    let totalAdmins = users.filter(user => user.permissions.some(p => p.includes("admin"))).length;
    let totalActivatedUsers = users.filter(user => user.activated).length;
    let totalNonActivatedUsers = users.filter(user => !user.activated).length;
    let emailDomains = users.map(user => user.email.split('@')[1]);
    let mostUsedDomain = emailDomains.sort((a,b) =>
        emailDomains.filter(v => v===a).length
        - emailDomains.filter(v => v===b).length
    ).pop();
</script>

<!-- Statistics Cards -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
    <div class="p-4 bg-blue-500 dark:bg-blue-600 text-white rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-xl">
        <div class="flex items-center justify-between">
            <p class="text-4xl font-extrabold font-mono truncate">{totalAdmins}</p>
            <Shield class="w-10 h-10" />
        </div>
        <h3 class="text-sm font-medium mt-2 text-right font-sans truncate">Total Admins</h3>
    </div>
    <div class="p-4 bg-green-500 dark:bg-green-600 text-white rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-xl">
        <div class="flex items-center justify-between">
            <p class="text-4xl font-extrabold font-mono truncate">{totalUsers - totalAdmins}</p>
            <User class="w-10 h-10" />
        </div>
        <h3 class="text-sm font-medium mt-2 text-right font-sans truncate">Total Regular Users</h3>
    </div>
    <div class="p-4 bg-teal-500 dark:bg-teal-600 text-white rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-xl">
        <div class="flex items-center justify-between">
            <p class="text-4xl font-extrabold font-mono truncate">{totalActivatedUsers}</p>
            <CheckCircle class="w-10 h-10" />
        </div>
        <h3 class="text-sm font-medium mt-2 text-right font-sans truncate">Activated Users</h3>
    </div>
    <div class="p-4 bg-red-500 dark:bg-red-600 text-white rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-xl">
        <div class="flex items-center justify-between">
            <p class="text-4xl font-extrabold font-mono truncate">{totalNonActivatedUsers}</p>
            <XCircle class="w-10 h-10" />
        </div>
        <h3 class="text-sm font-medium mt-2 text-right font-sans truncate">Non-Activated Users</h3>
    </div>
    <div class="p-4 bg-indigo-500 dark:bg-indigo-600 text-white rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-xl">
        <div class="flex items-center justify-between">
            <p class="text-4xl font-extrabold font-mono truncate">{mostUsedDomain}</p>
            <User class="w-10 h-10" />
        </div>
        <h3 class="text-sm font-medium mt-2 text-right font-sans truncate">Most Used Email Domain</h3>
    </div>
</div>

<!-- User Table -->
<table class="w-full table-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
    <thead class="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
        <tr>
            <th class="px-4 py-2 text-left font-semibold">Image</th>
            <th class="px-4 py-2 text-left font-semibold">Username</th>
            <th class="px-4 py-2 text-left font-semibold">Role</th>
            <th class="px-4 py-2 text-left font-semibold">Created At</th>
            <th class="px-4 py-2 text-left font-semibold">Status</th>
            <th class="px-4 py-2 text-right font-semibold">Details</th>
        </tr>
    </thead>
    <tbody>
        {#each users as user (user.id)}
            <tr class="hover:bg-blue-50 dark:hover:bg-blue-900 cursor-pointer transition-colors">
                <td class="px-4 py-2">
                    <img src={user.user_img} alt={user.name} class="w-12 h-12 rounded-full shadow-sm"/>
                </td>
                <td class="px-4 py-2">{toTitleCase(user.name)}</td>
                <td class="px-4 py-2">
                    <span class={`px-2 py-1 rounded-full text-xs font-semibold ${user.permissions.includes("admin:read") ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-800'}`}>
                        {user.permissions.includes("admin:read") ? 'Admin' : 'User'}
                    </span>
                </td>
                <td class="px-4 py-2">{new Date(user.created_at).toLocaleDateString()}</td>
                <td class="px-4 py-2">
                    {#if user.activated}
                        <CheckCircle class="text-green-500" />
                    {:else}
                        <XCircle class="text-red-500" />
                    {/if}
                </td>
                <td class="px-4 py-2 text-right">
                    <button on:click={() => user.showDetails = !user.showDetails} class="focus:outline-none">
                        {#if user.showDetails}
                            <ChevronUp class="text-gray-600 dark:text-gray-300" />
                        {:else}
                            <ChevronDown class="text-gray-600 dark:text-gray-300" />
                        {/if}
                    </button>
                </td>
            </tr>
            <!-- Expandable Panel -->
            {#if user.showDetails}
            <tr in:fly={{ x: 200, duration: 1000 }} out:fade={{ duration: 300 }}>
                <td colspan="6" class="p-4 bg-gray-50 dark:bg-gray-900">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Version:</strong> {user.version}</p>
                        </div>
                        <div>
                            <p><strong>Permissions:</strong></p>
                            <ul class="list-disc pl-5">
                                {#each user.permissions as permission}
                                    <li class="flex justify-between items-center">
                                        <span class={`px-2 py-1 mb-2 rounded-full text-xs font-semibold ${permission === "admin:read" ? 'bg-blue-200 text-blue-800' : permission === "admin:write" ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
                                            {permission !== "NULL" ? permission : 'User'}
                                        </span>
                                        {#if permission !== "NULL"}
                                            <button class="ml-4 px-2 py-0.5 bg-red-500 text-white rounded text-xs hover:bg-red-600 active:bg-red-700">Remove</button>
                                        {/if}
                                    </li>
                                {/each}
                            </ul>
                            <div class="flex justify-end space-x-2 mt-2">
                                {#if !user.permissions.includes("admin:read")}
                                    <button class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 text-sm">Make Admin</button>
                                {/if}
                                {#if !user.permissions.includes("admin:write")}
                                    <button class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 active:bg-yellow-700 text-sm">Make Moderator</button>
                                {/if}
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
            {/if}
        {/each}
    </tbody>
</table>
