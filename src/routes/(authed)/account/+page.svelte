<script>
    import Goback from '$lib/components/layouts/general/goback.svelte';
    import { Separator } from '$lib/components/ui/separator';
    import { fly, slide } from 'svelte/transition';
    import Avatarupload from '$lib/components/layouts/account/avatarupload.svelte';
    import Changename from '$lib/components/layouts/account/changename.svelte';

    export let data;
    export let form;
    let userImage = data.props.userimage;
    let currentName = data.props.username;
</script>

<Goback />
<div in:fly={{ x: -200, duration: 1000 }} out:slide={{ duration: 600 }} class="container mx-auto mt-8 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
    <h1 class="text-4xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Account Settings</h1>
    <p class="text-center text-gray-700 dark:text-gray-300 mb-8">This is a protected page. You can only access this page if you are logged in.</p>
    <div class="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
        <div class="w-full md:w-1/2">
            <div class="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                <Avatarupload {form} {userImage} />
            </div>
        </div>
        <div class="w-full md:w-1/2">
            <div class="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                <Changename {currentName} />
            </div>
        </div>
    </div>
</div>
