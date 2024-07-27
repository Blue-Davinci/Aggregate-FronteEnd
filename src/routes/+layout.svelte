<script>
	import '../app.css';
	import { MetaTags } from 'svelte-meta-tags';
  
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { onMount } from 'svelte';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import { ModeWatcher } from 'mode-watcher';
	import { toggleMode } from 'mode-watcher';
	import { fly, slide } from 'svelte/transition';
	import { SvelteToast, toast } from '@zerodevx/svelte-toast';
	import { toTitleCase } from '$lib/utilities/utils';
  
	export let data;
	//console.log("Data: ", data);
	$: isAuthenticated = data.props.user;
	$: username = data.props?.username?.length > 9 ? toTitleCase(data.props.username).slice(0, 9) + '...' : toTitleCase(data.props.username);
	$: userImage = data?.props?.userimage ?? "/agglogo.png";
  
	onMount(() => {
	  const btn = document.getElementById('btn');
	  const sidebar = document.querySelector('.sidebar');
  
	  btn.onclick = function () {
		sidebar.classList.toggle('active');
	  };
	});
  </script>
  
  <svelte:head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Home • Aggregate</title>
	<link
	  href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
	  rel="stylesheet"
	/>
	<link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
	<link rel="stylesheet" href="/nav.css" />
	<link rel="stylesheet" href="/toast.css" />
	<!-- <link rel="stylesheet" href="/loader.css" /> -->
  </svelte:head>
  
  <!-- MetaTags Component -->
  <MetaTags {...data.baseMetaTags} />
  
  <div class="sidebar">
	<div class="top">
	  <div class="logo">
		<i class="bx bxl-codepen"></i>
		<span>Aggregate</span>
	  </div>
	  <i class="bx bx-menu" id="btn"></i>
	</div>
	<div class="user">
	  <img src={userImage} alt="user" class="user-img" />
	  <div>
		<p class="bold">
		  {#if username}
			{username}
		  {:else}
			Sign In
		  {/if}
		</p>
		<p>Aggregate</p>
	  </div>
	</div>
	<ul>
	  <li>
		<a href="/">
		  <i class="bx bxs-home"></i>
		  <span class="nav-item">Home</span>
		</a>
		<span class="tooltip">Home</span>
	  </li>
	  <li>
		<a href="/feeds" data-sveltekit-preload-data>
		  <i class="bx bx-news"></i>
		  <span class="nav-item">Feeds</span>
		</a>
		<span class="tooltip">Feeds</span>
	  </li>
	  <li>
		<a href="/about">
		  <i class="bx bxs-news"></i>
		  <span class="nav-item">About</span>
		</a>
		<span class="tooltip">About</span>
	  </li>
	  {#if isAuthenticated}
	  <Separator />
		<li>
		  <a href="/dashboard" data-sveltekit-preload-data>
			<i class="bx bxs-grid-alt"></i>
			<span class="nav-item">Dashboard</span>
		  </a>
		  <span class="tooltip">Dashboard</span>
		</li>
	  {/if}
	  <Separator />
	  <!-- AUTHS -->
	  <div class="auth-links">
		{#if !isAuthenticated || isAuthenticated === null || isAuthenticated === undefined}
		  <li>
			<a href="/login">
			  <i class="bx bxs-log-in-circle"></i>
			  <span class="nav-item">Login</span>
			</a>
			<span class="tooltip">Login</span>
		  </li>
		  <li>
			<a href="/signup">
			  <i class="bx bxs-user-plus"></i>
			  <span class="nav-item">Signup</span>
			</a>
			<span class="tooltip">Signup</span>
		  </li>
		{:else}
		  <li>
			<form id="logoutForm" method="POST" action="/logout">
			  <a href="/logout" onclick="document.getElementById('logoutForm').submit(); return false;">
				<i class="bx bxs-log-out"></i>
				<span class="nav-item ml-2">Logout</span>
			  </a>
			</form>
		  </li>
		{/if}
	  </div>
	</ul>
  </div>
  <div class="main-content">
	<div class="container" in:fly={{ x: -200, duration: 1000 }} out:slide={{ duration: 600 }}>
	  <Button class="mb-2" on:click={toggleMode} variant="outline" size="icon">
		<Sun
		  class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
		/>
		<Moon
		  class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
		/>
		<span class="sr-only">Toggle theme</span>
	  </Button>
	  <ModeWatcher />
	  <div class="wrap">
		<SvelteToast
		  target="new"
		  options={{
			initial: 1,
			intro: { y: -64 },
			dismissable: false
		  }}
		/>
	  </div>
	  <slot />
	</div>
  </div>
  