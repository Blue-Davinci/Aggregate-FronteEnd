<script>
  import { fly, slide, scale } from 'svelte/transition';
</script>

<div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12" in:slide={{ y: 100, duration: 800 }} out:slide={{ y: -100, duration: 400 }}>
  <div class="md:w-1/2 order-last md:order-last">
    <img src="https://images.unsplash.com/photo-1521316730702-829a8e30dfd0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Random" class="w-full rounded-lg shadow-lg"
    in:slide={{ x: -200, duration: 700 }}
    out:slide={{ y: -200, duration: 400 }}>
  </div>
  <div class="md:w-1/2 text-center md:text-left">
    <h3 class="text-3xl font-semibold mb-4">Our Mission</h3>
    <p class="text-lg mb-6">
      Our mission is to create a seamless and enjoyable experience for users who want to stay informed with the latest updates from their favorite sources. We strive to provide a reliable platform that enhances the way people consume and manage information.
    </p>
    <h3 class="text-3xl font-semibold mb-4">Our Vision</h3>
    <p class="text-lg">
      We envision a world where information is easily accessible and manageable, empowering individuals to stay updated without hassle. Our goal is to be the leading platform for RSS feed aggregation and management, setting the standard for simplicity and efficiency.
    </p>
  </div>
</div>
