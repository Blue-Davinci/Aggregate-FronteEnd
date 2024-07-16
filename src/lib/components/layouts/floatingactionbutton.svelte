<script>
	import { Plus } from 'lucide-svelte'; // Importing the Plus icon
	import Tinyloader from '$lib/components/layouts/tinyloader.svelte';
	import * as Dialog from '$lib/components/ui/dialog'; // Importing Dialog components
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import ValidationMessage from '$lib/components/layouts/authvalidation_message.svelte';
	import { enhance } from '$app/forms'; // Importing enhance from SvelteKit
	import { setToast } from '$lib/utilities/utils';
	import { goto } from '$app/navigation';

	export let form;
	export let isLoading;

	let isOpen = false;
	let formData = {
		name: '',
		url: '',
		img_url: '',
		feed_type: '',
		feed_description: '',
		is_hidden: false
	};

	function clearData() {
		formData = {
			name: '',
			url: '',
			img_url: '',
			feed_type: '',
			feed_description: '',
			is_hidden: false
		};
		form = undefined;
	}

	function isFormDataValid() {
		return Object.values(formData).every((value) => {
			return typeof value === 'string' ? value.trim() !== '' : true;
		});
	}

	function enhanceForm() {
		if (!isFormDataValid()) {
			setToast(false, 'Fields cannot be empty.', 3000);
		} else {
			isLoading = true;
			return async ({ result, update }) => {
				if (result.type === 'redirect') {
					console.log('Redirecting to login page');
					await update();
					setToast(false, 'Sorry, you have been logged out. Please login again.', 3000);
					isLoading = false
					isOpen = false;
					await goto(result.location);
					return;
				}

				if (result.data && result.data?.feed) {
					await update();
					setToast(true, 'Feed added successfully.', 3000);
					isLoading = false
					isOpen = false;
					clearData();
					return;
				}

				if (result.data && result.data.status === 409) {
					console.log('Edit conflict');
					setToast(false, result.data.error.url, 3000);
					isLoading = false
					return;
				}

				await update();

				console.log('Result', result);
				setToast(false, result.data?.error || 'An unknown error occurred', 3000);
				isLoading = false
			};
		}
	}
</script>
<svelte:head>
<link rel="stylesheet" href="/loader.css" />
</svelte:head>
<!-- Floating Action Button -->
<Dialog.Root bind:open={isOpen}>
	<div class="fixed fab-container">
		<button
			tabindex="-1"
			class="flex items-center rounded-full bg-blue-500 px-4 py-2 font-bold text-white shadow-lg hover:bg-blue-700"
			on:click={() => isOpen = true}
		>
			<Plus class="h-8 w-8" />
			<span class="ml-2">Add Your Feed</span>
		</button>
	</div>
	<Dialog.Content class="rounded-lg p-6 shadow-md dialog-content">
		<Dialog.Header>
			<Dialog.Title>Add New Feed</Dialog.Title>
			<Dialog.Description>Fill in the details of the new feed and click save.</Dialog.Description>
		</Dialog.Header>
		<form method="post" action="?/addfeed" use:enhance={enhanceForm} class="space-y-4">
			<div class="grid grid-cols-1 gap-4">
				<div class="flex justify-center mb-4">
					{#if formData.img_url}
						<img src={formData.img_url} alt="Feed" class="rounded-full w-32 h-32 object-cover shadow-md" />
					{:else}
						<div class="rounded-full w-32 h-32 bg-gray-200 dark:bg-gray-700 flex items-center justify-center shadow-md">
							<span class="text-gray-500 dark:text-gray-300">Image Preview</span>
						</div>
					{/if}
				</div>
				<div class="flex flex-col">
					<Label for="name" class="mb-2 text-left">Name</Label>
					<Input id="name" name="name" disabled={isLoading} bind:value={formData.name} />
					<ValidationMessage error={form?.error?.name} />
				</div>
				<div class="flex flex-col">
					<Label for="url" class="mb-2 text-left">URL</Label>
					<Input id="url" name="url" disabled={isLoading} bind:value={formData.url} />
					<ValidationMessage error={form?.error?.url} />
				</div>
				<div class="flex flex-col">
					<Label for="img_url" class="mb-2 text-left">Image URL</Label>
					<Input id="img_url" name="img_url" disabled={isLoading} bind:value={formData.img_url} />
					<ValidationMessage error={form?.error?.img_url} />
				</div>
				<div class="flex flex-col">
					<Label for="feed_type" class="mb-2 text-left">Feed Type</Label>
					<Input id="feed_type" name="feed_type" disabled={isLoading} bind:value={formData.feed_type} />
					<ValidationMessage error={form?.error?.feed_type} />
				</div>
				<div class="flex flex-col">
					<Label for="feed_description" name="feed_description" disabled={isLoading} class="mb-2 text-left">Feed Description</Label>
					<Input id="feed_description" name="feed_description" disabled={isLoading} bind:value={formData.feed_description} />
					{#if isLoading}
						<div class="saving-container">
							<span class="loader"></span>
							<span class="saving">Saving..</span>
						</div>
					{/if}
					<ValidationMessage error={form?.error?.feed_description} />
				</div>
				<div class="flex flex-col">
					<div class="flex items-center space-x-2">
						<Checkbox id="is_hidden" name="is_hidden" disabled={isLoading} bind:checked={formData.is_hidden} />
						<Label for="is_hidden" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Set this feed as Hidden</Label>
						<ValidationMessage error={form?.error?.is_hidden} />
					</div>
					<input type="hidden" name="is_hidden" value={formData.is_hidden ? 'true' : 'false'} />
					<p class="mt-1 text-sm text-muted-foreground">Setting this as <b>true</b> will prevent the feed from appearing on other users timeline.</p>
				</div>
			</div>
			<Dialog.Footer>
				<Button type="submit">Save</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>

<style>
	.fab-container {
		bottom: 1rem;
		right: 1rem;
		z-index: 50;
	}

	@media (max-width: 768px) {
		.fab-container {
			bottom: 0.5rem;
			right: 0.5rem;
		}
	}

	:global(.dialog-content) {
		max-height: 80vh; /* Limit the height to 80% of the viewport height */
		overflow-y: auto; /* Add vertical scroll if content overflows */
	}
</style>
