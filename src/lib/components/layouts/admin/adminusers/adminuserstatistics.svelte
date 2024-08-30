<script>
    import { fly, fade } from 'svelte/transition';
    import { User, Shield, CheckCircle, XCircle, AtSign, Star } from 'lucide-svelte';
    import { Separator } from '$lib/components/ui/separator';

    export let users = [];

    $:totalUsers = users.length;
    $:totalAdmins = users.filter(user => user.permissions.some(p => p.includes("admin"))).length;
    $:totalModerators = users.filter(user => user.permissions.some(p => p.includes("moderator"))).length;
    $:totalActivatedUsers = users.filter(user => user.activated).length;
    $:totalNonActivatedUsers = users.filter(user => !user.activated).length;
    $:emailDomains = users.map(user => user.email.split('@')[1]);
    $:mostUsedDomain = emailDomains.sort((a, b) =>
        emailDomains.filter(v => v === a).length
        - emailDomains.filter(v => v === b).length
    ).pop();
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
     in:fly={{ x: -200, duration: 1000 }} 
     out:fade={{ duration: 300 }}>

    <!-- Super Users Label -->
    <div class="col-span-5">
        <p class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Super Users</p>
    </div>

    <!-- Superusers Section -->
    <div class="p-4 bg-blue-500 dark:bg-blue-600 text-white rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl">
        <div class="flex items-center justify-between">
            <p class="text-3xl font-extrabold font-mono truncate">{totalAdmins}</p>
            <Shield class="w-10 h-10" />
        </div>
        <h3 class="text-sm font-medium mt-2 text-right font-sans">Total Admins</h3>
    </div>
    
    <div class="p-4 bg-purple-500 dark:bg-purple-600 text-white rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl">
        <div class="flex items-center justify-between">
            <p class="text-3xl font-extrabold font-mono truncate">{totalModerators}</p>
            <Star class="w-10 h-10" />
        </div>
        <h3 class="text-sm font-medium mt-2 text-right font-sans">Total Moderators</h3>
    </div>
</div>

<Separator class="mb-3"/>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8" 
     in:fly={{ x: -200, duration: 1000 }} 
     out:fade={{ duration: 300 }}>

    <!-- User Stats Label -->
    <div class="col-span-5">
        <p class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">User Stats</p>
    </div>

    <!-- Rest of the Data Section -->
    <div class="p-4 bg-green-500 dark:bg-green-600 text-white rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl h-32">
        <div class="flex items-center justify-between">
            <p class="text-3xl font-extrabold font-mono truncate">{totalUsers - totalAdmins}</p>
            <User class="w-10 h-10" />
        </div>
        <h3 class="text-sm font-medium mt-2 text-right font-sans">Total Regular Users</h3>
    </div>
    
    <div class="p-4 bg-teal-500 dark:bg-teal-600 text-white rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl h-32">
        <div class="flex items-center justify-between">
            <p class="text-3xl font-extrabold font-mono truncate">{totalActivatedUsers}</p>
            <CheckCircle class="w-10 h-10" />
        </div>
        <h3 class="text-sm font-medium mt-2 text-right font-sans">Activated Users</h3>
    </div>
    
    <div class="p-4 bg-red-500 dark:bg-red-600 text-white rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl h-32">
        <div class="flex items-center justify-between">
            <p class="text-3xl font-extrabold font-mono truncate">{totalNonActivatedUsers}</p>
            <XCircle class="w-10 h-10" />
        </div>
        <h3 class="text-sm font-medium mt-2 text-right font-sans">Non-Activated Users</h3>
    </div>
    
    <div class="p-4 bg-indigo-500 dark:bg-indigo-600 text-white rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl h-32 mb-4">
        <div class="flex items-center justify-between">
            <p class="text-sm font-extrabold font-mono truncate">{mostUsedDomain}</p>
            <AtSign class="w-10 h-10" />
        </div>
        <h3 class="text-sm font-medium mt-2 text-right font-sans">Most Used Email Domain</h3>
    </div>
</div>
