<script>
    import {PlusCircle} from 'lucide-svelte'
    import Addplan from '$lib/components/layouts/admin/plans/addplan.svelte';
    import Planstatistsics from '$lib/components/layouts/admin/plans/planstatistsics.svelte';
    import Planssummary from '$lib/components/layouts/admin/plans/planssummary.svelte';
    import Adminplans from '$lib/components/layouts/admin/plans/adminplans.svelte';
    export let data;

    let plans = data.plans;
</script>
<div class="bg-gray-100 p-6 dark:bg-gray-900">
    <Planstatistsics {plans} />
    <!-- Summary Section -->
    <Planssummary {plans} />
    <!-- Plans Section -->
    <Adminplans {plans} />
    <!-- Add Plan Button -->
    <Addplan />
</div>
