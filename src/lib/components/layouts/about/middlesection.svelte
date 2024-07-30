<script>
    import { fly, slide, scale } from 'svelte/transition';
  </script>
  
  <div class="flex flex-col items-center space-y-8 md:flex-row md:space-x-12 md:space-y-0">
    <img
      src="https://images.unsplash.com/photo-1522794338816-ee3a17a00ae8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5JTIwZmVhdHVyZXN8ZW58MHx8MHx8fDA%3D"
      alt="Random"
      class="w-full rounded-lg shadow-lg md:w-1/2"
      in:slide={{ x: -200, duration: 700 }}
      out:slide={{ y: -200, duration: 400 }}
    />
    <div
      class="text-center md:text-left"
      in:slide={{ x: 200, duration: 700 }}
      out:slide={{ y: -200, duration: 400 }}
    >
      <h3 class="mb-4 text-3xl font-semibold">Key Features</h3>
      <ul class="list-inside list-disc space-y-2 text-lg">
        <li>Unified RSS feed management</li>
        <li>Secure and user-friendly interface</li>
        <li>Real-time updates and notifications</li>
        <li>Customizable feed preferences</li>
        <li>Easy to use and navigate</li>
      </ul>
    </div>
  </div>
  