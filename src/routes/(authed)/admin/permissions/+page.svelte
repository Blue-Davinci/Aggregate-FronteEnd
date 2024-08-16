<script>
    import { setToast } from '$lib/utilities/utils';
    import Permissionsoverview from '$lib/components/layouts/admin/adminpermissions/permissionsoverview.svelte';
    import Superuser from '$lib/components/layouts/admin/adminpermissions/superuser.svelte';
    import Addpermissions from '$lib/components/layouts/admin/adminpermissions/addpermissions.svelte';
    export let data;
    export let form;

    console.log("Data: ", data);
    
    let permission = ''
    let isSaving = false;
    let permissions = data.permissions ?? [];
    let super_users = data.superUsers ?? [];

    function enhanceForm() {
		isSaving = true;
		return async ({ result, update }) => {
            //console.log("Result: ", result);
			try {
				if (!result.data.error) {
                    const newPermission = result.permission;
                    console.log("New Permission: ", newPermission);
                    permissions = [...permissions, newPermission];
					setToast(true, `Succesfully add the following permissions ${permission}`, 3000);
					await update();
				}else{
                    setToast(false, `Failed to add the permissions: ${result.data.error.permission}`, 3000);
                }
				await update();
			} catch (err) {
				console.log("An error while saving permission: ", err);
				// Handle error
			} finally {
                isSaving = false;
                permission = '';
			}
		};
	}

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
    <Permissionsoverview {permissions} {getColorByPermission} />
    <!-- Super Users Section -->
    <Superuser {super_users} {getColorByPermission} />
    <!-- Add Permission Form -->
    <Addpermissions {form} {isSaving} {permission} {enhanceForm}  />
</div>
