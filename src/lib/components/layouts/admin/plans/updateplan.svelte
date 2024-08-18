<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { Edit } from 'lucide-svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import ValidationMessage from '$lib/components/layouts/auth/authvalidation_message.svelte';
	import { enhance } from '$app/forms';
	import { setToast } from '$lib/utilities/utils';
	import { goto } from '$app/navigation';

	export let form;
	export let plan;

	const dispatch = createEventDispatcher();
	let defaultImage =
		'https://images.unsplash.com/photo-1720048091816-cb6d3c0333be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBheW1lbnRzfGVufDB8fDB8fHww';
	let isOpen = false;
	let isLoading;
	let formData = {
		name: '',
		image: defaultImage,
		description: '',
		duration: '',
		price: 0,
		features: [],
		status: 'active'
	};
	let initialFormData = {};

	function initializeFormData() {
		if (plan) {
			formData = {
				...plan,
				features: plan.features || [],
				price: plan.amount
			};
			initialFormData = { ...formData };
		}
	}

	onMount(() => {
		initializeFormData();
	});

	function clearData() {
		initializeFormData();
		form = undefined;
	}

	function isFormDataValid() {
		return (
			formData.name.trim() !== '' &&
			formData.image.trim() !== '' &&
			formData.description.trim() !== '' &&
			formData.duration.trim() !== '' &&
			formData.price !== '' &&
			formData.features.length > 0
		);
	}

	function enhanceForm() {
		if (!isFormDataValid()) {
			setToast(false, 'All fields are required.', 3000);
		} else {
			isLoading = true;
			return async ({ result, update }) => {
				//console.log("Enhancement: ",result);
				if (result.type === 'redirect') {
					await update();
					setToast(false, 'Session expired. Please login again.', 3000);
					isLoading = false;
					isOpen = false;
					await goto(result.location);
					return;
				}

				if (result.type === 'success' && result.data?.updatedPlan?.payment_plan) {
					const paymentPlan = result.data.updatedPlan.payment_plan;
					dispatch('updatePlan', paymentPlan);
					await update();
					setToast(true, 'Plan updated successfully.', 3000);
					isLoading = false;
					isOpen = false;
					clearData();
					return;
				}

				if (result.data && result.data.status === 409) {
					setToast(false, result.data.error.name, 3000);
					isLoading = false;
					return;
				}

				await update();
				setToast(false, result.data?.error || 'An unknown error occurred', 3000);
				isLoading = false;
			};
		}
	}

	function addFeature(event) {
		if (event.key === 'Enter' || event.key === ',') {
			event.preventDefault();
			const feature = event.target.value.trim();
			if (feature && !formData.features.includes(feature)) {
				formData.features = [...formData.features, feature];
				event.target.value = '';
				formData.featuresAsString = formData.features.join(',');
			}
		}
	}

	function removeFeature(feature) {
		formData.features = formData.features.filter((f) => f !== feature);
	}

	$: formData.featuresAsString = formData.features.join(',');
</script>

