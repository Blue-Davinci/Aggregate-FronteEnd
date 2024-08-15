<script>
	import { page } from '$app/stores';
	import { AlertCircle } from 'lucide-svelte'; // Example icon import from Lucide Svelte
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>Error</title>

	<!-- Google Font -->
	<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,900" rel="stylesheet" />
</svelte:head>

<div class="flex flex-col items-center justify-center h-screen p-4 transition-all duration-500">
	<div class="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg transition-transform transform hover:scale-105">
		<div class="mb-4">
			<h1 class="font-extrabold text-transparent bg-clip-text bg-center bg-cover leading-none" 
			    style="background-image: url('https://i.ibb.co/W5xrrRN/bg.jpg'); font-size: 200px;">
				Oops!
			</h1>
		</div>
		{#if $page.error}
			<AlertCircle class="w-16 h-16 text-red-500 dark:text-red-400 mx-auto mb-4" />
			<h2 class="text-3xl font-semibold uppercase mb-4 text-indigo-600 dark:text-indigo-400">
				{$page.error.title ? $page.error.title : 'An Error Occurred'}
			</h2>
			<p class="text-lg mb-6 text-gray-700 dark:text-gray-300">
				{$page.error.message ? $page.error.message : 'Something went wrong, but we’re working on it.'}
			</p>
			<p class="text-sm mb-8 text-gray-600 dark:text-gray-400">
				{$page.error.info ? $page.error.info : 'A problem has occurred that prevented us from displaying what you wanted.'}
			</p>
		{:else}
			<h2 class="text-3xl font-semibold uppercase mb-4 text-indigo-600 dark:text-indigo-400">
				Unknown Error
			</h2>
			<p class="text-lg mb-6 text-gray-700 dark:text-gray-300">
				An unexpected error occurred, and we are unable to display the page.
			</p>
		{/if}
		<a href="/" class="inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring focus:ring-blue-300 rounded-lg shadow-md transition-all duration-300 transform hover:scale-110 uppercase">
			Go To Homepage
		</a>
	</div>
</div>
