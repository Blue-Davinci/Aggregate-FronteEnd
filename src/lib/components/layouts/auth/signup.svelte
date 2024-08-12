<script>
	import {goto} from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { enhance } from '$app/forms';
    import {setToast} from '$lib/utilities/utils'
	import ValidationMessage from '$lib/components/layouts/auth/authvalidation_message.svelte';
	import {toTitleCase} from '$lib/utilities/utils'
	// error
	export let form;
	//<UserAuthForm />
	let isLoading = false;
	//binding for the form data
	let email = '';
	let password = '';
    let confirmpassword = '';
	let name = '';
	function wait() {
		setTimeout(() => {
			isLoading = false;
		}, 3000);
	}
    
	function enhanceForm() {
		isLoading = true;
		return async ({ result, update }) => {
			try {
				console.log(result);
				if (result.type === 'redirect') {
					//const redirectTo ='/signup/resend-activation?email='+email;
					setToast(true, `Signup was Successful. Welcome ${name}, please check your email for further instructions.`, 3000);
					await update();
					//await goto(result.location);
				}else{
					setToast(false, result.data.description);
					await update();
				}
				await update();
			} catch (err) {
				console.log(err);
				// Handle error
			} finally {
				password = '';
                confirmpassword='';
				isLoading = false;
			}
		};
	}
</script>

<div
	class="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<Button href="/login" variant="ghost" class="absolute right-4 top-4 md:right-8 md:top-8">
		Have an account? Login
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
					&ldquo;Aggregate has transformed the way I manage my online activities, bringing everything I need into one place. 
					A game-changer for productivity!&rdquo;
				</p>
				<footer class="text-sm">Savo Mabash</footer>
			</blockquote>
		</div>
	</div>
	<div class="lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
				<p class="text-sm text-muted-foreground">
					Enter your name, email and Password below to sign-up and get an account
                    on <strong>Aggregate!</strong>
				</p>
			</div>
			<div>
				<form method="POST" action="?/signup" use:enhance={enhanceForm}>
					<div class="grid gap-2">
						<div class="grid gap-1">
                            <Label class="" for="name">Username</Label>
							<Input
								id="name"
								class="mb-2.5 mt-2.5 border p-2 {form?.error?.email ? 'border-red-500' : ''}"
								name="name"
								placeholder="JohnDoe"
								type="text"
								autocapitalize="none"
								autocomplete="name"
								autocorrect="off"
								disabled={isLoading}
                                bind:value={name}
							/>
							<ValidationMessage error={form?.error?.email} />
							<Label class="mt-2" for="email">Email</Label>
							<Input
								id="email"
								class="mb-2.5 mt-2.5 border p-2 {form?.error?.email ? 'border-red-500' : ''}"
								type="email"
                                name="email"
								placeholder="name@example.com"
								autocapitalize="none"
								autocomplete="email"
								autocorrect="off"
								disabled={isLoading}
								bind:value={email}
							/>
							<ValidationMessage error={form?.error?.email} />
                            <Label class="" for="password">Password</Label>
							<Input
								class="password-input mb-2.5 mt-2.5 {form?.error?.password ? 'border-red-500' : ''}"
								name="password"
								id="password"
								type="password"
								autocapitalize="none"
								autocomplete="current-password"
								autocorrect="off"
                                placeholder="Password"
								disabled={isLoading}
								bind:value={password}
							/>
							<ValidationMessage error={form?.error?.password} />
                            <Label class="" for="password">Confirm Password</Label>
							<Input
								class="password-input mb-2.5 mt-2.5 {form?.error?.password ? 'border-red-500' : ''}"
								name="confirmpassword"
								id="confirmpassword"
								type="password"
								autocapitalize="none"
								autocomplete="current-password"
								autocorrect="off"
                                placeholder="Confirm Password"
								disabled={isLoading}
								bind:value={confirmpassword}
							/>
							<ValidationMessage error={form?.error?.password} />
						</div>
						<Button type="submit" disabled={isLoading}>Sign Up</Button>
						{#if isLoading}
							<div class="saving-container">
								<span class="loader"></span>
								<span class="saving">Signing You Up..</span>
							</div>
						{/if}
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