<Dialog.Root bind:open={isOpen}>
	<button
		tabindex="-1"
		class="absolute left-2 top-2 rounded-full bg-blue-500 p-2 text-white shadow-lg transition duration-300 hover:bg-blue-600"
		on:click={() => (isOpen = true)}
	>
		<Edit class="h-6 w-6" />
	</button>

	<Dialog.Content class="update-dialog-content  max-w-sm rounded-lg bg-white p-6 shadow-md">
		<Dialog.Header>
			<Dialog.Title>Update Plan</Dialog.Title>
			<Dialog.Description
				>Update the details of the subscription plan and click save.</Dialog.Description
			>
		</Dialog.Header>

		<form method="post" action="?/updatePlan" use:enhance={enhanceForm} class="space-y-4">
			<!-- Hidden fields for initial form data -->
			<input type="hidden" name="original_name" value={initialFormData.name} />
			<input type="hidden" name="original_image" value={initialFormData.image} />
			<input type="hidden" name="original_description" value={initialFormData.description} />
			<input type="hidden" name="original_duration" value={initialFormData.duration} />
			<input type="hidden" name="original_price" value={initialFormData.price} />
			<input type="hidden" name="original_features" value={initialFormData.features.join(',')} />
			<input type="hidden" name="original_status" value={initialFormData.status} />
			<!-- Add this hidden input to ensure features are included in the form submission -->
			<input type="hidden" name="formfeatures" value={formData.featuresAsString} />

			<input type="hidden" name="plan_id" value={plan.id} />

			<div class="grid grid-cols-1 gap-4">
				<div class="mb-4 flex justify-center">
					{#if formData.image}
						<img
							src={formData.image}
							alt="Plan"
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

				<!-- Plan Name -->
				<div class="flex flex-col">
					<Label for="name" class="mb-2 text-left">Plan Name</Label>
					<Input
						id="name"
						name="name"
						disabled={isLoading}
						bind:value={formData.name}
						placeholder="cool or boring name"
					/>
					<ValidationMessage error={form?.error?.name} />
				</div>

				<!-- Image URL -->
				<div class="flex flex-col">
					<Label for="image" class="mb-2 text-left">Image URL</Label>
					<Input
						id="image"
						name="image"
						disabled={isLoading}
						bind:value={formData.image}
						placeholder="a nice image link to show off the plan"
					/>
					<ValidationMessage error={form?.error?.image} />
				</div>

				<!-- Description -->
				<div class="flex flex-col">
					<Label for="description" class="mb-2 text-left">Description</Label>
					<Input
						id="description"
						name="description"
						placeholder="A brief description of the plan"
						disabled={isLoading}
						bind:value={formData.description}
					/>
					<ValidationMessage error={form?.error?.description} />
				</div>

				<!-- Duration -->
				<div class="flex flex-col">
					<Label for="duration" class="mb-2 text-left">Duration</Label>
					<Input
						id="duration"
						name="duration"
						placeholder="e.g. hour, day, week, month, year"
						disabled={isLoading}
						bind:value={formData.duration}
					/>
					<ValidationMessage error={form?.error?.duration} />
				</div>

				<!-- Price -->
				<div class="flex flex-col">
					<Label for="price" class="mb-2 text-left">Price</Label>
					<Input
						id="price"
						name="price"
						type="number"
						disabled={isLoading}
						bind:value={formData.price}
					/>
					<ValidationMessage error={form?.error?.price} />
				</div>

				<!-- Features -->
				<div class="flex flex-col">
					<Label for="features" class="mb-2 text-left">Features</Label>
					<div class="flex items-center">
						<Input
							id="features"
							name="features"
							disabled={isLoading}
							on:keydown={addFeature}
							placeholder="Type and press Enter or comma to add features"
						/>
					</div>
					<div class="mt-2 flex flex-wrap space-x-2">
						{#each formData.features as feature}
							<div class="mb-2 rounded-full bg-blue-500 px-4 py-1 text-white">
								{feature} <button type="button" on:click={() => removeFeature(feature)}>x</button>
							</div>
						{/each}
					</div>
					<ValidationMessage error={form?.error?.features} />
				</div>

				<!-- Status -->
				<div class="flex flex-col">
					<Label for="status" class="mb-2 text-left">Status</Label>
					<select
						id="status"
						name="status"
						bind:value={formData.status}
						disabled={isLoading}
						class="input-base w-full"
					>
						<option value="active">Active</option>
						<option value="inactive">Inactive</option>
					</select>
				</div>
			</div>

			<div class="mt-6 flex justify-end space-x-4">
				<Button
					type="submit"
					class="bg-green-500 text-white hover:bg-green-600"
					disabled={isLoading}>Update Plan</Button
				>
				<Button
					type="button"
					class="bg-gray-300 text-black hover:bg-gray-400"
					on:click={() => (isOpen = false)}
					disabled={isLoading}>Cancel</Button
				>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>

<style>
	:global(.update-dialog-content) {
		max-height: 80vh; /* Limit the height to 80% of the viewport height */
		overflow-y: auto; /* Add vertical scroll if content overflows */
	}
</style>
