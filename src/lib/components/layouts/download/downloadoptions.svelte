<script>
	import { Download, FileJson, FileCode, FileText } from 'lucide-svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import jsPDF from 'jspdf';
	import { convertPostToPDFContent, convertToMarkdown } from '$lib/utilities/utils.js';

	export let post = {};
	let isOpen = false;
	let isDownloading = false;

	async function downloadPDF() {
		try {
            isDownloading = true;
			const doc = new jsPDF();
			await convertPostToPDFContent(post, doc);
			doc.save(`${post.info.Channel.Item[0].Title}.pdf`);
		} catch (error) {
			console.error('Error downloading PDF:', error);
		}finally{
            setTimeout(function() {
            isDownloading = false;
            }, 3000);
        }
	}

	function downloadJSON() {
		try {
            isDownloading = true;
			const dataStr = JSON.stringify(post, null, 2);
			const blob = new Blob([dataStr], { type: 'application/json' });
			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = `${post.info.Channel.Item[0].Title}.json`;
			document.body.appendChild(link);
			link.click();
			link.remove();
			URL.revokeObjectURL(url);
		} catch (error) {
			console.error('Error downloading JSON:', error);
		} finally{
            isDownloading = false;
        }
	}

	function downloadMarkdown() {
		try {
            isDownloading = true;
			const markdown = convertToMarkdown(post);
			const blob = new Blob([markdown], { type: 'text/markdown' });
			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = `${post.info.Channel.Item[0].Title}.md`;
			document.body.appendChild(link);
			link.click();
			link.remove();
			URL.revokeObjectURL(url);
		} catch (error) {
			console.error('Error downloading Markdown:', error);
		} finally{
            isDownloading = false;
        }
	}
</script>

<Dialog.Root bind:open={isOpen}>
	<Button
		class="flex transform items-center rounded-full bg-blue-500 px-3 py-1.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-blue-700 active:scale-95"
		on:click={() => (isOpen = true)}
	>
		<Download class="mr-2 h-6 w-6" />
		<span>Download</span>
	</Button>

	<Dialog.Content class="dialog-content rounded-lg p-6 shadow-md">
		<Dialog.Header>
			<Dialog.Title>Download The Post</Dialog.Title>
			<Dialog.Description>Choose an option to proceed with the download</Dialog.Description>
		</Dialog.Header>
		<p class="mb-4 text-gray-600">Download the post in the following formats:</p>
		<div class="flex flex-col space-y-4">
			<Button class="flex w-full items-center justify-center space-x-2" disabled={isDownloading} on:click={downloadPDF}>
				{#if isDownloading}
					<svg
						width="20"
						height="20"
						fill="currentColor"
						class="mr-2 animate-spin"
						viewBox="0 0 1792 1792"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"
						></path>
					</svg>
					<span>Downloading...</span>
				{:else}
					<FileText class="mr-2 h-8 w-8" />
					<span>Download as PDF</span>
				{/if}
			</Button>
			<Button class="flex w-full items-center justify-center space-x-2" disabled={isDownloading}  on:click={downloadMarkdown}>
				{#if isDownloading}
					<svg
						width="20"
						height="20"
						fill="currentColor"
						class="mr-2 animate-spin"
						viewBox="0 0 1792 1792"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"
						></path>
					</svg>
					<span>Downloading...</span>
				{:else}
					<FileCode class="mr-2 h-8 w-8" />
					<span>Download as Markdown</span>
				{/if}
			</Button>
			<Button class="flex w-full items-center justify-center space-x-2" disabled={isDownloading}  on:click={downloadJSON}>
				{#if isDownloading}
					<svg
						width="20"
						height="20"
						fill="currentColor"
						class="mr-2 animate-spin"
						viewBox="0 0 1792 1792"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"
						></path>
					</svg>
					<span>Downloading...</span>
				{:else}
					<FileJson class="mr-2 h-8 w-8" />
					<span>Download as JSON</span>
				{/if}
			</Button>
		</div>
		<Dialog.Footer>
            <Button
            class="px-4 py-2 rounded-full bg-gray-300 text-gray-800 hover:bg-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            type="button"
            on:click={() => (isOpen = false)}
        >
            Close
        </Button>
    
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<style>
	:global(.dialog-content) {
		max-height: 50vh; /* Limit the height to 50% of the viewport height */
		overflow-y: auto; /* Add vertical scroll if content overflows */
	}
</style>
