<script>
	import { fly, fade } from 'svelte/transition';
	export let super_users;
	export let getColorByPermission;
</script>

<h2 class="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-100">Super Users</h2>
<div
	class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
	in:fly={{ x: -200, duration: 1000 }}
	out:fade
>
	{#each super_users.super_users as user}
		<div class="rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
			<div class="flex items-center space-x-4">
				<img class="h-16 w-16 rounded-full object-cover" src={user.user_img} alt={user.name} />
				<div>
					<h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">{user.name}</h3>
					<span
						class={`rounded-full px-3 py-1 text-sm font-medium ${getColorByPermission(user.admin_permission.permission_code)}`}
					>
						{user.admin_permission.permission_code}
					</span>
				</div>
			</div>
		</div>
	{/each}
</div>
