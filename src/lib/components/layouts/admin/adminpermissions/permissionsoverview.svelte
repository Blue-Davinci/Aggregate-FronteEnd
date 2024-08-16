<script>
import { Edit, Trash2, Lock } from 'lucide-svelte';
import { fly, fade } from 'svelte/transition';
export let permissions;
export let getColorByPermission

console.log("Permissions: ", permissions);
const editPermission = (id) => {
        console.log(`Editing permission with ID: ${id}`);
    };

    const deletePermission = (id) => {
        console.log(`Deleting permission with ID: ${id}`);
    };
</script>

<h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Permissions Overview</h2>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
in:fly={{ x: 200, duration: 1000 }}
out:fade
>
    {#each permissions as permission}
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Permission #{permission.permission_id}</h3>
            <div class="flex items-center space-x-2">
                <Lock class="text-gray-500 dark:text-gray-400" />
                <span class={`px-3 py-1 rounded-full text-sm font-medium ${getColorByPermission(permission.permissions[0])}`}>
                    {permission.permissions[0]}
                </span>
            </div>
            <div class="mt-4 flex justify-between">
                <button class="bg-green-500 text-white p-2 rounded-full shadow-lg hover:bg-green-600 transition duration-300" on:click={() => editPermission(permission.permission_id)}>
                    <Edit />
                </button>
                <button class="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition duration-300" on:click={() => deletePermission(permission.permission_id)}>
                    <Trash2 />
                </button>
            </div>
        </div>
    {/each}
</div>