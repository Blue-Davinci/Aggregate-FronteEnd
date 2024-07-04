<script>
  import {Separator} from '$lib/components/ui/separator';
  import { Github, Twitter, Linkedin, Undo2 } from 'lucide-svelte/icons';
  import { fly, slide, fade } from 'svelte/transition';
  import { page } from '$app/stores';

  let params = $page.url.searchParams.get('redirectTo')? $page.url.searchParams.get('redirectTo'): '/';
  //console.log("Params: ", params);
</script>
<svelte:head>
  <link rel="stylesheet" href="/about.css" />
</svelte:head>

<a href={params} class="mt-10 flex items-center text-white bg-blue-500 hover:bg-blue-700 transition-colors duration-300 px-4 py-2 rounded-md">
  <Undo2 class="mr-2 h-5 w-5" />
  <span class="font-medium">Go Back</span>
</a>
<section class="about-section" in:fly={{ x: 200, duration: 1000 }} out:fade>
  <div class="about-content">
    <img src="/agglogo.png" alt="Aggregate Logo" class="mx-auto my-8" style="max-width: 250px;" />
    <Separator class="mt-4 mb-4" />
    <h2 class="text-3xl font-bold mb-4">About Aggregate</h2>

    <div class="about-description" in:fly={{ x: -200, duration: 1000 }} out:slide={{ duration: 400 }}>
      <p in:fly={{ x: -200, duration: 1000 }} out:slide={{ duration: 400 }}>
        Aggregate is a project born out of my passion for staying updated with my favorite RSS feeds. As an avid consumer of news and updates, I found myself constantly navigating multiple sources. Aggregate aims to simplify this process by providing a unified platform where users can aggregate, follow, and manage their feeds effortlessly.
      </p>
      <br />
      <p in:fly={{ x: 200, duration: 1000 }} out:fade>
        Whether you're passionate about staying updated or need a reliable tool for work, Aggregate offers a secure and user-friendly interface. Explore your interests without missing a beat!
      </p>
    </div>
    <Separator class="mt-6 mb-4" />
    <div class="social-icons">
      <a href="https://github.com/Blue-Davinci/Aggregate-FronteEnd" target="_blank" rel="noopener noreferrer">
        <Github class="h-8 w-8 hover:text-gray-700" />
      </a>
      <a href="https://www.linkedin.com/in/yourlinkedinprofile" target="_blank" rel="noopener noreferrer">
        <Linkedin class="h-8 w-8 hover:text-gray-700" />
      </a>
      <a href="https://twitter.com/yourtwitterprofile" target="_blank" rel="noopener noreferrer">
        <Twitter class="h-8 w-8 hover:text-gray-700" />
      </a>
    </div>
  </div>
</section>
