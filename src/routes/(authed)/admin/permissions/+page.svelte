<script>
	import Permissionsoverview from '$lib/components/layouts/admin/adminpermissions/permissionsoverview.svelte';
	import Superuser from '$lib/components/layouts/admin/adminpermissions/superuser.svelte';
	import Addpermissions from '$lib/components/layouts/admin/adminpermissions/addpermissions.svelte';
	export let data;
	export let form;

	//console.log('Data: ', data.permissions);

	let permission = '';
	let isSaving = false;
	let permissions = data.permissions ?? [];
	let super_users = data.superUsers ?? [];
	//console.log("Super........................");
	const addNewPermission = (permission) => {
		const { permission_id, permission_code } = permission.detail;
		// Pre-format the new permission data
		const formattedPermission = {
			permission_id: permission_id,
			permissions: [permission_code] // Store the permission code in an array
		};
		// Check if the permission_id already exists in the permissions array
		const existingPermissionIndex = permissions.findIndex((p) => p.permission_id === permission_id);

		if (existingPermissionIndex !== -1) {
			// If it exists, add the new permission code to the existing array
			permissions[existingPermissionIndex].permissions.push(permission_code);
		} else {
			// If it doesn't exist, add the formatted permission to the array
			permissions = [...permissions, formattedPermission];
		}
	};

	const deletePermission = (id) => {
		permissions = permissions.filter((permission) => permission.permission_id !== id.detail);
	};

	const getColorByPermission = (permission) => {
		if (permission.includes('read')) {
			return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200';
		} else if (permission.includes('write')) {
			return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200';
		} else {
			return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
		}
	};
</script>

<div class="bg-gray-100 p-6 dark:bg-gray-900">
	<!-- Permissions Overview -->
	<Permissionsoverview
		{permissions}
		{getColorByPermission}
		on:deletePermission={deletePermission}
	/>
	<!-- Super Users Section -->
	<Superuser {super_users} {getColorByPermission} />
	<!-- Add Permission Form -->
	<Addpermissions {form} {isSaving} {permission} on:addPermission={addNewPermission} />
</div>
