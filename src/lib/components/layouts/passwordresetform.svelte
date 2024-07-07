<script>
    import { Input } from '$lib/components/ui/input';
    import { FilePen, KeySquare } from 'lucide-svelte/icons';
    import ValidationMessage from '$lib/components/layouts/authvalidation_message.svelte';
    import {setToast} from '$lib/utilities/utils.js'
    import {goto} from '$app/navigation';
    import { enhance } from '$app/forms';
    export let form;
    export let data;

    let password = '';
    let confirm_password = '';
    let token = data.token;
    $: console.log(">> Error: ", form?.error);
    let isLoading = false;

    function enhanceForm() {
        isLoading = true;
        return async ({ result, update }) => {
			try {
				if (result.type === 'redirect') {
					setToast(true, `Your password was succesfully changed. Check your email for more information`, 3000);
					await update();
					await goto("/login");
				}else if (form?.error?.token){
                    setToast(false, `${form.error.token}`, 4000);
					await update();
					await goto("/login");
                }
				await update();
			} catch (err) {
				console.log(err);
				// Handle error
			} finally {
				password = '';
                confirm_password = '';
				isLoading = false;
			}
		};
    }

    console.log('Pam pam:', data.token);
</script>

<div class="mx-auto my-10 flex max-w-4xl rounded-xl bg-white shadow-md dark:bg-gray-800">
    <div class="relative w-full md:w-1/2">
        <div class="absolute inset-0 rounded-l-xl bg-cover bg-center bg-no-repeat"
            style="background-image: url('https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');">
            <div class="absolute bottom-0 left-0 right-0 rounded-l-xl bg-black bg-opacity-50 p-4">
                <p class="mb-2 text-lg font-medium text-white">
                    "Passwords are the keys to our digital world; choose them wisely and guard them fiercely."~ Blue-Davinci
                </p>
                <p class="text-sm text-white mt-2"><i>Remember young grasshopper, strong passwords are like pants—never share them and change them often!</i></p>
            </div>
        </div>
    </div>

    <div class="w-full p-8 md:w-1/2">
        <div class="mb-6 text-center">
            <img src="https://i.ibb.co/WKxXnqw/agglogo.png" alt="Groovy Logo" class="mx-auto mb-4 w-24" />
            <h1 class="text-4xl font-medium text-gray-900 dark:text-gray-100">Reset Password</h1>
            <p class="text-gray-600 dark:text-gray-300">Fill up the form to reset your password</p>
        </div>

        <form method="POST" action="?/updatepassword" class="my-7" use:enhance={enhanceForm}>
            <input type="hidden" id="name" name="token" value={token} />
            <div class="flex flex-col space-y-5">
                <label for="password" class="block">
                    <p class="pb-2 font-medium text-gray-700 dark:text-gray-300">Password</p>
                    <Input id="password" name="password" type="password" placeholder="Enter your password" bind:value={password} />
                        <ValidationMessage error={form?.error?.password} />
                </label>
                <label for="confirmpassword" class="block">
                    <p class="pb-2 font-medium text-gray-700 dark:text-gray-300">Confirm Password</p>
                    <Input id="confirmpassword" name="confirmpassword" type="password" placeholder="Confirm your password" bind:value={confirm_password} />
                        <ValidationMessage error={form?.error?.confirmpassword} />
                </label>
                <button class="inline-flex w-full items-center justify-center space-x-2 rounded-lg bg-indigo-600 py-3 font-medium text-white transition duration-300 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"/>
                    </svg>
                    <span>Reset Password</span>
                </button>
                {#if isLoading}
                    <div class="saving-container">
                        <span class="loader"></span>
                        <span class="saving">Processing..</span>
                    </div>
                {/if}

                <p class="text-center text-gray-600 dark:text-gray-400">
                    Not registered yet?
                    <a href="/signup" class="inline-flex items-center space-x-1 font-medium text-indigo-600 hover:underline dark:text-indigo-400">
                        <span>Sign Up</span>
                        <FilePen class="h-4 w-4" />
                    </a>
                    or
                    <a href="/login" class="inline-flex items-center space-x-1 font-medium text-indigo-600 hover:underline dark:text-indigo-400">
                        <span>Login</span>
                        <KeySquare class="h-4 w-4" />
                    </a>
                </p>
            </div>
        </form>
    </div>
</div>
