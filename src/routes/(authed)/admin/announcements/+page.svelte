<script>
	import { Edit, Trash2, Megaphone, AlertCircle, CheckCircle, XCircle  } from 'lucide-svelte';

	export let data;
	let announcements = data?.announcements ?? [];
       // Calculate statistics
       $: totalAnnouncements = announcements.length;
    $: activeAnnouncements = announcements.filter(a => !isExpired(a.expires_at)).length;
    $: expiredAnnouncements = totalAnnouncements - activeAnnouncements;
    $: urgencyCount = {
        high: announcements.filter(a => a.urgency === 'high').length,
        medium: announcements.filter(a => a.urgency === 'medium').length,
        low: announcements.filter(a => a.urgency === 'low').length,
    };
    $: mostUsedUrgency = Object.keys(urgencyCount).reduce((a, b) => urgencyCount[a] > urgencyCount[b] ? a : b);

	const urgencyStyles = {
		high: 'bg-red-200 text-red-800 dark:bg-red-300 dark:text-red-900',
		medium: 'bg-yellow-200 text-yellow-800 dark:bg-yellow-300 dark:text-yellow-900',
		low: 'bg-green-200 text-green-800 dark:bg-green-300 dark:text-green-900',
	};

	const formatDate = (dateString) => {
		const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	const isExpired = (expires_at) => {
		return new Date() > new Date(expires_at);
	};
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
   <!-- Announcements Statistics Label -->
   <div class="col-span-3">
       <p class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Announcement Statistics</p>
   </div>

   <!-- Total Announcements Card -->
   <div class="p-4 bg-blue-500 dark:bg-blue-600 text-white rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl">
       <div class="flex items-center justify-between">
           <p class="text-3xl font-extrabold font-mono truncate">{totalAnnouncements}</p>
           <Megaphone class="w-10 h-10" />
       </div>
       <h3 class="text-sm font-medium mt-2 text-right font-sans">Total Announcements</h3>
   </div>
   
   <!-- Active Announcements Card -->
   <div class="p-4 bg-green-500 dark:bg-green-600 text-white rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl">
       <div class="flex items-center justify-between">
           <p class="text-3xl font-extrabold font-mono truncate">{activeAnnouncements}</p>
           <CheckCircle class="w-10 h-10" />
       </div>
       <h3 class="text-sm font-medium mt-2 text-right font-sans">Active Announcements</h3>
   </div>

   <!-- Expired Announcements Card -->
   <div class="p-4 bg-red-500 dark:bg-red-600 text-white rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl">
       <div class="flex items-center justify-between">
           <p class="text-3xl font-extrabold font-mono truncate">{expiredAnnouncements}</p>
           <XCircle class="w-10 h-10" />
       </div>
       <h3 class="text-sm font-medium mt-2 text-right font-sans">Expired Announcements</h3>
   </div>

   <!-- Most Used Urgency Card -->
   <div class="col-span-3 p-4 bg-purple-500 dark:bg-purple-600 text-white rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl">
       <div class="flex items-center justify-between">
           <p class="text-3xl font-extrabold font-mono truncate">{mostUsedUrgency.charAt(0).toUpperCase() + mostUsedUrgency.slice(1)}</p>
           <AlertCircle class="w-10 h-10" />
       </div>
       <h3 class="text-sm font-medium mt-2 text-right font-sans">Most Used Urgency</h3>
   </div>
</div>

<div class="container mx-auto p-6">
	<h2 class="text-2xl font-semibold mb-6">Admin: Manage Announcements</h2>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each announcements as announcement}
			<div class={`rounded-lg p-4 shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-[1.02] 
				${urgencyStyles[announcement.urgency]} 
				${isExpired(announcement.expires_at) ? 'opacity-50' : 'opacity-100'}`}>
				<div class="flex justify-between items-start">
					<div>
						<h3 class="font-bold text-lg">{announcement.title}</h3>
						<p class="mt-2 text-sm">{announcement.message}</p>
						<span class="block mt-3 text-xs font-semibold">{formatDate(announcement.created_at)}</span>
						<span class={`block text-xs mt-1 px-2 py-1 rounded-full font-semibold bg-gray-700 text-white`}>
							{isExpired(announcement.expires_at) ? 'Expired' : 'Active'}
						</span>
					</div>
					<div class="flex space-x-2">
						<button class="text-gray-700 hover:text-black dark:text-gray-600 dark:hover:text-gray-800 transition-colors duration-200">
							<Edit class="w-5 h-5" />
						</button>
						<button class="text-gray-700 hover:text-black dark:text-gray-600 dark:hover:text-gray-00 transition-colors duration-200">
							<Trash2 class="w-5 h-5" />
						</button>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.container {
		max-width: 1200px;
	}
</style>
