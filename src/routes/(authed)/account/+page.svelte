<script>
    import Goback from '$lib/components/layouts/general/goback.svelte';
    import { fly, slide } from 'svelte/transition';
    import Avatarupload from '$lib/components/layouts/account/avatarupload.svelte';
    import Changename from '$lib/components/layouts/account/changename.svelte';
    import Passwordchange from '$lib/components/layouts/account/passwordchange.svelte';

    export let data;
    export let form;
    let userImage = data.props.userimage;
    let currentName = data.props.username;
</script>

<Goback />
<div in:fly={{ x: -200, duration: 1000 }} out:slide={{ duration: 600 }} class="container mx-auto mt-8 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
    <h1 class="text-4xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Account Settings</h1>
    <p class="text-center text-gray-700 dark:text-gray-300 mb-8">This is a protected page. You can only access this page if you are logged in.</p>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="col-span-1 flex flex-col justify-center">
            <div class="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md h-full flex flex-col justify-center">
                <Avatarupload {form} {userImage} userName={currentName} />
            </div>
        </div>
        <div class="col-span-1 flex flex-col space-y-8">
            <div class="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                <Changename {currentName} />
            </div>
            <div class="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                <Passwordchange />
            </div>
        </div>
    </div>
    <p class="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
        Robots lovingly delivered by <a href="https://robohash.org" class="underline">Robohash.org</a>
    </p>
</div>
