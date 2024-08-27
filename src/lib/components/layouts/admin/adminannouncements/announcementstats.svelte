<script>
	import { Megaphone, AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-svelte';
	import { fly, fade } from 'svelte/transition';

	export let isExpired;
	export let announcements = [];

	// Calculate statistics
	$: totalAnnouncements = announcements.length;
    $: activeAnnouncements = announcements.filter((a) => a.is_active).length;
    $: inactiveAnnouncements = announcements.filter((a) => !a.is_active).length;
	$: expiredAnnouncements = announcements.filter((a) => isExpired(a.expires_at)).length;
    $: nonExpiredAnnouncements = totalAnnouncements - expiredAnnouncements;
    $: urgencyCount = {
		high: announcements.filter((a) => a.urgency === 'high').length,
		medium: announcements.filter((a) => a.urgency === 'medium').length,
		low: announcements.filter((a) => a.urgency === 'low').length
	};
	$: mostUsedUrgency = Object.keys(urgencyCount).reduce((a, b) =>
		urgencyCount[a] > urgencyCount[b] ? a : b
	);

    // New example card: Announcements expiring soon (within 7 days)
	$: upcomingExpiryAnnouncements = announcements.filter((a) => {
		const expiryDate = new Date(a.expires_at);
		const today = new Date();
		const daysUntilExpiry = (expiryDate - today) / (1000 * 60 * 60 * 24);
		return daysUntilExpiry > 0 && daysUntilExpiry <= 7;
	}).length;
</script>

<div
	class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
	in:fly={{ x: -200, duration: 1000 }}
	out:fade={{ duration: 300 }}
>
	<!-- Announcements Statistics Label -->
	<div class="col-span-3">
		<p class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
			Announcement Statistics
		</p>
	</div>

	<!-- Total Announcements Card -->
	<div
		class="transform rounded-lg bg-blue-500 p-4 text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-blue-600"
	>
		<div class="flex items-center justify-between">
			<p class="truncate font-mono text-3xl font-extrabold">{totalAnnouncements}</p>
			<Megaphone class="h-10 w-10" />
		</div>
		<h3 class="mt-2 text-right font-sans text-sm font-medium">Total Announcements</h3>
	</div>

	<!-- Active Announcements Card -->
	<div
		class="transform rounded-lg bg-green-500 p-4 text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-green-600"
	>
		<div class="flex items-center justify-between">
			<p class="truncate font-mono text-3xl font-extrabold">{activeAnnouncements}</p>
			<CheckCircle class="h-10 w-10" />
		</div>
		<h3 class="mt-2 text-right font-sans text-sm font-medium">Active Announcements</h3>
	</div>

	<!-- Expired Announcements Card -->
	<div
		class="transform rounded-lg bg-red-500 p-4 text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-red-600"
	>
		<div class="flex items-center justify-between">
			<p class="truncate font-mono text-3xl font-extrabold">{expiredAnnouncements}</p>
			<XCircle class="h-10 w-10" />
		</div>
		<h3 class="mt-2 text-right font-sans text-sm font-medium">Expired Announcements</h3>
	</div>

	<!-- Most Used Urgency Card -->
	<div
		class="transform rounded-lg bg-purple-500 p-4 text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-purple-600"
	>
		<div class="flex items-center justify-between">
			<p class="truncate font-mono text-3xl font-extrabold">
				{mostUsedUrgency.charAt(0).toUpperCase() + mostUsedUrgency.slice(1)}
			</p>
			<AlertCircle class="h-10 w-10" />
		</div>
		<h3 class="mt-2 text-right font-sans text-sm font-medium">Most Used Urgency</h3>
	</div>

	<!-- Inactive Announcements Card -->
	<div
		class="transform rounded-lg bg-yellow-500 p-4 text-black shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-yellow-600"
	>
		<div class="flex items-center justify-between">
			<p class="truncate font-mono text-3xl font-extrabold">{inactiveAnnouncements}</p>
			<Clock class="h-10 w-10" />
		</div>
		<h3 class="mt-2 text-right font-sans text-sm font-medium">Inactive Announcements</h3>
	</div>

	<!-- Upcoming Expiry Announcements Card -->
	<div
		class="transform rounded-lg bg-orange-500 p-4 text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-orange-600"
	>
		<div class="flex items-center justify-between">
			<p class="truncate font-mono text-3xl font-extrabold">{upcomingExpiryAnnouncements}</p>
			<Clock class="h-10 w-10" />
		</div>
		<h3 class="mt-2 text-right font-sans text-sm font-medium">Expiring Soon</h3>
	</div>
</div>
