<script>
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { enhance } from '$app/forms';
	import { setToast } from '$lib/utilities/utils';
	import ValidationMessage from '$lib/components/layouts/auth/authvalidation_message.svelte';
	import { toTitleCase } from '$lib/utilities/utils';
	// error
	export let form;
	//<UserAuthForm />
	let isLoading = false;
	//binding for the form data
	let email = '';
	let password = '';
	$: username = toTitleCase(email.split('@')[0]);
	function wait() {
		setTimeout(() => {
			isLoading = false;
		}, 3000);
	}
	// we make a reactive function that will check for a rejection specific
	// error message and display it. Since we know an invalid credential error
	// will be a string, we will just check if our form.error is a string, if it is
	// we output the message as a fail toast
	function invalidLogin() {
		if (form.error && typeof form.error === 'string') {
			console.log('wrong password');
			setToast(false, form.error, 3000);
		}
	}
	$: if (form) invalidLogin();

	function enhanceForm() {
		isLoading = true;
		return async ({ result, update }) => {
			console.log(result);

			try {
				if (result.type === 'redirect') {
					const urlParams = new URLSearchParams(window.location.search);
					const redirectTo = urlParams.get('redirectTo') ?? '/dashboard';
					setToast(true, `Succesfully Logged In. Welcome, ${username}`, 3000);
					await update();
					await goto(result.location);
				}
				// Check if result.message contains "Cross-site"
				if (result.message && result.message.includes('Cross-site')) {
					setToast(false, 'We could not proceed with your login.', 3000);
				}
				await update();
			} catch (err) {
				console.log(err);
				// Handle error
			} finally {
				password = '';
				isLoading = false;
			}
		};
	}
</script>

<div
	class="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<Button href="/signup" variant="ghost" class="absolute right-4 top-4 md:right-8 md:top-8">
		Don't have an account? Signup
	</Button>
	<div
		class="relative z-[-1] hidden h-full flex-col bg-muted bg-transparent p-10 text-white dark:border-r lg:flex"
	>
		<div
			class="absolute inset-0 bg-cover"
			style="background-image: url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80);"
		></div>
		<div class="relative z-10 flex items-center text-lg font-medium">
			<!-- <Command class="mr-2 h-6 w-6" /> -->
			Acme Inc
		</div>
		<div class="relative z-10 mt-auto">
			<blockquote class="space-y-2">
				<p class="text-lg">
					&ldquo;Thanks to Aggregate, I can now effortlessly follow all my favorite feeds from
					various sources.Kudos to the team behind Aggregate, Highly recommended!&rdquo;
				</p>
				<footer class="text-sm">Sofia Davis</footer>
			</blockquote>
		</div>
	</div>
	<div class="lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">Login To Your account</h1>
				<p class="text-sm text-muted-foreground">
					Enter your email and Password below to login to your account
				</p>
			</div>
			<div>
				<form method="POST" action="?/login" use:enhance={enhanceForm}>
					<div class="grid gap-2">
						<div class="grid gap-1">
							<Label class="sr-only" for="email">Email</Label>
							<Input
								id="email"
								class="border p-2 {form?.error?.email ? 'border-red-500' : ''}"
								name="email"
								placeholder="name@example.com"
								type="email"
								autocapitalize="none"
								autocomplete="email"
								autocorrect="off"
								disabled={isLoading}
								bind:value={email}
							/>
							<ValidationMessage error={form?.error?.email} />
							<Input
								class="password-input mb-2.5 mt-2.5 {form?.error?.password ? 'border-red-500' : ''}"
								name="password"
								id="password"
								type="password"
								autocapitalize="none"
								autocomplete="current-password"
								autocorrect="off"
								disabled={isLoading}
								bind:value={password}
							/>
							<ValidationMessage error={form?.error?.password} />
						</div>
						<Button type="submit" disabled={isLoading}>Log In</Button>
						{#if isLoading}
							<div class="saving-container">
								<span class="loader"></span>
								<span class="saving">Processing..</span>
							</div>
						{/if}
					</div>
				</form>
				<p class="mt-4 text-center text-sm">
					<a href="/reset" class="text-indigo-600 hover:underline dark:text-indigo-400"
						>Forgot password?</a
					>
				</p>
			</div>
			<p class="px-8 text-center text-sm text-muted-foreground">
				By clicking continue, you agree to our
				<a href="/sitedocs/terms" class="underline underline-offset-4 hover:text-primary">
					Terms of Service
				</a>
				and
				<a href="/sitedocs/privacy" class="underline underline-offset-4 hover:text-primary">
					Privacy Policy
				</a>
				.
			</p>
		</div>
	</div>
</div>
