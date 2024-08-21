<script>
	import { fly, fade } from 'svelte/transition';
	import { CreditCard, List } from 'lucide-svelte';
</script>

<div
	class="mt-8 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
	in:fly={{ x: 200, duration: 1000 }}
	out:fade
>
	<h2 class="mb-4 text-center text-xl font-bold text-gray-800 dark:text-gray-200">Quick Links</h2>
	<div class="flex justify-center space-x-4">
		<a
			href="/admin/subscriptions"
			class="flex items-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-3 font-semibold text-white shadow-md transition-transform duration-150 ease-in-out hover:scale-105 dark:bg-blue-700 dark:hover:bg-blue-800"
		>
			<CreditCard class="mr-2 h-5 w-5" />
			Manage Subscriptions
		</a>
		<a
			href="/admin/plans"
			class="flex items-center rounded-lg bg-gradient-to-r from-green-500 to-green-700 px-6 py-3 font-semibold text-white shadow-md transition-transform duration-150 ease-in-out hover:scale-105 dark:bg-green-700 dark:hover:bg-green-800"
		>
			<List class="mr-2 h-5 w-5" />
			Manage Payment Plans
		</a>
	</div>
</div>
