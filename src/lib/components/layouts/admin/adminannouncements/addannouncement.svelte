<script>
    import { createEventDispatcher } from 'svelte';
	import { Plus } from 'lucide-svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
    import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import ValidationMessage from '$lib/components/layouts/auth/authvalidation_message.svelte';
	import { enhance } from '$app/forms';
	import { setToast } from '$lib/utilities/utils';
    import {goto} from '$app/navigation';

	export let form;

    const dispatch = createEventDispatcher();
	let isLoading = false;
	let isOpen = false;
	let formData = {
		title: '',
		message: '',
		expires_at: '',
		is_active: false,
		urgency: 'medium'
	};

	function clearData() {
		formData = {
			title: '',
			message: '',
			expires_at: '',
			is_active: false,
			urgency: 'medium'
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
					await update();
					setToast(false, 'Please login again.', 3000);
					isLoading = false;
					isOpen = false;
                    goto('/login');
					return;
				}

				if (result.data && result.data?.announcement) {
					await update();
                    dispatch('addAnnouncement', result.data.announcement);
					setToast(true, 'Announcement added successfully.', 3000);
					isLoading = false;
					isOpen = false;
					clearData();
					return;
				}
				await update();
				setToast(false, result.data?.error || 'An unknown error occurred', 3000);
				isLoading = false;
			};
		}
	}
</script>

<!-- Floating Action Button -->
<Dialog.Root bind:open={isOpen}>
	<div class="fixed bottom-4 right-4 z-50">
		<button
			class="flex items-center rounded-full bg-blue-500 px-4 py-2 text-white shadow-lg hover:bg-blue-600"
			on:click={() => isOpen = true}
		>
			<Plus class="h-8 w-8" />
			<span class="ml-2">Add Announcement</span>
		</button>
	</div>

	<Dialog.Content class="rounded-lg p-6 shadow-lg bg-white dark:bg-gray-800 max-w-lg mx-auto">
		<Dialog.Header>
			<Dialog.Title class="text-lg font-medium text-gray-900 dark:text-gray-100">Add New Announcement</Dialog.Title>
			<Dialog.Description class="text-sm text-gray-600 dark:text-gray-300">Fill in the details and click save.</Dialog.Description>
		</Dialog.Header>

		<form method="post" action="?/add_announcement" use:enhance={enhanceForm} class="space-y-6">
			<div class="space-y-4">
				<div>
					<Label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</Label>
					<Input id="title" name="title" disabled={isLoading} bind:value={formData.title} class="w-full" />
					<ValidationMessage error={form?.error?.title} />
				</div>

				<div>
					<Label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</Label>
					<Input id="message" name="message" disabled={isLoading} bind:value={formData.message} class="w-full" />
					<ValidationMessage error={form?.error?.message} />
				</div>

				<div>
					<Label for="expires_at" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expires At</Label>
					<Input id="expires_at" name="expires_at" type="datetime-local" disabled={isLoading} bind:value={formData.expires_at} class="w-full" />
					<ValidationMessage error={form?.error?.expires_at} />
				</div>

				<div>
					<Label for="urgency" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Urgency</Label>
					<select 
						id="urgency" 
						name="urgency" 
						bind:value={formData.urgency} 
						class="w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
						<option value="low" class="bg-green-200 dark:bg-green-800">Low</option>
						<option value="medium" class="bg-yellow-200 dark:bg-yellow-800">Medium</option>
						<option value="high" class="bg-red-200 dark:bg-red-800">High</option>
					</select>
					<ValidationMessage error={form?.error?.urgency} />
				</div>

				<div class="flex items-center space-x-2">
					<Checkbox id="is_active" name="is_active" bind:checked={formData.is_active} disabled={isLoading} />
					<Label for="is_active" class="text-sm font-medium text-gray-700 dark:text-gray-300">Is Active</Label>
					<ValidationMessage error={form?.error?.is_active} />
                    <input type="hidden" name="is_active" value={formData.is_active ? 'true' : 'false'} />
				</div>
			</div>

			<Dialog.Footer>
				<Button type="submit" class="w-full">Save</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
