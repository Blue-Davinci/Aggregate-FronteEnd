<script>
	import { fly, fade } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import ValidationMessage from '$lib/components/layouts/auth/authvalidation_message.svelte';
	import { PlusCircle } from 'lucide-svelte';

	export let form;
	export let enhanceForm;
	export let isSaving = false;
	export let permission = '';

	//console.log("Form: ", form);
</script>

<h2 class="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-100">Add New Permission</h2>
<form
	method="post"
	action="?/add_permission"
	class="rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800"
	in:fly={{ x: 200, duration: 1000 }}
	out:fade
	use:enhance={enhanceForm}
>
	<div class="mb-4 flex flex-col">
		<label class="mb-2 text-gray-700 dark:text-gray-300" for="permission"
			>Permission (format: xxxx:yyyy)</label
		>
		<input
			bind:value={permission}
			class="rounded bg-gray-100 p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700"
			type="text"
			name="permission"
			id="permission"
			required
		/>
	</div>
	<ValidationMessage error={form?.error?.permission} />
	<button
		class="flex items-center justify-center rounded bg-blue-500 px-6 py-2 text-white shadow-lg transition duration-300 hover:bg-blue-600"
		type="submit"
	>
		{#if isSaving}
			<svg
				width="20"
				height="20"
				fill="currentColor"
				class="mr-2 animate-spin"
				viewBox="0 0 1792 1792"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"
				>
				</path>
			</svg>
			Adding Permission...
		{:else}
			Add Permission
			<PlusCircle class="ml-2 inline-block" />
		{/if}
	</button>
</form>
