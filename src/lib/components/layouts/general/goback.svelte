<script>
    import { browser } from "$app/environment";
	import { Undo2 } from 'lucide-svelte';
	//export let back_url = '/dashboard';
	function nav_back() {
		if (browser) window.history.back();
	}
</script>

<a
	href={"#goback"}
    on:click={nav_back}
	class="mb-3 mt-10 flex items-center rounded-md bg-blue-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-700"
>
	<Undo2 class="mr-2 h-5 w-5" />
	<span class="font-medium">Go Back</span>
</a>
