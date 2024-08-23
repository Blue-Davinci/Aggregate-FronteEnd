<script>
    import { setToast } from '$lib/utilities/utils';
	import { deleteAdministrationPermission } from '$lib/dataservice/admin/permissionsDataService';
	import { Edit, Trash2, Lock, FilePenLine } from 'lucide-svelte';
	import { fly, fade } from 'svelte/transition';
    import {updateAdministrationPermission} from '$lib/dataservice/admin/permissionsDataService';
	import { createEventDispatcher } from 'svelte';

	export let permissions;
	export let getColorByPermission;

	const dispatch = createEventDispatcher();
	let editingId = null;
	let updatedPermissionName = '';

	const editPermission = (id, permissionName) => {
		editingId = id;
		updatedPermissionName = permissionName; // Initialize the updated name with the original name
	};

	const updatePermission = async(id, originalPermissionName) => {
		if (updatedPermissionName === originalPermissionName) {
            setToast(false, 'No changes detected, exiting edit mode.', 2000);
		} else {
			console.log(`Saving permission with ID: ${id}, New Name: ${updatedPermissionName}`);
            setToast(true, `Saving permission with ID: ${id}, New Name: ${updatedPermissionName}`, 2000);
            let response = await updateAdministrationPermission(id, updatedPermissionName)
            if (response.success) {
                console.log("Updated")
                const index = permissions.findIndex(p => p.permission_id === id);
				if (index !== -1) {
					permissions[index].permissions[0] = updatedPermissionName;
				}
            }else{
                console.log("not updated: ", response);
            }
		}
		editingId = null; // Exit editing mode
	};

	const deletePermission = async (id) => {
		if (!id) {
			setToast(false, 'Error! Permission ID is required.');
			return;
		}
		let response = await deleteAdministrationPermission(id);
		if (response.success) {
			// dispatch the event for the update
			dispatch('deletePermission', id);
			setToast(true, 'Success! Permission deleted successfully.');
		} else {
			setToast(false, 'Error! Permission could not be deleted.');
		}
	};
</script>

<h2 class="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-100">Permissions Overview</h2>
<div
	class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
	in:fly={{ x: 200, duration: 1000 }}
	out:fade
>
	{#each permissions as permission}
		<div class="rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800"
			in:fly={{ x: 200, duration: 1000 }}
			out:fade
		>
			{#if editingId === permission.permission_id}
				<div class="mb-2 flex items-center space-x-2">
					<input
						type="text"
						bind:value={updatedPermissionName}
						class="w-full rounded-md border border-gray-300 p-2 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
					/>
					<button
						class="rounded-full bg-blue-500 p-2 text-white shadow-lg transition duration-300 hover:bg-blue-600"
						on:click={() => updatePermission(permission.permission_id, permission.permissions[0])}
					>
						<FilePenLine />
					</button>
				</div>
			{:else}
				<h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
					Permission #{permission.permission_id}
				</h3>
				<div class="flex items-center space-x-2">
					<Lock class="text-gray-500 dark:text-gray-400" />
					<span
						class={`rounded-full px-3 py-1 text-sm font-medium ${getColorByPermission(permission.permissions[0])}`}
					>
						{permission.permissions[0]}
					</span>
				</div>
			{/if}

			<div class="mt-4 flex justify-between">
				<button
					class="rounded-full p-1 text-gray-500 transition duration-300 hover:text-green-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-green-500 dark:hover:bg-gray-700"
					style="opacity: 0.85; color: #4CAF50;" 
					on:click={() => editPermission(permission.permission_id, permission.permissions[0])}
				>
					<Edit width="16" height="16" />
				</button>
				<button
					class="rounded-full p-1 text-gray-500 transition duration-300 hover:text-red-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-red-500 dark:hover:bg-gray-700"
					style="opacity: 0.85; color: #F44336;"  
					on:click={() => deletePermission(permission.permission_id)}
				>
					<Trash2 width="16" height="16" />
				</button>
			</div>
		</div>
	{/each}
</div>
