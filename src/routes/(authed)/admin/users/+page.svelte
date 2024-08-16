<script>
    import Adminusertable from '$lib/components/layouts/admin/adminusers/adminusertable.svelte';
    import Adminuserstatistics from '$lib/components/layouts/admin/adminusers/adminuserstatistics.svelte';

    export let data;
    //console.log(data);
    let users = data.users;
</script>

<!-- Statistics Cards -->
<Adminuserstatistics {users} />
<!-- User Table -->
<Adminusertable {users} />
