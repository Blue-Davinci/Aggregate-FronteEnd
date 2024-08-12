<script>
    import { page } from '$app/stores';
    import { fly, slide } from 'svelte/transition';
	import { setToast } from '$lib/utilities/utils';
	import { Mail, CheckCircle, ArrowRight } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import ValidationMessage from '$lib/components/layouts/auth/authvalidation_message.svelte';
	export let form;

	let email = $page.url.searchParams.get('email') ?? '';
	let isSaving = false;
	let countdown = 0;
	let interval;

	function startCountdown(seconds) {
		countdown = seconds;
		interval = setInterval(() => {
			countdown -= 1;
			if (countdown <= 0) {
				clearInterval(interval);
			}
		}, 1000);
	}

	function enhanceForm() {
		isSaving = true;
		return async ({ result, update }) => {
			try {
				if (result.data.flag === 'success') {
					setToast(true, 'An activation link has been sent to your email.');
                    startCountdown(60); // Start 60-second countdown
					await update();
				} else {
					setToast(false, 'There was an error sending the email. Please try again.');
					await update();
				}
				await update();
			} catch (err) {
				console.log(err);
			} finally {
				isSaving = false;
			}
		};
	}
</script>

<div class="flex min-h-screen items-start justify-center bg-gray-100 pt-10 dark:bg-gray-900">
	<div
		class="hover:scale-102 w-full max-w-lg transform rounded-lg bg-white p-8 shadow-lg transition-transform duration-300 dark:bg-gray-800 md:p-12"
        in:fly={{ x: -200, duration: 1000 }} out:slide={{ duration: 600 }}
	>
		<div class="mb-4 flex flex-col items-center">
			<CheckCircle class="mb-4 h-16 w-16 animate-pulse text-green-500" />
			<h1 class="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
				Thank You for Registering!
			</h1>
			<p class="mb-6 text-center text-gray-600 dark:text-gray-300">
				We're excited to have you on board. If you haven't received an activation email, you can
				request a new one below.
			</p>
		</div>
		<form method="post" action="?/resend_activation" use:enhance={enhanceForm}>
			<input
				type="email"
				class="mb-4 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700"
				placeholder="Enter your email address"
				bind:value={email}
				name="email"
				required
			/>
			<ValidationMessage error={form?.error?.formErrors[0]} />
			<button
				type="submit"
				class="flex w-full items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white transition-all duration-300 ease-in-out hover:bg-blue-600"
				disabled={isSaving || countdown > 0}
			>
				{#if isSaving}
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
						>
						</path>
					</svg>
					Sending...
				{:else if countdown > 0}
					Wait {countdown}s
				{:else}
					<Mail class="mr-2 h-5 w-5" />
					Resend Activation Email
				{/if}
			</button>
		</form>
		<div class="mt-4">
			<a
				href="/login"
				class="flex w-full items-center justify-center rounded-md border border-blue-500 px-4 py-2 text-center text-blue-500 transition-all duration-300 ease-in-out hover:bg-blue-500 hover:text-white"
			>
				<ArrowRight class="mr-2 h-5 w-5" />
				Proceed to Login
			</a>
		</div>
	</div>
</div>
