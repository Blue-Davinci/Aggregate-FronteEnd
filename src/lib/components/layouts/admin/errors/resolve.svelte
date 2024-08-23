<script>
	import { createEventDispatcher } from 'svelte';
	import { setToast } from '$lib/utilities/utils';
	import { enhance } from '$app/forms';
	import ValidationMessage from '$lib/components/layouts/auth/authvalidation_message.svelte';
	import { CheckCircle } from 'lucide-svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	export let form;
	export let ID;

	const dispatch = createEventDispatcher();
	let isOpen = false;
	let isTrue = true;
	function enhanceForm() {
		return async ({ result, update }) => {
			console.log(result);
			try {
				if (result.data.data.error_log) {
					const errorLog = result.data.data.error_log;
					dispatch('errorLogUpdate', errorLog);
					await update();
					setToast(true, 'Success! Error log has been resolved.', 2000);
				} else {
					await update();
					setToast(false, 'Error! Error log could not be resolved.', 2000);
				}
			} catch (error) {
				console.error(error);
			} finally {
				isOpen = false;
			}
		};
	}
</script>

<Dialog.Root bind:open={isOpen}>
	<button
		class="transform text-green-500 transition-transform duration-150 ease-in-out hover:scale-105 hover:text-green-600 active:scale-110"
		on:click={() => (isOpen = true)}
	>
		<CheckCircle class="h-5 w-5" />
	</button>

	<Dialog.Content
		class="max-w-md rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 dark:text-gray-200"
	>
		<Dialog.Header>
			<Dialog.Title class="text-lg font-semibold">Resolution Details</Dialog.Title>
			<Dialog.Description class="text-sm text-gray-600 dark:text-gray-400">
				Please provide details on how you resolved the issue.
			</Dialog.Description>
		</Dialog.Header>

		<form action="?/resolveerror" method="post" use:enhance={enhanceForm} class="space-y-4">
			<!-- Hidden input field -->
			<input type="hidden" name="id" value={ID} />
			<input type="hidden" name="admin_notified" bind:value={isTrue} />
			<input type="hidden" name="resolved" bind:value={isTrue} />

			<!-- text area field -->
			<div class="grid w-full gap-1.5">
				<Label for="resolution_notes" class="mb-1">Resolution Details</Label>
				<Textarea
					placeholder="Describe how you resolved the issue..."
					id="resolution_notes"
					name="resolution_notes"
					required
					class="resize-none rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-400"
				/>
				<ValidationMessage error={form?.error?.resolution_notes} />
			</div>

			<div class="mt-4 flex justify-end space-x-4">
				<button
					type="submit"
					class="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
				>
					Save
				</button>
				<button
					type="button"
					class="rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-gray-400"
					on:click={() => (isOpen = false)}
				>
					Cancel
				</button>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>
