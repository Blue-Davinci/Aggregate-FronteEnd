<script>
    	import { setToast } from '$lib/utilities/utils';
	import {
		addAdministrationUserPermission,
		deleteAdministrationUserPermission
	} from '$lib/dataservice/admin/permissionsDataService';
    import { fly, fade } from 'svelte/transition';
    import { CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-svelte';
    import { toTitleCase } from '$lib/utilities/utils';
    import { createEventDispatcher } from 'svelte';
    export let users;

    const dispatch = createEventDispatcher();

    // console.log("Users: ", users);

    async function makeAdmin(user_id) {
        let adminPermissions = [
            "admin:read", 
            "admin:write"
        ];
        await addPermissions(user_id, adminPermissions);
    }

    async function makeModerator(user_id) {
        let modPermissions = [
            "moderator:read", 
            "moderator:write"
        ];
        await addPermissions(user_id, modPermissions);
    }

    async function removePermission(user_id, permission) {
		if (!user_id || !permission) {
			setToast(false, 'Error! User ID or Permission is required.');
			return;
		}

		let response = await deleteAdministrationUserPermission(user_id, permission);
		if (response.success) {
			users = users.map((user) => {
				if (user.id === user_id) {
					const updatedPermissions = user.permissions.filter((p) => p !== permission);
					return {
						...user,
						permissions: updatedPermissions.length > 0 ? updatedPermissions : ['NULL']
					};
				}
				return user;
			});
			dispatch('removePermission', { users });
            setToast(true, `Success, ${permission} permission has been removed.`, 2000);
		} else {
			setToast(false, 'Error! Permission could not be removed.', 2000);
		}
		console.log('Removing permission: ', permission, ' || ', user_id);
	}

	async function addPermissions(user_id, permissions) {
		if (!user_id || !permissions) {
			setToast(false, 'Error! User ID or Permission is required.');
			return;
		}

		let response = await addAdministrationUserPermission(user_id, permissions);
		if (response.success) {
			users = users.map((user) => {
				if (user.id === user_id) {
					// Filter out "NULL" from the permissions array
					const updatedPermissions = [...user.permissions, ...permissions].filter(
						(permission) => permission !== 'NULL'
					);
					return {
						...user,
						permissions: updatedPermissions
					};
				}
				return user;
			});
			dispatch('addPermission', { users });
			setToast(true, 'Success! User is now a Super User', 2000);
		} else {
			setToast(false, 'Sorry, permissions could not be added.', 2000);
		}
	}
</script>

<!-- User Table -->
<table class="w-full table-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg"
    in:fly={{ x: 200, duration: 1000 }}
    out:fade
>
    <thead class="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white dark:bg-gradient-to-r dark:from-purple-700 dark:via-pink-700 dark:to-red-700">
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
            <tr class="hover:bg-purple-100 dark:hover:bg-purple-900 cursor-pointer transition-colors">
                <td class="px-4 py-2">
                    <img src={user.user_img} alt={user.name} class="w-12 h-12 rounded-full shadow-sm"/>
                </td>
                <td class="px-4 py-2">{toTitleCase(user.name)}</td>
                <td class="px-4 py-2">
                    <span class={`px-2 py-1 rounded-full text-xs font-semibold 
                        ${user.permissions.some(permission => permission.startsWith("admin:")) 
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                            : user.permissions.some(permission => permission.startsWith("moderator:"))
                            ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white'
                            : 'bg-gray-200 text-gray-800'}`}>
                        {user.permissions.some(permission => permission.startsWith("admin:")) 
                            ? 'Admin' 
                            : user.permissions.some(permission => permission.startsWith("moderator:")) 
                            ? 'Moderator' 
                            : 'User'}
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
                <td colspan="6" class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-inner">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p class="text-sm font-medium text-gray-600 dark:text-gray-300">
                                <span class="font-semibold text-gray-800 dark:text-gray-100">User ID:</span> {user.id}
                            </p>
                            <p class="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                                <span class="font-semibold text-gray-800 dark:text-gray-100">Email:</span> {user.email}
                            </p>
                            <p class="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                                <span class="font-semibold text-gray-800 dark:text-gray-100">Updated:</span> {user.version} times
                            </p>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-600 dark:text-gray-300">
                                <span class="font-semibold text-gray-800 dark:text-gray-100">Permissions:</span>
                            </p>
                            <ul class="list-disc pl-5 mt-2">
                                {#each user.permissions as permission}
                                    <li class="flex justify-between items-center">
                                        <span class={`px-2 py-1 mb-2 rounded-full text-xs font-semibold 
                                            ${permission.startsWith("admin:read")
                                                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                                                : permission.startsWith("admin:write")
                                                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                                                : permission.startsWith("moderator:read")
                                                ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white'
                                                : permission.startsWith("moderator:write")
                                                ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white'
                                                : 'bg-gray-200 text-gray-800'}`}>
                                            {permission !== "NULL" ? permission : 'User'}
                                        </span>
                                        {#if permission !== "NULL"}
                                            <button on:click={() =>removePermission(user.id, permission)} class="ml-4 px-2 py-0.5 bg-red-500 text-white rounded text-xs hover:bg-red-600 active:bg-red-700">Remove</button>
                                        {/if}
                                    </li>
                                {/each}
                            </ul>
                            <div class="flex justify-end space-x-2 mt-2">
                                {#if !user.permissions.includes("admin:read")}
                                    <button on:click={()=>makeAdmin(user.id)} class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 text-sm">Make Admin</button>
                                {/if}
                                {#if !user.permissions.includes("moderator:read")}
                                    <button on:click={()=>makeModerator(user.id)} class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 active:bg-yellow-700 text-sm">Make Moderator</button>
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
