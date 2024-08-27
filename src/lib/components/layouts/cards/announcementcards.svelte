<script>
    import { fly, fade } from 'svelte/transition';
    import { adminDeleteAnnouncement } from '$lib/dataservice/announcementDataService';
    import { setToast } from '$lib/utilities/utils';
    import { Trash2 } from 'lucide-svelte';
    import { createEventDispatcher } from 'svelte';

    export let announcements;
    export let isExpired;
    const dispatch = createEventDispatcher();

    const deleteAnnouncement = async (id) => {
        let response = await adminDeleteAnnouncement(id);
        if (response.success) {
            setToast(true, response.data.message, 3000);
            dispatch('deleteAnnouncement', id);
        } else {
            setToast(false, response.message, 3000);
        }
    };

    const urgencyStyles = {
        high: 'bg-red-200 text-red-800 dark:bg-red-300 dark:text-red-900',
        medium: 'bg-yellow-200 text-yellow-800 dark:bg-yellow-300 dark:text-yellow-900',
        low: 'bg-green-200 text-green-800 dark:bg-green-300 dark:text-green-900',
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
</script>

<div class="container mx-auto p-6" in:fly={{ x: 200, duration: 1000 }} out:fade={{ duration: 300 }}>
    <h2 class="text-2xl font-semibold mb-6">Admin: Manage Announcements</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each announcements as announcement}
            <div 
            in:fly={{ x: 200, duration: 1000 }}
            out:fade={{ duration: 500 }}
            class={`flex flex-col justify-between h-full rounded-lg p-4 shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-[1.02] 
                 ${urgencyStyles[announcement.urgency]} 
                ${isExpired(announcement.expires_at) ? 'opacity-50' : 'opacity-100'}
                ${!announcement.is_active ? 'opacity-40 border border-red-500' : ''}`}>
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="font-bold text-lg">{announcement.title}</h3>
                        <p class="mt-2 text-sm">{announcement.message}</p>
                        <span class="block mt-3 text-xs font-semibold">{formatDate(announcement.created_at)}</span>
                    </div>
                    <div class="flex space-x-2">
                        <button 
                            on:click={() => deleteAnnouncement(announcement.id)}
                            class="text-gray-700 hover:text-red-800 dark:text-gray-600 dark:hover:text-red-500 transition-colors duration-200">
                            <Trash2 class="w-6 h-6" />
                        </button>
                    </div>
                </div>
                <div class="flex justify-between items-center mt-4">
                    <span class={`text-xs px-2 py-1 rounded-full font-semibold 
                    ${announcement.is_active ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                        {announcement.is_active ? 'Active' : 'Inactive'}
                    </span>
                    <span class={`block text-xs px-2 py-1 rounded-full font-semibold bg-gray-700 text-white`}>
                        {isExpired(announcement.expires_at) ? 'Expired' : 'Running'}
                    </span>
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
