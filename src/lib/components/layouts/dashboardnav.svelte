<script>
	import { onMount, onDestroy } from 'svelte';
	import { fly, slide } from 'svelte/transition';
	import { BellDot, BookHeart, LayoutDashboard, Codesandbox, Rss, House} from 'lucide-svelte';
	export let notifications;
	//console.log("Notifications:", notifications);

	let isProfileMenuOpen = false;
	let isNotificationMenuOpen = false;
	let buttonElement;
	let dropdownElement;
	let notificationButtonElement;
	let notificationDropdownElement;

	function toggleMenu() {
		isProfileMenuOpen = !isProfileMenuOpen;
	}

	function toggleNotificationMenu() {
		isNotificationMenuOpen = !isNotificationMenuOpen;
	}

	function handleClickOutside(event) {
		if (
			dropdownElement &&
			buttonElement &&
			!dropdownElement.contains(event.target) &&
			!buttonElement.contains(event.target)
		) {
			isProfileMenuOpen = false;
		}
		if (
			notificationDropdownElement &&
			notificationButtonElement &&
			!notificationDropdownElement.contains(event.target) &&
			!notificationButtonElement.contains(event.target)
		) {
			isNotificationMenuOpen = false;
		}
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('click', handleClickOutside);
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('click', handleClickOutside);
		}
	});
</script>

<nav 
in:fly={{ x: -200, duration: 1000 }} out:slide
class="bg-gray-800">
	<div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
		<div class="relative flex h-16 items-center justify-between">
			<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
				<!-- Mobile menu button-->
				<button
					type="button"
					class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
					aria-controls="mobile-menu"
					aria-expanded="false"
				>
					<span class="absolute -inset-0.5"></span>
					<span class="sr-only">Open main menu</span>
					<!-- Icon when menu is closed. -->
					<svg
						class="block h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
					<!-- Icon when menu is open. -->
					<svg
						class="hidden h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			<div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
				<div class="flex flex-shrink-0 items-center">
					<Codesandbox class="h-8 w-8 text-white" />
				</div>
				<div class="hidden sm:ml-6 sm:block">
					<div class="flex space-x-4">
						<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
						<a
							href="/dashboard"
							class="flex items-center space-x-2 rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
							aria-current="page"><LayoutDashboard class="mr-2 h-5 w-5" />Dashboard</a
						>
						<a
							href="/"
							class="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
							><House class="mr-2 h-5 w-5" />Home</a
						>
						<a
							href="/dashboard/favorites"
							data-sveltekit-preload-data
							class="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
							><BookHeart class="mr-2 h-5 w-5" />My Favorites</a
						>
						<a
							href="/dashboard/follows"
							class="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
							><Rss class="mr-2 h-5 w-5" />My Follows</a
						>
					</div>
				</div>
			</div>
			<div
				class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
			>
				<div class="relative" bind:this={notificationDropdownElement}>
					<button
						type="button"
						class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
						on:click={toggleNotificationMenu}
						bind:this={notificationButtonElement}
					>
						<span class="absolute -inset-1.5"></span>
						<span class="sr-only">View notifications</span>
						<svg
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
							/>
						</svg>
						<!-- Notification badge -->
						{#if Object.keys(notifications).length !== 0}
							<span
								class="absolute right-0 top-0 inline-flex h-4 w-4 -translate-y-1/3 translate-x-1/3 transform items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white"
								>{Object.keys(notifications).length}</span
							>
						{/if}
					</button>
					{#if isNotificationMenuOpen}
						<div
							class="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="notification-button"
							tabindex="-1"
						>
							{#if notifications.length === 0}
								<span
									class="block px-4 py-2 text-xs text-black-500 hover:bg-gray-200 hover:text-gray-900 dark:text-black dark:hover:bg-gray-600 dark:hover:text-gray-100"
								>
									No new messages
								</span>
							{:else}
								{#each notifications as { feed_name, post_count }, index}
									<span
										class="dark:black block flex items-center px-5 py-3 text-sm text-black transition-colors duration-200 ease-in-out hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100 {index !==
										notifications.length - 1
											? 'border-b'
											: ''} border-gray-300 dark:border-gray-300"
									>
									<BellDot class="h-5 w-5 mr-3 text-red-500 dark:text-red-400"/>
										<span class="flex-1">
											<span class="font-semibold">{feed_name}</span> has added
											<span class="font-semibold">{post_count}</span> post(s)
										</span>
									</span>
								{/each}
							{/if}
						</div>
					{/if}
				</div>

				<!-- Profile dropdown -->
				<div class="relative ml-3" bind:this={dropdownElement}>
					<div>
						<button
							type="button"
							class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
							id="user-menu-button"
							aria-expanded="false"
							aria-haspopup="true"
							on:click={toggleMenu}
							bind:this={buttonElement}
						>
							<span class="absolute -inset-1.5"></span>
							<span class="sr-only">Open user menu</span>
							<img
								class="h-8 w-8 rounded-full"
								src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
								alt=""
							/>
						</button>
					</div>
					{#if isProfileMenuOpen}
						<div
							class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="user-menu-button"
							tabindex="-1"
						>
							<a
								href="/account"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900"
								role="menuitem"
								tabindex="-1"
								id="user-menu-item-0">Your Profile</a
							>
							<a
								href="#a"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900"
								tabindex="-1"
								id="user-menu-item-1">Settings</a
							>
							<a
								href="/logout"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900"
								role="menuitem"
								tabindex="-1"
								id="user-menu-item-2">Log out</a
							>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
	<div class="sm:hidden" id="mobile-menu">
		<div class="space-y-1 px-2 pb-3 pt-2">
			<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
			<a
				href="/dashboard"
				class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
				aria-current="page">Dashboard</a
			>
			<a
				href="/"
				class="block flex items-center space-x-2 rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
				>Home</a
			>
			<a
				href="/dashboard/favorites"
				class="block flex items-center space-x-2 rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
			>
				My Favorites</a
			>
			<a
				href="/dashboard/follows"
				class="block flex items-center space-x-2 rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
				>My Follows</a
			>
		</div>
	</div>
</nav>
