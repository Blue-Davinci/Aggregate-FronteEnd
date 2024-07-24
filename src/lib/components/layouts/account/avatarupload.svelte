<script>
	import { setToast } from '$lib/utilities/utils';
	import { invalidateAll } from '$app/navigation';
	import ValidationMessage from '../auth/authvalidation_message.svelte';
	import { RefreshCcwDot } from 'lucide-svelte';
	export let form;
	export let userImage;
	export let userName;

	let isLoading = false;
	let isPreviewLoading = false;
	let file = null;
	let previewUrl = userImage;
	let suggestionLoading = new Set();

	let bgSetIndex = 0;
	const bgSets = ['', 'bg1', 'bg2'];
	const getSuggestions = () => {
		const bgSet = bgSets[bgSetIndex];
		return Array.from({ length: 5 }, (_, i) => {
			const bgQuery = bgSet ? `&bgset=${bgSet}` : '';
			return `https://robohash.org/${userName}${i + 1}.png?set=set${i + 1}${bgQuery}&size=500x500`;
		});
	};
	let suggestions = getSuggestions();

	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];
		if (selectedFile) {
			isPreviewLoading = true;
			file = selectedFile;
			const objectUrl = URL.createObjectURL(selectedFile);
			previewUrl = objectUrl;
			isPreviewLoading = false;
		}
	};

	const handleSuggestionClick = async (url) => {
		suggestionLoading.add(url);
		isPreviewLoading = true;
		try {
			const response = await fetch(url);
			const blob = await response.blob();
			file = new File([blob], `${userName}.png`, { type: 'image/png' });
			previewUrl = url;
		} catch (error) {
			console.error('Error fetching image:', error);
		} finally {
			suggestionLoading.delete(url);
			isPreviewLoading = false;
		}
	};

	const cycleBgSets = () => {
		bgSetIndex = (bgSetIndex + 1) % bgSets.length;
		suggestions = getSuggestions();
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		isLoading = true;

		try {
			const formData = new FormData(event.target);
			if (file) {
				formData.set('file', file);
			}

			const response = await fetch(event.target.action, {
				method: 'POST',
				body: formData,
			});

			const result = await response.json();
			if (result?.status === 200) {
				setToast(true, 'Avatar Updated Successfully', 3000);
			} else {
				setToast(false, 'Failed to Update Avatar', 3000);
				previewUrl = userImage;
			}
		} catch (error) {
			console.log('Error submitting form:', error);
			setToast(false, 'Failed to Update Avatar', 3000);
			previewUrl = userImage;
		} finally {
			isLoading = false;
			invalidateAll();
		}
	};
</script>

<div class="flex flex-col justify-center items-center h-full">
	<form
		action="?/upload"
		method="post"
		enctype="multipart/form-data"
		on:submit={handleSubmit}
		class="flex flex-col items-center space-y-6 w-full"
	>
		<div class="flex flex-col items-center rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 w-full transition-all duration-300 transform hover:scale-105">
			<h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Change Avatar</h2>
			{#if !previewUrl || isPreviewLoading}
				<div class="mb-4 flex h-32 w-32 items-center justify-center rounded-full border-4 border-gray-300 bg-gray-200 shadow-md dark:border-gray-700 dark:bg-gray-600 animate-pulse">
					{#if isPreviewLoading}
						<svg
							width="32"
							height="32"
							fill="currentColor"
							class="animate-spin"
							viewBox="0 0 1792 1792"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"
							></path>
						</svg>
					{:else}
						<span class="text-xl text-gray-500 dark:text-gray-400">No Image</span>
					{/if}
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

			<div class="flex space-x-4 mb-5 mt-3">
				{#each suggestions as suggestion}
					<button
						type="button"
						on:click={() => handleSuggestionClick(suggestion)}
						on:keydown={(event) => event.key === 'Enter' && handleSuggestionClick(suggestion)}
						class="relative h-16 w-16 rounded-full border-2 border-gray-300 object-cover shadow-md cursor-pointer transition-transform hover:scale-110 focus:outline-none"
					>
						{#if suggestionLoading.has(suggestion)}
							<div class="absolute inset-0 flex items-center justify-center bg-gray-300 rounded-full">
								<svg
									width="20"
									height="20"
									fill="currentColor"
									class="animate-spin"
									viewBox="0 0 1792 1792"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"
									></path>
								</svg>
							</div>
						{:else}
							<img
								src={suggestion}
								alt={`Suggestion ${suggestion}`}
								class="h-full w-full rounded-full object-cover"
							/>
						{/if}
					</button>
				{/each}
			</div>

			<button
				type="button"
				on:click={cycleBgSets}
				class="flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 px-4 py-2 text-white transition-colors hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 focus:outline-none"
			>
			<RefreshCcwDot class="h-5 w-5"/>
				<span>Cycle Background Sets</span>
			</button>

			<button
				type="submit"
				class="flex items-center justify-center mt-4 w-full rounded-lg bg-gradient-to-r from-green-500 to-teal-500 px-4 py-2 text-white transition-transform hover:scale-105 hover:bg-gradient-to-r hover:from-green-600 hover:to-teal-600 disabled:bg-gray-400 dark:bg-green-400 dark:hover:bg-green-500"
				disabled={isLoading}
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
</div>

<p class="mt-4 text-xs text-gray-500 dark:text-gray-400">
	Robots lovingly delivered by <a href="https://robohash.org" class="underline">Robohash.org</a>
</p>

<style>
	.animate-spin {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
