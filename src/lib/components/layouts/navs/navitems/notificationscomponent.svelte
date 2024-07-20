<script>
    import {clearCommentNotificationDataService} from '$lib/dataservice/getPostNotificationsDataService';
	import { BellDot, MessageSquareQuote} from 'lucide-svelte';
    export let notifications;
    export let total_notifications;
    async function handleClearCommentNotification(){
        let response = await clearCommentNotificationDataService();
        if(!response.error){
            console.log("Comment notification cleared");
        }
    }
    console.log("Notifications---:", notifications);
</script>

<div
class="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
role="menu"
aria-orientation="vertical"
aria-labelledby="notification-button"
tabindex="-1"
>
{#if notifications && total_notifications === 0}
    <span
        class="block px-4 py-2 text-xs text-black-500 hover:bg-gray-200 hover:text-gray-900 dark:text-black dark:hover:bg-gray-600 dark:hover:text-gray-100"
    >
        No new messages
    </span>
{:else if notifications.Notification && notifications.Notification.length > 0}
    {#each notifications.Notification as { feed_name, post_count }, index}
        <span
            class="dark:black block flex items-center px-5 py-3 text-sm text-black transition-colors duration-200 ease-in-out hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100 {index !==
            notifications.length - 1
                ? 'border-b'
                : ''} border-gray-300 dark:border-gray-300"
        >
        <BellDot class="h-5 w-5 mr-3 text-red-500 dark:text-red-400"/>
            <span class="flex-1">
                <span class="font-semibold">{feed_name}</span> has added
                <span class="font-semibold">{post_count}</span> post(s)
            </span>
        </span>
    {/each}
{/if}
{#if notifications.CommentNotification && notifications.CommentNotification.length > 0 }
    {#each notifications.CommentNotification as { post_id, created_at }, index}
    <a
        href={`/dashboard/${post_id}`}
        on:click={handleClearCommentNotification}
        class="dark:black block flex items-center px-5 py-3 text-sm text-black transition-colors duration-200 ease-in-out hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100 {index !== notifications.CommentNotification.length - 1 ? 'border-b' : ''} border-gray-300 dark:border-gray-300"
    >
        <MessageSquareQuote class="h-5 w-5 mr-3 text-green-500 dark:text-green-400" />
        <span class="flex-1">
            <span class="font-semibold">You have a New </span> on your post
        </span>
    </a>
{/each}
{/if}
</div>