<script>
	import {Megaphone} from 'lucide-svelte';
	import { setToast } from '$lib/utilities/utils';
	import * as Dialog from '$lib/components/ui/dialog';
	import { onMount, onDestroy } from 'svelte';
	import { getAnnouncementsForUser, markAnnouncementAsRead } from '$lib/dataservice/announcementDataService.js';
	import { CheckCircle } from 'lucide-svelte';
	import { fly, fade, slide } from 'svelte/transition';

	let announcements = [];
	let pollingTime = 12 * 60 * 60 * 1000; // 12 hours
	let isModalOpen = false;
	let intervalId;

	const urgencyStyles = {
		high: 'bg-red-500 text-white dark:bg-red-600',
		medium: 'bg-yellow-400 text-black dark:bg-yellow-500',
		low: 'bg-green-400 text-black dark:bg-green-500',
	};

	const badgeStyles = {
		high: 'bg-red-700 text-white dark:bg-red-800',
		medium: 'bg-yellow-600 text-black dark:bg-yellow-700',
		low: 'bg-green-600 text-white dark:bg-green-700',
	};

	const formatDate = (dateString) => {
		const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	const getAnnouncements = async () => {
		//console.log('Fetching announcements...');
		let response = await getAnnouncementsForUser();
		if (response.success) {
			announcements = response?.data?.announcements ?? [];
			isModalOpen = announcements.length > 0;
		} else {
			console.error("Error fetching announcements:", response);
		}
	};

	const markAsRead = async(id) => {
		let response = await markAnnouncementAsRead(id);
		if (response.success) {
			// Show a toast message
			setToast(true, 'Announcement marked as read successfully', 2000);
			// Remove the announcement from the list if it was marked as read successfully
			announcements = announcements.filter((announcement) => announcement.id !== id);
			// Close the modal if there are no more announcements
			if (announcements.length === 0) {
				isModalOpen = false;
			}
		} else {
			setToast(false, 'Error celaring the announcement. It will still show on your next visit', 2000);
			console.error("Error marking announcement as read:", response);
		}
	};

	onMount(() => {
		// Fetch announcements on mount
		getAnnouncements();

		// Set up polling
		intervalId = setInterval(() => {
			getAnnouncements();
		}, pollingTime); // Poll every 12 hours
	});

	onDestroy(() => {
		// Clear the interval when the component is destroyed
		clearInterval(intervalId);
	});
</script>

<Dialog.Root bind:open={isModalOpen}>
	<Dialog.Content class="rounded-lg p-6 shadow-md max-w-lg mx-auto">
		<Dialog.Header>
			<Dialog.Title class="text-lg font-semibold flex items-center space-x-3">
				<span class="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full shadow-md">
					<Megaphone class="w-5 h-5" />
				</span>
				<span>Announcements</span>
			</Dialog.Title>
		</Dialog.Header>
		<div class="space-y-4"
		in:fly={{ x: 200, duration: 1000 }} 
		out:fade>
			{#each announcements as announcement}
				<div class={`rounded-lg p-4 ${urgencyStyles[announcement.urgency]} shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-[1.02]`}
				out:slide={{x:200, duration: 400}}>
					<div class="flex justify-between items-start">
						<div>
							<h3 class="font-bold text-lg">{announcement.title}</h3>
							<p class="mt-2 text-sm">{announcement.message}</p>
							<span class={`inline-block mt-3 text-xs font-semibold px-2 py-1 rounded-full ${badgeStyles[announcement.urgency]}`}>
								{formatDate(announcement.created_at)}
							</span>
						</div>
						<button on:click={() => markAsRead(announcement.id)} class="ml-4 flex items-center space-x-1 text-sm text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-2 py-1 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800 transition-colors duration-200">
							<CheckCircle class="w-4 h-4" />
							<span>Mark as Read</span>
						</button>
					</div>
				</div>
			{/each}
		</div>
	</Dialog.Content>
</Dialog.Root>
