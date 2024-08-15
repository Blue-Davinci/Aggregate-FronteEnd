<script>
    import Adminusertable from '$lib/components/layouts/admin/adminusertable.svelte';
    import Adminuserstatistics from '$lib/components/layouts/admin/adminuserstatistics.svelte';

    export let data;
    //console.log(data);
    let users = data.users;
</script>

<!-- Statistics Cards -->
<Adminuserstatistics {users} />
<!-- User Table -->
<Adminusertable {users} />
