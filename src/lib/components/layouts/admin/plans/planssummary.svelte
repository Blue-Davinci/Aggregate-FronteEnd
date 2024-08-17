<script>
	import { fly, fade } from 'svelte/transition';
	export let plans;
</script>

<div
	class="mb-6 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800"
	in:fly={{ x: 200, duration: 1000 }}
	out:fade={{ duration: 300 }}
>
	<h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Available Plans</h2>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each plans as plan}
			<div
				class={`flex items-center justify-between rounded-md p-3 shadow-sm ${plan.status === 'active' ? 'bg-gray-50 dark:bg-gray-700' : 'bg-red-50 dark:bg-red-700'}`}
			>
				<span class="text-lg font-semibold text-blue-600 dark:text-blue-400">{plan.name}</span>
				<span class="badge text-sm capitalize text-gray-500 dark:text-gray-400"
					>{plan.duration}</span
				>
			</div>
		{/each}
	</div>
</div>
