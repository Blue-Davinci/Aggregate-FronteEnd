<script>
    import { onMount } from 'svelte';
    let announcements = [];
    // sse
    onMount(() => {
        // Ensure EventSource is only used in the browser
        const eventSource = new EventSource('/api/announcements');
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("Announcements: ", data);
            announcements = [data, ...announcements];
        };

        return () => {
            // Clean up EventSource when the component is destroyed
            eventSource.close();
        };
    });
</script>

<ul>
    <h1>Announcements</h1>
    {#each announcements as announcement}
        <li>
            {announcement.message}
        </li>
    {/each}
    </ul>