<script>
	import { setToast } from '$lib/utilities/utils';
	import Adminusertable from '$lib/components/layouts/admin/adminusers/adminusertable.svelte';
	import Adminuserstatistics from '$lib/components/layouts/admin/adminusers/adminuserstatistics.svelte';

	export let data;
	//console.log(data);
	let users = data.users;

	function removePermission(event){
        users = event.detail.users; // Access the users from the event detail
        data = { ...data, users };
        console.log("New permissions removed and event triggered");
    }

    function addPermissions(event){
        users = event.detail.users; // Access the users from the event detail
        data = { ...data, users };
        console.log("New permissions added and event triggered");
    }
</script>

<!-- Statistics Cards -->
<Adminuserstatistics {users} />
<!-- User Table -->
<Adminusertable {users} on:removePermission={removePermission} on:addPermission={addPermissions} />
