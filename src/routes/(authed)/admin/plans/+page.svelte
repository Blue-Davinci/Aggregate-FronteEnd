<script>
    import Addplan from '$lib/components/layouts/admin/plans/addplan.svelte';
    import Planstatistsics from '$lib/components/layouts/admin/plans/planstatistsics.svelte';
    import Planssummary from '$lib/components/layouts/admin/plans/planssummary.svelte';
    import Adminplans from '$lib/components/layouts/admin/plans/adminplans.svelte';
    export let data;
    export let form;

    let plans = data.plans;
    let isLoading = false;

    function addNewPlan(newPlan) {
        plans = [...plans, newPlan.detail];
    }
</script>
<div class="bg-gray-100 p-6 dark:bg-gray-900">
    <Planstatistsics {plans} />
    <!-- Summary Section -->
    <Planssummary {plans} />
    <!-- Plans Section -->
    <Adminplans {plans} {form} />
    <!-- Add Plan Button -->
    <Addplan {form} {isLoading} on:addPlan={addNewPlan} />
</div>
