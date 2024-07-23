<script>
	import { setToast } from '$lib/utilities/utils';
	import ValidationMessage from '../auth/authvalidation_message.svelte';
	import { enhance } from '$app/forms';
	export let form;
	export let userImage;

	let isLoading = false;
	let file = null;
	let previewUrl = userImage;

	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];
		if (selectedFile) {
			file = selectedFile;
			previewUrl = URL.createObjectURL(selectedFile);
		}
	};

	function enhanceForm() {
		isLoading = true;
		return async ({ result, update }) => {
			try {
				if (result?.data?.avatarUrl) {
					setToast(true, 'Avatar Updated Successfully', 3000);
				} else {
					setToast(false, 'Failed to Update Avatar', 3000);
				}
				await update();
			} catch (err) {
				console.log(err);
			} finally {
				isLoading = false;
			}
		};
	}
</script>

<form
	action="?/upload"
	method="post"
	enctype="multipart/form-data"
	use:enhance={enhanceForm}
	class="flex flex-col items-center space-y-6"
>
	<div class="flex flex-col items-center rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 w-full">
		<h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Change Avatar</h2>
		{#if !previewUrl}
			<div class="mb-4 flex h-32 w-32 items-center justify-center rounded-full border-4 border-gray-300 bg-gray-200 shadow-md dark:border-gray-700 dark:bg-gray-600">
				<span class="text-xl text-gray-500 dark:text-gray-400">No Image</span>
			</div>
		{:else}
			<img
				src={previewUrl}
				alt="Avatar Preview"
				class="mb-4 h-32 w-32 transform rounded-full border-4 border-blue-500 object-cover shadow-lg transition-transform hover:scale-105 dark:border-blue-400"
			/>
		{/if}

		<input
			type="file"
			name="file"
			accept="image/*"
			on:change={handleFileChange}
			class="mb-4 rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:focus:ring-blue-400"
		/>
		<ValidationMessage error={form?.error?.file} />
		<button
			type="submit"
			disabled={isLoading}
			class="flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-500 px-6 py-3 text-white transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-blue-500"
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
				<span>Uploading...</span>
			{:else}
				<span>Upload</span>
			{/if}
		</button>
	</div>
</form>
