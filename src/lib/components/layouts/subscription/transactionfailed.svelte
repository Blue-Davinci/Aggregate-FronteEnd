<script>
import { MonitorX } from 'lucide-svelte';
export let data;
</script>

<div class="flex flex-col items-center animate-fadeIn animate-popIn">
    <MonitorX class="w-24 h-24 text-red-500 mb-4 animate-bounce" />
    <h1 class="text-4xl font-extrabold text-center text-red-500 mt-6 animate-popIn">
        Transaction Failed
    </h1>
    <p class="text-center text-gray-600 dark:text-gray-300 mt-2">
        Unfortunately, there was an issue with your transaction. Please check the details below and try again or contact support.
    </p>
    <div class="overflow-x-auto mt-6 w-full">
        <table class="min-w-full bg-gray-100 dark:bg-gray-700 border-collapse rounded-md">
            <tbody>
                <tr class="border-t border-gray-200 dark:border-gray-600">
                    <td class="py-2 px-4 font-semibold text-gray-700 dark:text-gray-200">
                        Error
                    </td>
                    <td class="py-2 px-4">
                        {data.error?.transaction ?? data.error}
                    </td>
                </tr>
                <tr class="border-t border-gray-200 dark:border-gray-600">
                    <td class="py-2 px-4 font-semibold text-gray-700 dark:text-gray-200">
                        Name
                    </td>
                    <td class="py-2 px-4">
                        <span class="font-medium text-red-600 dark:text-red-400 underline">{data.props.username}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="flex justify-center mt-8 space-x-4">
        <a
            href="/dashboard"
            class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition-transform transform hover:scale-105 shadow-md"
        >
            Go to Dashboard
        </a>
        <a
            href="/subscription"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-transform transform hover:scale-105 shadow-md"
        >
            Go to Subscriptions
        </a>
    </div>
</div>