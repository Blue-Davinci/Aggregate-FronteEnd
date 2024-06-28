<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->

	<title>Error</title>

	<!-- Google font -->
	<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,900" rel="stylesheet" />

	<!-- Custom stlylesheet -->
	<link type="text/css" rel="stylesheet" href="/error.css" />

	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
		  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
		  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->
</svelte:head>

<div class="parent-container">
	<div class="notfound">
		<div class="notfound">
			<div class="oops">
				<h1>Oops!</h1>
			</div>
			<h2>{$page.error.title ? $page.error.title : 'An Error Occurred'}</h2>
			<p>{$page.error.message ? $page.error.message : ''}</p>
			<p>
				{$page.error.info? $page.error.info: 'A problem has occurred that prevented us from displaying what you wanted'}
			</p>
			<a href="/">Go To Homepage</a>
		</div>
	</div>
</div>

<style>
	.parent-container {
		display: flex;
		align-items: center;
		justify-content: center;
		height: calc(100vh - 0px); /* adjust this value based on the height of your footer */
		padding: 20px;
	}
	.oops h1 {
		font-family: 'Montserrat', sans-serif;
		font-size: 120px;
		font-weight: 900;
		position: relative;
		background: url('https://i.ibb.co/ysnSFL2/bg.jpg') no-repeat;
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-size: cover;
		background-position: center;
		text-align: center;
		line-height: 1; /* Adjust line-height to ensure text aligns properly */
	}
</style>
