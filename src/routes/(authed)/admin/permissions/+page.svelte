<script>
    import { setToast } from '$lib/utilities/utils';
    import { deleteAdministrationPermission } from '$lib/dataservice/admin/permissionsDataService';
    import Permissionsoverview from '$lib/components/layouts/admin/adminpermissions/permissionsoverview.svelte';
    import Superuser from '$lib/components/layouts/admin/adminpermissions/superuser.svelte';
    import Addpermissions from '$lib/components/layouts/admin/adminpermissions/addpermissions.svelte';
    export let data;
    export let form;

    console.log("Data: ", data.permissions);
    
    let permission = ''
    let isSaving = false;
    let permissions = data.permissions ?? [];
    let super_users = data.superUsers ?? [];

    function enhanceForm() {
	isSaving = true;
	return async ({ result, update }) => {
		console.log("Result: ", result);
		try {
			if (!result.data.error) {
				const { permission_id, permission_code } = result.data.permission;
				// Pre-format the new permission data
				const formattedPermission = {
					permission_id: permission_id,
					permissions: [permission_code] // Store the permission code in an array
				};
				// Check if the permission_id already exists in the permissions array
				const existingPermissionIndex = permissions.findIndex(p => p.permission_id === permission_id);

				if (existingPermissionIndex !== -1) {
					// If it exists, add the new permission code to the existing array
					permissions[existingPermissionIndex].permissions.push(permission_code);
				} else {
					// If it doesn't exist, add the formatted permission to the array
					permissions = [...permissions, formattedPermission];
				}

				console.log("Formatted Permissions: ", permissions);
				setToast(true, `Successfully added the permission: ${permission_code}`, 3000);
				await update();
			} else {
				setToast(false, `Failed to add the permissions: ${result.data.error.permission}`, 3000);
			}
			await update();
		} catch (err) {
			console.log("An error occurred while saving the permission: ", err);
		} finally {
			isSaving = false;
			permission = '';
		}
	};
}

const deletePermission = async (id) => {
		if (!id) {
			setToast(false, 'Error! Permission ID is required.');
			return;
		}
		let response = await deleteAdministrationPermission(id);
		if (response.success) {
			// Remove the deleted permission from the permissions array
			permissions = permissions.filter((permission) => permission.permission_id !== id);
			setToast(true, 'Success! Permission deleted successfully.');
		} else {
			setToast(false, 'Error! Permission could not be deleted.');
		}
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

<div class="p-6 bg-gray-100 dark:bg-gray-900">
    <!-- Permissions Overview -->
    <Permissionsoverview {permissions} {getColorByPermission} {deletePermission}/>
    <!-- Super Users Section -->
    <Superuser {super_users} {getColorByPermission} />
    <!-- Add Permission Form -->
    <Addpermissions {form} {isSaving} {permission} {enhanceForm}  />
</div>
