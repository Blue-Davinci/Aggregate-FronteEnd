<script>
  import Goback from '$lib/components/layouts/general/goback.svelte';
  import Metamanager from '$lib/components/layouts/metatags/metamanager.svelte';
  import Topsection from '$lib/components/layouts/about/topsection.svelte';
  import Middlesection from '$lib/components/layouts/about/middlesection.svelte';
  import Missionvision from '$lib/components/layouts/about/missionvision.svelte';
  import Teamsection from '$lib/components/layouts/about/teamsection.svelte';
  import Bottomsection from '$lib/components/layouts/about/bottomsection.svelte';

  export let data;
  let pagemetadata = data?.props?.metadata ?? {};
  let pageInfo = {
    title: 'About',
    message: 'Learn more about our mission and the team behind Aggregate.',
    icon: null
  };
</script>

<svelte:head>
  <link rel="stylesheet" href="/about.css" />
</svelte:head>

<Goback/>

<Metamanager {pagemetadata} {pageInfo} />

<section class="about-section mt-10 px-6 space-y-16">
  <!-- Top Section -->
  <Topsection />
  <!-- Middle Section -->
  <Middlesection />
  <!-- Mission & Vision Section -->
  <Missionvision />
  <!-- Team Section -->
  <Teamsection />
  <!-- Bottom Section -->
  <Bottomsection />
</section>
