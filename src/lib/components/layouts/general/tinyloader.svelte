<script>
export let message;
</script>

<svelte:head>
	<link rel="stylesheet" href="/loader-tiny.css" />
</svelte:head>

<div class="flex h-screen items-center justify-center">
    <div class="text-center">
        <div class="loader-wrapper inline-block">
            <div class="tinyloader"></div>
        </div>
        <p class="mt-4 text-lg">{message}</p>
    </div>
</div>