<script>
    import { Undo2 } from 'lucide-svelte';
    export let back_url = '/dashboard';
</script>

<a href={back_url} class="mt-10 mb-3 flex items-center text-white bg-blue-500 hover:bg-blue-700 transition-colors duration-300 px-4 py-2 rounded-md">
    <Undo2 class="mr-2 h-5 w-5" />
    <span class="font-medium">Go Back</span>
</a>