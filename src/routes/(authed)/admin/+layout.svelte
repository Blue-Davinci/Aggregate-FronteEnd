<script>
  import { LayoutDashboard, Inbox, Mails, Bell, ListTodo, Users, ClipboardPlus, UserCheck, LogIn, LogOut, SquareGanttChart } from 'lucide-svelte';
  import { toTitleCase } from '$lib/utilities/utils';

  export let data;
  let user = {
    name: data.props?.username?.length > 12 ? toTitleCase(data.props.username).slice(0, 9) + '...' : toTitleCase(data.props.username),
    role: "ADMIN",
    avatar: data?.props?.userimage ?? "/agglogo.png"
  };
</script>

<div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
  <div class="relative flex flex-row">
    <!-- Sidebar -->
    <div class="w-56 bg-white dark:bg-gray-800 min-h-screen border-r dark:border-gray-700 shadow-lg flex flex-col overflow-y-auto">
      <!-- User Area -->
      <div class="flex flex-col items-center justify-center h-50 border-b dark:border-gray-700 p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
        <div class="relative">
          <img class="w-20 h-20 rounded-full border-4 border-white shadow-lg transform transition-transform duration-200 hover:scale-110 hover:shadow-xl" src={user.avatar} alt="User Avatar" />
        </div>
        <div class="mt-3 text-lg font-semibold text-white">{user.name}</div>
        <div class="mt-1 w-16 h-0.5 bg-white"></div>
        <div class="mt-1 mb-2 px-2 py-0.5 bg-white text-sm font-medium text-indigo-600 rounded-full shadow-md uppercase tracking-wider">{user.role}</div>
      </div>

      <!-- Navigation Menu -->
      <div class="flex-grow">
        <ul class="flex flex-col py-4 space-y-1">
          <li class="px-5">
            <div class="flex flex-row items-center h-8">
              <div class="text-sm font-light tracking-wide text-gray-500 dark:text-gray-400">Menu</div>
            </div>
          </li>
          <li>
            <a href="/admin" class="relative flex flex-row items-center h-12 focus:outline-none bg-gradient-to-r from-transparent to-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 dark:hover:bg-gradient-to-r dark:hover:from-indigo-500 dark:hover:to-purple-500 text-gray-600 dark:text-gray-300 hover:text-white dark:hover:text-white border-l-4 border-transparent hover:border-pink-500 dark:hover:border-pink-300 pr-6 transition-all duration-150 ease-in-out">
              <LayoutDashboard class="w-5 h-5 ml-4 transform transition-transform duration-150" />
              <span class="ml-2 text-sm tracking-wide truncate">Dashboard</span>
            </a>
          </li>
          <li class="px-5">
            <div class="flex flex-row items-center h-8">
              <div class="text-sm font-light tracking-wide text-gray-500 dark:text-gray-400">Users</div>
            </div>
          </li>
          <li>
            <a href="/admin/users" class="relative flex flex-row items-center h-12 focus:outline-none bg-gradient-to-r from-transparent to-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 dark:hover:bg-gradient-to-r dark:hover:from-indigo-500 dark:hover:to-purple-500 text-gray-600 dark:text-gray-300 hover:text-white dark:hover:text-white border-l-4 border-transparent hover:border-pink-500 dark:hover:border-pink-300 pr-6 transition-all duration-150 ease-in-out">
              <Inbox class="w-5 h-5 ml-4 transform transition-transform duration-150" />
              <span class="ml-2 text-sm tracking-wide truncate">View Users</span>
              <span class="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 dark:bg-indigo-700 dark:text-indigo-200 rounded-full">New</span>
            </a>
          </li>
          <li>
            <a href="/admin/permissions" class="relative flex flex-row items-center h-12 focus:outline-none bg-gradient-to-r from-transparent to-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 dark:hover:bg-gradient-to-r dark:hover:from-indigo-500 dark:hover:to-purple-500 text-gray-600 dark:text-gray-300 hover:text-white dark:hover:text-white border-l-4 border-transparent hover:border-pink-500 dark:hover:border-pink-300 pr-6 transition-all duration-150 ease-in-out">
              <SquareGanttChart class="w-5 h-5 ml-4 transform transition-transform duration-150" />
              <span class="ml-2 text-sm tracking-wide truncate">Manage Permissions</span>
            </a>
          </li>
          <li class="px-5">
            <div class="flex flex-row items-center h-8">
              <div class="text-sm font-light tracking-wide text-gray-500 dark:text-gray-400">Subscriptions</div>
            </div>
          </li>
          <li>
            <a href="/admin/plans" class="relative flex flex-row items-center h-12 focus:outline-none bg-gradient-to-r from-transparent to-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 dark:hover:bg-gradient-to-r dark:hover:from-indigo-500 dark:hover:to-purple-500 text-gray-600 dark:text-gray-300 hover:text-white dark:hover:text-white border-l-4 border-transparent hover:border-pink-500 dark:hover:border-pink-300 pr-6 transition-all duration-150 ease-in-out">
              <ListTodo class="w-5 h-5 ml-4 transform transition-transform duration-150" />
              <span class="ml-2 text-sm tracking-wide truncate">Manage Plans</span>
            </a>
          </li>
          <li>
            <a href="/admin/subscriptions" class="relative flex flex-row items-center h-12 focus:outline-none bg-gradient-to-r from-transparent to-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 dark:hover:bg-gradient-to-r dark:hover:from-indigo-500 dark:hover:to-purple-500 text-gray-600 dark:text-gray-300 hover:text-white dark:hover:text-white border-l-4 border-transparent hover:border-pink-500 dark:hover:border-pink-300 pr-6 transition-all duration-150 ease-in-out">
              <Users class="w-5 h-5 ml-4 transform transition-transform duration-150" />
              <span class="ml-2 text-sm tracking-wide truncate">Manage Subscribers</span>
            </a>
          </li>
          <li>
            <a href="/admin/subscriptions/reports" class="relative flex flex-row items-center h-12 focus:outline-none bg-gradient-to-r from-transparent to-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 dark:hover:bg-gradient-to-r dark:hover:from-indigo-500 dark:hover:to-purple-500 text-gray-600 dark:text-gray-300 hover:text-white dark:hover:text-white border-l-4 border-transparent hover:border-pink-500 dark:hover:border-pink-300 pr-6 transition-all duration-150 ease-in-out">
              <ClipboardPlus class="w-5 h-5 ml-4 transform transition-transform duration-150" />
              <span class="ml-2 text-sm tracking-wide truncate">Subscription Reports</span>
            </a>
          </li>
          <li class="px-5">
            <div class="flex flex-row items-center h-8">
              <div class="text-sm font-light tracking-wide text-gray-500 dark:text-gray-400">Settings</div>
            </div>
          </li>
          <li>
            <a href="#a" class="relative flex flex-row items-center h-12 focus:outline-none bg-gradient-to-r from-transparent to-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 dark:hover:bg-gradient-to-r dark:hover:from-indigo-500 dark:hover:to-purple-500 text-gray-600 dark:text-gray-300 hover:text-white dark:hover:text-white border-l-4 border-transparent hover:border-pink-500 dark:hover:border-pink-300 pr-6 transition-all duration-150 ease-in-out">
              <UserCheck class="w-5 h-5 ml-4 transform transition-transform duration-150" />
              <span class="ml-2 text-sm tracking-wide truncate">Profile</span>
            </a>
          </li>
          <li>
            <a href="#a" class="relative flex flex-row items-center h-12 focus:outline-none bg-gradient-to-r from-transparent to-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 dark:hover:bg-gradient-to-r dark:hover:from-indigo-500 dark:hover:to-purple-500 text-gray-600 dark:text-gray-300 hover:text-white dark:hover:text-white border-l-4 border-transparent hover:border-pink-500 dark:hover:border-pink-300 pr-6 transition-all duration-150 ease-in-out">
              <LogOut class="w-5 h-5 ml-4 transform transition-transform duration-150" />
              <span class="ml-2 text-sm tracking-wide truncate">Sign Out</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Content Area -->
    <div class="flex-1 p-6">
      <!-- This slot will display the content of the pages -->
      <slot />
    </div>
  </div>
</div>
