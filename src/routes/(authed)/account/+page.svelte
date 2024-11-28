<script>
    import Pageheader from '$lib/components/layouts/general/pageheader.svelte';
    import Goback from '$lib/components/layouts/general/goback.svelte';
    import { fly, slide } from 'svelte/transition';
    import {Code2, UserRoundCog} from 'lucide-svelte';
    import Avatarupload from '$lib/components/layouts/account/avatarupload.svelte';
    import Changename from '$lib/components/layouts/account/changename.svelte';
    import Passwordchange from '$lib/components/layouts/account/passwordchange.svelte';

    export let data;
    export let form;
    let userImage = data.props.userimage;
    let currentName = data.props.username;
    // page info
    let pageInfo = {
		title: 'User Dashboard',
		message:
			'Customize your name, profile picture, and password settings here.',
		icon: UserRoundCog
	};
</script>

<Goback/>
<Pageheader title={pageInfo.title} message={pageInfo.message} icon={pageInfo.icon}/>
<div in:fly={{ x: -200, duration: 1000 }} out:slide={{ duration: 600 }} class="container mx-auto mt-8 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="col-span-1 flex flex-col justify-center">
            <div class="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md h-full flex flex-col justify-center">
                <Avatarupload {form} {userImage} userName={currentName} />
            </div>
        </div>
        <div class="col-span-1 flex flex-col space-y-8">
            <div class="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                <Changename {currentName} {form}/>
            </div>
            <div class="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                <Passwordchange />
            </div>
        </div>
    </div>
    <p class="mt-4 text-xs text-center text-gray-500 dark:text-gray-400 flex items-center justify-center space-x-2">
        <Code2 class="h-5 w-5" /> <!-- Adjust the size if needed -->
        <span>Aggregate! Powered by <a href="https://svelte.dev/" class="underline">Svelte</a></span>
    </p>
</div>
