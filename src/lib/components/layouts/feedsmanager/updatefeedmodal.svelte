<script>
	import * as Dialog from '$lib/components/ui/dialog'; // Importing Dialog components
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import ValidationMessage from '$lib/components/layouts/auth/authvalidation_message.svelte';
	import { enhance } from '$app/forms'; // Importing enhance from SvelteKit
	import { setToast } from '$lib/utilities/utils';
	import { goto } from '$app/navigation';

	export let form;
	export let feed;
	export let isLoading;
	export let isOpen = false;

	//console.log("Original Data: ", feed);

	let formData = {
		name: feed.name,
		url: feed.url,
		img_url: feed.img_url,
		feed_type: feed.feed_type,
		feed_description: feed.feed_description,
		is_hidden: feed.is_hidden
	};
	//console.log("Form Data: ", formData)

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
					isLoading = false;
					isOpen = false;
					await goto(result.location);
					return;
				}

				if (result.data && result.data?.feed) {
					await update();
					setToast(true, 'Feed updated successfully.', 3000);
					isLoading = false;
					isOpen = false;
					return;
				}

				if (result.data && result.data.status === 409) {
					console.log('Edit conflict');
					setToast(false, result.data.error.url, 3000);
					isLoading = false;
					return;
				}

				await update();

				console.log('Result', result);
				setToast(false, result.data?.error || 'An unknown error occurred', 3000);
				isLoading = false;
			};
		}
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="/loader.css" />
	<link rel="stylesheet" href="/auth.css" />
</svelte:head>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Content class="dialog-content rounded-lg p-6 shadow-md">
		<Dialog.Header>
			<Dialog.Title>Update Feed</Dialog.Title>
			<Dialog.Description>Update the details of the feed and click save.</Dialog.Description>
		</Dialog.Header>
		<form method="post" action="?/updatefeed" use:enhance={enhanceForm} class="space-y-4">
			<div class="grid grid-cols-1 gap-4">
				<div class="mb-4 flex justify-center">
					{#if formData.img_url}
						<img
							src={formData.img_url}
							alt="Feed"
							class="h-32 w-32 rounded-full object-cover shadow-md"
						/>
					{:else}
						<div
							class="flex h-32 w-32 items-center justify-center rounded-full bg-gray-200 shadow-md dark:bg-gray-700"
						>
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
					<Input
						id="feed_type"
						name="feed_type"
						disabled={isLoading}
						bind:value={formData.feed_type}
					/>
					<ValidationMessage error={form?.error?.feed_type} />
				</div>
				<div class="flex flex-col">
					<Label
						for="feed_description"
						name="feed_description"
						disabled={isLoading}
						class="mb-2 text-left">Feed Description</Label
					>
					<Input
						id="feed_description"
						name="feed_description"
						disabled={isLoading}
						bind:value={formData.feed_description}
					/>
					<ValidationMessage error={form?.error?.feed_description} />
				</div>
				<!--Hidden Fields Since we want to also do partial updates-->
				<input type="hidden" name="original_id" value={feed.id} />
				<input type="hidden" name="original_name" value={feed.name} />
				<input type="hidden" name="original_url" value={feed.url} />
				<input type="hidden" name="original_img_url" value={feed.img_url} />
				<input type="hidden" name="original_feed_type" value={feed.feed_type} />
				<input type="hidden" name="original_feed_description" value={feed.feed_description} />
				<input type="hidden" name="original_is_hidden" value={feed.is_hidden ? 'true' : 'false'} />
				<!----------------------------------------------------------->
				<div class="flex flex-col">
					<div class="flex items-center space-x-2">
						<Checkbox
							id="is_hidden"
							name="is_hidden"
							disabled={isLoading}
							bind:checked={formData.is_hidden}
						/>
						<Label
							for="is_hidden"
							class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>Set this feed as Hidden</Label
						>
						<ValidationMessage error={form?.error?.is_hidden} />
					</div>
					<input type="hidden" name="is_hidden" value={formData.is_hidden ? 'true' : 'false'} />
					<p class="mt-1 text-sm text-muted-foreground">
						Setting this as <b>true</b> will prevent the feed from appearing on other users timeline.
					</p>
				</div>
			</div>
			<Dialog.Footer>
				<Button type="submit">Save</Button>
			</Dialog.Footer>
      {#if isLoading}
      <div class="saving-container">
        <span class="loader"></span>
        <span class="saving">Saving..</span>
      </div>
    {/if}
		</form>
	</Dialog.Content>
</Dialog.Root>

<style>
	:global(.dialog-content) {
		max-height: 80vh; /* Limit the height to 80% of the viewport height */
		overflow-y: auto; /* Add vertical scroll if content overflows */
	}
</style>
