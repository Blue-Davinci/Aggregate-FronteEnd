<script>
	import {
		LayoutDashboard,
		Megaphone,
		Inbox,
		ListTodo,
		Users,
		ClipboardPlus,
		UserCheck,
		TriangleAlert,
		LogOut,
		SquareGanttChart,
	Rss,
	Check,
	PackageCheck,
	} from 'lucide-svelte';
	import { toTitleCase } from '$lib/utilities/utils';

	export let data;
	//console.log(data);
	let user = {
		name:
			data.props?.username?.length > 12
				? toTitleCase(data.props.username).slice(0, 9) + '...'
				: toTitleCase(data.props.username),
		role: 'ADMIN',
		avatar: data?.props?.userimage ?? '/agglogo.png'
	};
</script>

<div
	class="flex min-h-screen flex-col bg-gray-50 text-gray-800 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200"
>
	<div class="relative flex flex-row">
		<!-- Sidebar -->
		<div
			class="flex min-h-screen w-56 flex-col overflow-y-auto border-r bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
		>
			<!-- User Area -->
			<div
				class="h-50 flex flex-col items-center justify-center border-b bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 shadow-lg dark:border-gray-700"
			>
				<div class="relative">
					<img
						class="h-20 w-20 transform rounded-full border-4 border-white shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl"
						src={user.avatar}
						alt="User Avatar"
					/>
				</div>
				<div class="mt-3 text-lg font-semibold text-white">{user.name}</div>
				<div class="mt-1 h-0.5 w-16 bg-white"></div>
				<div
					class="mb-2 mt-1 rounded-full bg-white px-2 py-0.5 text-sm font-medium uppercase tracking-wider text-indigo-600 shadow-md"
				>
					{user.role}
				</div>
			</div>

			<!-- Navigation Menu -->
			<div class="flex-grow overflow-y-auto">
				<ul class="flex flex-col space-y-1 py-4">
					<li class="px-5">
						<div class="flex h-8 flex-row items-center">
							<div class="text-sm font-light tracking-wide text-gray-500 dark:text-gray-400">
								Menu
							</div>
						</div>
					</li>
					<li>
						<a
							href="/admin"
							class="relative flex h-12 flex-row items-center border-l-4 border-transparent bg-gradient-to-r from-transparent to-transparent pr-6 text-gray-600 transition-all duration-150 ease-in-out hover:border-pink-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white focus:outline-none dark:text-gray-300 dark:hover:border-pink-300 dark:hover:bg-gradient-to-r dark:hover:from-indigo-500 dark:hover:to-purple-500 dark:hover:text-white"
						>
							<LayoutDashboard class="ml-4 h-5 w-5 transform transition-transform duration-150" />
							<span class="ml-2 truncate text-sm tracking-wide">Dashboard</span>
						</a>
					</li>
					<li>
						<a
							href="/admin/announcements"
							class="relative flex h-12 flex-row items-center border-l-4 border-transparent bg-gradient-to-r from-transparent to-transparent pr-6 text-gray-600 transition-all duration-150 ease-in-out hover:border-pink-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white focus:outline-none dark:text-gray-300 dark:hover:border-pink-300 dark:hover:bg-gradient-to-r dark:hover:from-indigo-500 dark:hover:to-purple-500 dark:hover:text-white"
						>
							<Megaphone class="ml-4 h-5 w-5 transform transition-transform duration-150" />
							<span class="ml-2 truncate text-sm tracking-wide">Announcements</span>
						</a>
					</li>
					<li class="px-5">
						<div class="flex h-8 flex-row items-center">
							<div class="text-sm font-light tracking-wide text-gray-500 dark:text-gray-400">
								Users
							</div>
						</div>
					</li>
					<li>
						<a
							href="/admin/users"
							class="relative flex h-12 flex-row items-center border-l-4 border-transparent bg-gradient-to-r from-transparent to-transparent pr-6 text-gray-600 transition-all duration-150 ease-in-out hover:border-pink-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white focus:outline-none dark:text-gray-300 dark:hover:border-pink-300 dark:hover:bg-gradient-to-r dark:hover:from-indigo-500 dark:hover:to-purple-500 dark:hover:text-white"
						>
							<Inbox class="ml-4 h-5 w-5 transform transition-transform duration-150" />
							<span class="ml-2 truncate text-sm tracking-wide">View Users</span>
							<span
								class="ml-auto rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium tracking-wide text-indigo-500 dark:bg-indigo-700 dark:text-indigo-200"
								>New</span
							>
						</a>
					</li>
					<li>
						<a
							href="/admin/permissions"
							class="relative flex h-12 flex-row items-center border-l-4 border-transparent bg-gradient-to-r from-transparent to-transparent pr-6 text-gray-600 transition-all duration-150 ease-in-out hover:border-pink-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white focus:outline-none dark:text-gray-300 dark:hover:border-pink-300 dark:hover:bg-gradient-to-r dark:hover:from-indigo-500 dark:hover:to-purple-500 dark:hover:text-white"
						>
							<SquareGanttChart class="ml-4 h-5 w-5 transform transition-transform duration-150" />
							<span class="ml-2 truncate text-sm tracking-wide">Manage Permissions</span>
						</a>
					</li>
					<li class="px-5">
						<div class="flex h-8 flex-row items-center">
							<div class="text-sm font-light tracking-wide text-gray-500 dark:text-gray-400">
								Feeds
							</div>
						</div>
					</li>
					<li></li>
					<li> 
						<a
							href="/admin/feeds/approvals"
							class="relative flex h-12 flex-row items-center border-l-4 border-transparent bg-gradient-to-r from-transparent to-transparent pr-6 text-gray-600 transition-all duration-150 ease-in-out hover:border-pink-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white focus:outline-none dark:text-gray-300 dark:hover:border-pink-300 dark:hover:bg-gradient-to-r dark:hover:from-indigo-500 dark:hover:to-purple-500 dark:hover:text-white"
						>
							<PackageCheck class="ml-4 h-5 w-5 transform transition-transform duration-150" />
							<span class="ml-2 truncate text-sm tracking-wide">Approvals</span>
							<span
								class="ml-auto rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium tracking-wide text-indigo-500 dark:bg-indigo-700 dark:text-indigo-200"
								>New</span
							>
						</a>
					</li>
					<li>
						<a
							href="/admin/feeds"
							class="relative flex h-12 flex-row items-center border-l-4 border-transparent bg-gradient-to-r from-transparent to-transparent pr-6 text-gray-600 transition-all duration-150 ease-in-out hover:border-pink-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white focus:outline-none dark:text-gray-300 dark:hover:border-pink-300 dark:hover:bg-gradient-to-r dark:hover:from-indigo-500 dark:hover:to-purple-500 dark:hover:text-white"
						>
							<Rss class="ml-4 h-5 w-5 transform transition-transform duration-150" />
							<span class="ml-2 truncate text-sm tracking-wide">Manage Feeds</span>
							<span
								class="ml-auto rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium tracking-wide text-indigo-500 dark:bg-indigo-700 dark:text-indigo-200"
								>New</span
							>
						</a>
					</li>

					<li class="px-5">
						<div class="flex h-8 flex-row items-center">
							<div class="text-sm font-light tracking-wide text-gray-500 dark:text-gray-400">
								Subscriptions
							</div>
						</div>
					</li>
					<li>
						<a
							href="/admin/plans"
							class="relative flex h-12 flex-row items-center border-l-4 border-transparent bg-gradient-to-r from-transparent to-transparent pr-6 text-gray-600 transition-all duration-150 ease-in-out hover:border-pink-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white focus:outline-none dark:text-gray-300 dark:hover:border-pink-300 dark:hover:bg-gradient-to-r dark:hover:from-indigo-500 dark:hover:to-purple-500 dark:hover:text-white"
						>
							<ListTodo class="ml-4 h-5 w-5 transform transition-transform duration-150" />
							<span class="ml-2 truncate text-sm tracking-wide">Manage Plans</span>
						</a>
					</li>
					<li>
						<a
							href="/admin/subscriptions"
							class="relative flex h-12 flex-row items-center border-l-4 border-transparent bg-gradient-to-r from-transparent to-transparent pr-6 text-gray-600 transition-all duration-150 ease-in-out hover:border-pink-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white focus:outline-none dark:text-gray-300 dark:hover:border-pink-300 dark:hover:bg-gradient-to-r dark:hover:from-indigo-500 dark:hover:to-purple-500 dark:hover:text-white"
						>
							<Users class="ml-4 h-5 w-5 transform transition-transform duration-150" />
							<span class="ml-2 truncate text-sm tracking-wide">Manage Subscribers</span>
						</a>
					</li>
					<li>
						<a
							href="/admin/subscriptions/reports"
							class="relative flex h-12 flex-row items-center border-l-4 border-transparent bg-gradient-to-r from-transparent to-transparent pr-6 text-gray-600 transition-all duration-150 ease-in-out hover:border-pink-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white focus:outline-none dark:text-gray-300 dark:hover:border-pink-300 dark:hover:bg-gradient-to-r dark:hover:from-indigo-500 dark:hover:to-purple-500 dark:hover:text-white"
						>
							<ClipboardPlus class="ml-4 h-5 w-5 transform transition-transform duration-150" />
							<span class="ml-2 truncate text-sm tracking-wide">Subscription Reports</span>
						</a>
					</li>

					<li class="px-5">
						<div class="flex h-8 flex-row items-center">
							<div class="text-sm font-light tracking-wide text-gray-500 dark:text-gray-400">
								Errors
							</div>
						</div>
					</li>
					<li>
						<a
							href="/admin/errors"
							class="relative flex h-12 flex-row items-center border-l-4 border-transparent bg-gradient-to-r from-transparent to-transparent pr-6 text-gray-600 transition-all duration-150 ease-in-out hover:border-pink-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white focus:outline-none dark:text-gray-300 dark:hover:border-pink-300 dark:hover:bg-gradient-to-r dark:hover:from-indigo-500 dark:hover:to-purple-500 dark:hover:text-white"
						>
							<TriangleAlert class="ml-4 h-5 w-5 transform transition-transform duration-150" />
							<span class="ml-2 truncate text-sm tracking-wide">Scraper Errors</span>
						</a>
					</li>

					<li class="px-5">
						<div class="flex h-8 flex-row items-center">
							<div class="text-sm font-light tracking-wide text-gray-500 dark:text-gray-400">
								Settings
							</div>
						</div>
					</li>
					<li>
						<a
							href="#a"
							class="relative flex h-12 flex-row items-center border-l-4 border-transparent bg-gradient-to-r from-transparent to-transparent pr-6 text-gray-600 transition-all duration-150 ease-in-out hover:border-pink-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white focus:outline-none dark:text-gray-300 dark:hover:border-pink-300 dark:hover:bg-gradient-to-r dark:hover:from-indigo-500 dark:hover:to-purple-500 dark:hover:text-white"
						>
							<UserCheck class="ml-4 h-5 w-5 transform transition-transform duration-150" />
							<span class="ml-2 truncate text-sm tracking-wide">Profile</span>
						</a>
					</li>
					<li>
						<a
							href="#a"
							class="relative flex h-12 flex-row items-center border-l-4 border-transparent bg-gradient-to-r from-transparent to-transparent pr-6 text-gray-600 transition-all duration-150 ease-in-out hover:border-pink-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white focus:outline-none dark:text-gray-300 dark:hover:border-pink-300 dark:hover:bg-gradient-to-r dark:hover:from-indigo-500 dark:hover:to-purple-500 dark:hover:text-white"
						>
							<LogOut class="ml-4 h-5 w-5 transform transition-transform duration-150" />
							<span class="ml-2 truncate text-sm tracking-wide">Sign Out</span>
						</a>
					</li>
				</ul>
			</div>
		</div>

		<!-- Content Area -->
		<div class="flex-1 p-6">
			<slot />
		</div>
	</div>
</div>
