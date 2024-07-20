<script>
	import { ClipboardList } from 'lucide-svelte';
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import { Button } from "$lib/components/ui/button";
</script>

<AlertDialog.Root>
    <AlertDialog.Trigger asChild let:builder>
        <Button builders={[builder]} variant="outline" class="p-2 rounded-full border-0 hover:bg-blue-100 dark:hover:bg-blue-900">
            <ClipboardList class="h-6 w-6" />
        </Button>
    </AlertDialog.Trigger>
    <AlertDialog.Content class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <AlertDialog.Header>
            <AlertDialog.Title class="text-lg font-semibold text-gray-900 dark:text-gray-100">Copied to clipboard</AlertDialog.Title>
            <AlertDialog.Description class="text-gray-700 dark:text-gray-300">
                The link has been copied to your clipboard!
            </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
            <AlertDialog.Action class="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Continue</AlertDialog.Action>
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>
