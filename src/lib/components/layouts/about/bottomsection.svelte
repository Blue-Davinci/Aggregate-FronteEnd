<script>
  import { Github, Twitter, Linkedin } from 'lucide-svelte/icons';
  import { fly, scale, slide } from 'svelte/transition';
</script>

<div class="bg-gradient-to-r from-green-500 to-blue-500 p-8 rounded-lg shadow-lg text-white"
  in:fly={{ y: 200, duration: 400 }}
  out:slide={{ y: -200, duration: 400 }}>
  <h3 class="text-3xl font-semibold text-center mb-6">Connect With Us</h3>
  <div class="flex justify-center space-x-6">
    <a href="https://github.com/Blue-Davinci" class="transform transition-transform duration-300 hover:scale-125">
      <Github class="h-8 w-8" />
    </a>
    <a href="https://twitter.com/blue_davinci_" class="transform transition-transform duration-300 hover:scale-125">
      <Twitter class="h-8 w-8" />
    </a>
    <a href="https://linkedin.com/in/blue-davinci" class="transform transition-transform duration-300 hover:scale-125">
      <Linkedin class="h-8 w-8" />
    </a>
  </div>
</div>
