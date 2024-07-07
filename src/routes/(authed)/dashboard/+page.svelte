<script>
	import DashboardNav from '$lib/components/layouts/dashboardnav.svelte';
	import { goto } from '$app/navigation';
	import { fly, slide, fade } from 'svelte/transition';
	import PostsCard from '$lib/components/layouts/postscard.svelte';
	import { Plus } from 'lucide-svelte'; // Importing the Plus icon
	import * as Dialog from '$lib/components/ui/dialog'; // Importing Dialog components
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import ValidationMessage from '$lib/components/layouts/authvalidation_message.svelte';
	import { setToast } from '$lib/utilities/utils';
	import { enhance } from '$app/forms'; // Importing enhance from SvelteKit

	export let data;
	export let form = undefined;

	let isLoading = false;
	$: posts = data.followed_rss_posts;

	let isOpen = false;

	let formData = {
		name: '',
		url: '',
		img_url: '',
		feed_type: '',
		feed_description: ''
	};

	function clearData() {
		formData = {
			name: '',
			url: '',
			img_url: '',
			feed_type: '',
			feed_description: ''
		};
		form = undefined;
	}
	function isFormDataValid() {
		return Object.values(formData).every((value) => value.trim() !== '');
	}
	function enhanceForm() {
		if (!isFormDataValid()) {
			setToast(false, 'Fields cannot be empty.', 3000);
		} else {
			return async ({ result, update }) => {
				//console.log('Result: ', result);

				// Handle redirect
				if (result.type === 'redirect') {
					console.log('Redirecting to login page');
					await update();
					setToast(false, 'Sorry, you have been logged out. Please login again.', 3000);
					isOpen = false;
					await goto(result.location);
					return;
				}

				// Handle successful creation
				if (result.data && result.data?.feed) {
					console.log('Successfully saved');
					await update();
					console.log('Feed added well: ', result);
					setToast(true, 'Feed added successfully.', 3000);
					isOpen = false;
					clearData();
					return;
				}

				// Handle conflict (status 409)
				if (result.data && result.data.status === 409) {
					console.log('Edit conflict');
					setToast(false, result.data.error.url, 3000);
					return;
				}

				// Handle other errors
				await update();

				console.log('Result',result);
				setToast(false, result.data?.error || 'An unknown error occurred', 3000);
			};
		}
	}
</script>

<svelte:head>
	<title>Dashboard • Aggregate</title>
	<link rel="stylesheet" href="/auth.css" />
</svelte:head>
<div in:fly={{ x: -200, duration: 1000 }} out:slide={{ duration: 400 }}>
	<DashboardNav />
	<h1>
		<strong>Dashboard</strong>
	</h1>
	<p>This is a protected page. You can only access this page if you are logged in.</p>
</div>

<div class="feeds-container" in:fly={{ x: 200, duration: 1000 }} out:fade>
	{#each posts as post (post.id)}
		<PostsCard {post} />
	{/each}
</div>

<!-- Floating Action Button -->
<Dialog.Root bind:open={isOpen}>
	<Dialog.Trigger>
		<button
			class="fixed bottom-5 right-5 flex items-center rounded-full bg-blue-500 px-4 py-2 font-bold text-white shadow-lg hover:bg-blue-700"
		>
			<Plus class="h-8 w-8" />
			<span class="ml-2">Add Your Feed</span>
		</button>
	</Dialog.Trigger>
	<Dialog.Content class="rounded-lg p-6 shadow-md sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Add New Feed</Dialog.Title>
			<Dialog.Description>Fill in the details of the new feed and click save.</Dialog.Description>
		</Dialog.Header>
		<form method="post" action="?/addfeed" use:enhance={enhanceForm} class="space-y-4">
			<div class="grid grid-cols-1 gap-4">
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
					{#if isLoading}
						<div class="saving-container">
							<span class="loader"></span>
							<span class="saving">Saving..</span>
						</div>
					{/if}
					<ValidationMessage error={form?.error?.feed_description} />
				</div>
			</div>
			<Dialog.Footer>
				<Button type="submit">Save</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>

<style>
	.feeds-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 10px;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;
	}

	.fixed {
		position: fixed;
	}
</style>
