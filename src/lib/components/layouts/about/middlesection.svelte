<script>
  import { slide, scale } from 'svelte/transition';
</script>

<div class="flex flex-col items-center space-y-8 md:flex-row md:space-x-12 md:space-y-0">
  <img
    src="https://images.unsplash.com/photo-1522794338816-ee3a17a00ae8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5JTIwZmVhdHVyZXN8ZW58MHx8MHx8fDA%3D"
    alt="Random"
    class="w-full rounded-lg shadow-lg transform transition-transform duration-300 md:w-1/2 hover:scale-105"
    in:slide={{ x: -200, duration: 700 }}
    out:slide={{ y: -200, duration: 400 }}
  />
  <div
    class="text-center md:text-left"
    in:slide={{ x: 200, duration: 700 }}
    out:slide={{ y: -200, duration: 400 }}
  >
    <h3 class="mb-4 text-3xl font-semibold">Key Features</h3>
    <ul class="list-inside space-y-2 text-lg">
      <li class="relative pl-6 before:absolute before:left-0 before:top-1/2 before:h-2 before:w-2 before:-mt-1 before:bg-green-500 before:rounded-full">Unified RSS feed management</li>
      <li class="relative pl-6 before:absolute before:left-0 before:top-1/2 before:h-2 before:w-2 before:-mt-1 before:bg-green-500 before:rounded-full">Secure and user-friendly interface</li>
      <li class="relative pl-6 before:absolute before:left-0 before:top-1/2 before:h-2 before:w-2 before:-mt-1 before:bg-green-500 before:rounded-full">Real-time updates and notifications</li>
      <li class="relative pl-6 before:absolute before:left-0 before:top-1/2 before:h-2 before:w-2 before:-mt-1 before:bg-green-500 before:rounded-full">Customizable feed preferences</li>
      <li class="relative pl-6 before:absolute before:left-0 before:top-1/2 before:h-2 before:w-2 before:-mt-1 before:bg-green-500 before:rounded-full">Easy to use and navigate</li>
    </ul>
  </div>
</div>
