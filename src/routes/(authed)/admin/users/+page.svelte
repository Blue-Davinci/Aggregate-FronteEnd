<script>
	import { setToast } from '$lib/utilities/utils';
	import {
		addAdministrationUserPermission,
		deleteAdministrationUserPermission
	} from '$lib/dataservice/admin/permissionsDataService';
	import Adminusertable from '$lib/components/layouts/admin/adminusers/adminusertable.svelte';
	import Adminuserstatistics from '$lib/components/layouts/admin/adminusers/adminuserstatistics.svelte';

	export let data;
	//console.log(data);
	let users = data.users;
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
			data = { ...data, users };
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
			data = { ...data, users };
			setToast(true, 'Success! User is now a Super User', 2000);
		} else {
			setToast(false, 'Sorry, permissions could not be added.', 2000);
		}
	}
</script>

<!-- Statistics Cards -->
<Adminuserstatistics {users} />
<!-- User Table -->
<Adminusertable {users} {removePermission} {addPermissions} />
