<script>
    import { onMount } from 'svelte';
  
    let sidebarActive = false;
  
    // This function toggles the sidebar's active state
    function toggleSidebar() {
      sidebarActive = !sidebarActive;
    }
  
    // Using onMount ensures this code runs only in the client-side environment
    onMount(() => {
      let btn = document.querySelector('#btn');
      btn.onclick = toggleSidebar;
    });
  </script>

<svelte:head>
    <link rel="stylesheet" href="nav.css" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Aggregate</title>
	<link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
</svelte:head>

<div class="sidebar">
	<div class="top">
		<div class="logo">
			<i class="bx bxl-codepen"></i>
			<span>Aggregate</span>
		</div>
		<i class="bx bx-menu" id="btn"></i>
	</div>
	<div class="user">
		<img src="/user.jpg" alt="user" class="user-img" />
		<div>
			<p class="bold">Davinci</p>
			<p>Admin</p>
		</div>
	</div>
	<ul>
		<li>
			<a href="#a">
				<i class="bx bx-home-circle"></i>
				<span class="nav-item">Home</span>
			</a>
			<span class="tooltip">Home</span>
		</li>
		<li>
			<a href="#a">
				<i class="bx bx-news"></i>
				<span class="nav-item">Feeds</span>
			</a>
			<span class="tooltip">Feeds</span>
		</li>
		<li>
			<a href="#a">
				<i class="bx bxs-news"></i>
				<span class="nav-item">About</span>
			</a>
			<span class="tooltip">About</span>
		</li>
		<!-- Probably a <hr \> here-->
		<li>
			<a href="#a">
				<i class="bx bxs-grid-alt"></i>
				<span class="nav-item">Dashboard</span>
			</a>
			<span class="tooltip">Dashboard</span>
		</li>
		<li>
			<a href="#a">
				<i class="bx bx-id-card"></i>
				<span class="nav-item">Account</span>
			</a>
			<span class="tooltip">Account</span>
		</li>
		<hr />
		<!-- AUTHS -->
		<div class="auth-links">
			<li>
				<a href="#a">
					<i class="bx bxs-log-out"></i>
					<span class="nav-item">Logout</span>
				</a>
				<span class="tooltip">Logout</span>
			</li>
			<li>
				<a href="#a">
					<i class="bx bxs-log-in-circle"></i>
					<span class="nav-item">Login</span>
				</a>
				<span class="tooltip">Login</span>
			</li>
			<li>
				<a href="#a">
					<i class="bx bxs-user-plus"></i>
					<span class="nav-item">Signup</span>
				</a>
				<span class="tooltip">Signup</span>
			</li>
		</div>
	</ul>
</div>
<div class="main-content">
	<div class="container">
		<h1>Aggregate User</h1>
	</div>
</div>
