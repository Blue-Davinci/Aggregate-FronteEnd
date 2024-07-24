<script>
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components/ui/input';
    import {setToast} from '$lib/utilities/utils'
    import ValidationMessage from '../auth/authvalidation_message.svelte';

    export let form;
	export let currentName = ''; // Prop to display the current username

    $: console.log("Errors from form: ", form?.errors);
	let isLoading = false;
	let newName = '';

	function enhanceForm() {
		isLoading = true;
		return async ({ result, update }) => {
			try {
				console.log('Result: ', result);
                await update();
				if (result.status === 200) {
					setToast(true, `Succesfully changed your name. Welcome, ${newName}`, 3000);
					await update();
                    currentName = newName;
				}else{
                    setToast(false, `Failed to change your name. Please try again.`, 3000);
                }
			} catch (err) {
				console.log(err);
				// Handle error
			} finally {
				newName = '';
				isLoading = false;
			}
		};
	}
</script>

<form
	action="?/username"
	method="post"
	use:enhance={enhanceForm}
	class="mx-auto flex w-full max-w-md flex-col items-center space-y-6 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800"
>
	<h2 class="mb-6 text-3xl font-semibold text-gray-900 dark:text-gray-100">Change Username</h2>

	<div class="mb-6 w-full">
		<label
			for="current-name"
			class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Current Name:</label
		>
		<Input
			id="currentname"
			name="currentname"
			type="text"
			bind:value={currentName}
			readOnly
			class="w-full rounded-lg border border-gray-300 bg-gray-100 p-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
		/>
        <ValidationMessage error={form?.error?.currentname} />
	</div>

	<div class="mb-6 w-full">
		<label for="new-name" class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
			>New Name:</label
		>
		<Input
			id="newname"
			type="text"
			name="newname"
			bind:value={newName}
			placeholder="Enter new username"
			class="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
		/>
        <ValidationMessage error={form?.error?.newname} />
	</div>

	<button
		type="submit"
        disabled={isLoading}
		class="flex item-center justify-center transform rounded-full bg-gradient-to-r from-green-400 to-green-500 px-6 py-3 text-white shadow-md transition duration-300 hover:scale-105 hover:from-green-500 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 dark:from-green-600 dark:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 dark:focus:ring-green-500"
	>
		{#if isLoading}
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
				></path>
			</svg>
			<span>Saving...</span>
		{:else}
			<span>Save Change</span>
		{/if}
	</button>
</form>
