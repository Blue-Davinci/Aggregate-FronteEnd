<script>
    import { createEventDispatcher } from 'svelte';
    import {adminUpdateFeed} from '$lib/dataservice/admin/adminFeedsDataService.js';
    import {getChangedFields} from '$lib/utilities/utils.js';
    import {Edit} from 'lucide-svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import ValidationMessage from '$lib/components/layouts/auth/authvalidation_message.svelte';
	import { setToast } from '$lib/utilities/utils';

	export let form;
	export let feed;
	export let isLoading = false;
	export let isOpen = false;

    let dispatch = createEventDispatcher();
	let formData = {
		name: feed.name,
		url: feed.url,
		img_url: feed.img_url,
		feed_type: feed.feed_type,
		feed_description: feed.feed_description,
		is_hidden: feed.is_hidden
	};

	function isFormDataValid() {
		return Object.values(formData).every((value) => {
			return typeof value === 'string' ? value.trim() !== '' : true;
		});
	}

    // handleFeedUpdate() updates the feed with the new data
    // Since this is a different format from the normal user and we are admins, we will essentially
    // directly get the changed fields. The backend supports partial updates, so we acquire
    // all the changed fields and send them directly to the backend rather than sending all the.
    // fields.
	async function handleFeedUpdate(event) {
		event.preventDefault(); // Prevent the form from submitting the default way
        // Check if the form data is valid
		if (!isFormDataValid()) {
			setToast(false, 'Fields cannot be empty.', 3000);
			return;
		}
        // Get the changed fields
        let changedFields = getChangedFields( feed, formData);
        console.log('Changed Fields:', changedFields);
        // if there are no changed fields i.e {} then we can return
        if (Object.keys(changedFields).length === 0) {
            setToast(false, 'No changes detected.', 3000);
            return;
        }
        // we seem to have some changes, so we can proceed to update the feed
		isLoading = true;
		try {
            console.log("Feed ID:", feed.id);
            // we send the feed ID and the changed fields to the backend
			let response = await adminUpdateFeed(feed.id, changedFields);
            if (response.success) {
                setToast(true, 'Feed updated successfully.', 3000);
                dispatch('feedUpdated', true);
                isOpen = false;
            } else {
                dispatch('feedUpdated', false);
                console.error('Error updating feed:', response);
                setToast(false, 'An error occurred while updating the feed.', 3000);
            }

		} catch (error) {
			console.error('Error updating feed:', error);
			setToast(false, 'An error was cought and has occurred while sending the update request of the feed.', 3000);
		}finally{
            isLoading = false;
        }
	}
</script>

<Dialog.Root bind:open={isOpen}>
    <button
    class="flex transform items-center space-x-1 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-600 transition-transform hover:scale-105 hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-200"
    on:click={() => isOpen = true}
>
    <Edit class="h-4 w-4" /> <span>Update</span>
</button>
	<Dialog.Content class="dialog-content rounded-lg p-6 shadow-md">
		<Dialog.Header>
			<Dialog.Title>Update Feed</Dialog.Title>
			<Dialog.Description>Update the details of the feed and click save.</Dialog.Description>
		</Dialog.Header>
		<form on:submit={handleFeedUpdate} class="space-y-4">
            <div class="flex items-center justify-between p-3 mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                <Label class="text-sm font-medium text-gray-600 dark:text-gray-300">Feed ID</Label>
                <span
                    class="text-xs font-mono text-gray-500 dark:text-gray-400 truncate"
                    title={feed.id}
                >
                    {feed.id}
                </span>
            </div>
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
				<!-- Hidden Fields for partial updates -->
				<input type="hidden" name="original_id" value={feed.id} />
				<input type="hidden" name="original_name" value={feed.name} />
				<input type="hidden" name="original_url" value={feed.url} />
				<input type="hidden" name="original_img_url" value={feed.img_url} />
				<input type="hidden" name="original_feed_type" value={feed.feed_type} />
				<input type="hidden" name="original_feed_description" value={feed.feed_description} />
				<input type="hidden" name="original_is_hidden" value={feed.is_hidden ? 'true' : 'false'} />

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
						Setting this as <b>true</b> will prevent the feed from appearing on other users' timeline.
					</p>
				</div>
			</div>
			<Dialog.Footer>
				<Button type="submit" disabled={isLoading}>Save</Button>
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
		max-height: 80vh;
		overflow-y: auto;
	}
</style>
