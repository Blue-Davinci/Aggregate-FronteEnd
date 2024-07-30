<script>
  import { fly, scale, slide } from 'svelte/transition';
</script>

<div class="rounded-lg bg-gradient-to-r from-blue-500 to-green-500 p-8 text-white shadow-lg"
  in:fly={{ y: -200, duration: 400 }}
  out:slide={{ y: -200, duration: 400 }}>
  <h2 class="mb-6 text-center text-4xl font-bold">About Aggregate</h2>
  <p class="text-center text-lg">
    Aggregate is a project born out of my passion for staying updated with my favorite RSS feeds. As
    an avid consumer of news and updates, I found myself constantly navigating multiple sources.
    Aggregate aims to simplify this process by providing a unified platform where users can
    aggregate, follow, and manage their feeds effortlessly.
  </p>
</div>
