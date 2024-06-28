<script>
	import { Button } from '$lib/components/ui/button';
    import {Label} from '$lib/components/ui/label';
    import {Input} from '$lib/components/ui/input';
    //<UserAuthForm />
    let isLoading = false;
	async function onSubmit() {
		isLoading = true;

		setTimeout(() => {
			isLoading = false;
		}, 3000);
	}
</script>


<div
	class="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<Button
		href="/login"
		variant="ghost"
		class="absolute right-4 top-4 md:right-8 md:top-8"
	>
		Login
	</Button>
    <div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex bg-transparent z-[-1]">
        <div
            class="absolute inset-0 bg-cover"
            style="background-image: url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80);"
        ></div>
        <div class="relative flex items-center text-lg font-medium z-10">
            <!-- <Command class="mr-2 h-6 w-6" /> -->
            Acme Inc
        </div>
        <div class="relative mt-auto z-10">
            <blockquote class="space-y-2">
                <p class="text-lg">
                    &ldquo;This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before. Highly recommended!&rdquo;
                </p>
                <footer class="text-sm">Sofia Davis</footer>
            </blockquote>
        </div>
    </div>
	<div class="lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
				<p class="text-sm text-muted-foreground">
					Enter your email below to create your account
				</p>
			</div>
			<div>
                <form on:submit|preventDefault={onSubmit}>
                    <div class="grid gap-2">
                        <div class="grid gap-1">
                            <Label class="sr-only" for="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                autocapitalize="none"
                                autocomplete="email"
                                autocorrect="off"
                                disabled={isLoading}
                            />
                            <Input
                             class="password-input mt-2.5 mb-2.5"
                                id="password"
                                type="password"
                                autocapitalize="none"
                                autocomplete="current-password"
                                autocorrect="off"
                                disabled={isLoading}
                            />
                        </div>
                        <Button type="submit" disabled={isLoading}>
                            {#if isLoading}
                                <!-- <Icons.spinner class="mr-2 h-4 w-4 animate-spin" />-->
                                 <p>Loading....</p>
                            {/if}
                            Sign In with Email
                        </Button>
                    </div>
                </form>
            </div>
			<p class="px-8 text-center text-sm text-muted-foreground">
				By clicking continue, you agree to our
				<a href="/terms" class="underline underline-offset-4 hover:text-primary">
					Terms of Service
				</a>
				and
				<a href="/privacy" class="underline underline-offset-4 hover:text-primary">
					Privacy Policy
				</a>
				.
			</p>
		</div>
	</div>
</div>