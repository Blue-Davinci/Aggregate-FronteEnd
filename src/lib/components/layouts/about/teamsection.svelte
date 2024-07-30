<script>
  import { fly, scale, slide } from 'svelte/transition';
</script>

<div class="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12"
  in:fly={{ y: 200, duration: 700 }}
  out:slide={{ y: -200, duration: 400 }}>
  <div class="md:w-1/2">
    <h3 class="text-3xl font-semibold mb-4 text-center md:text-center">Meet the Team</h3>
    <div class="flex flex-col items-center space-y-4">
      <img src="https://avatars.githubusercontent.com/u/52623427?s=400&u=520ed5ce2568f7bfcdee2c5ef9ab7c1963d4daa4&v=4" alt="Blue-Davinci" class="w-24 h-24 rounded-full shadow-lg pulse-glow"
      in:scale={{ duration: 500 }} out:scale={{ duration: 500 }} />
      <p class="text-lg font-semibold">Blue-Davinci</p>
      <p class="text-center md:text-left">Founder & Developer</p>
    </div>
  </div>
  <div class="md:w-1/3">
    <img src="/agglogo.png" alt="Random" class="w-full rounded-lg shadow-lg"
    in:scale={{ duration: 500 }} out:scale={{ duration: 500 }} />
  </div>
</div>

<style>
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
    50% {
      transform: scale(1.1);
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
    }
  }

  @keyframes glow {
    0% {
      box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #f9c, 0 0 20px #f9c, 0 0 25px #f9c, 0 0 30px #f9c, 0 0 35px #f9c;
    }
    50% {
      box-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #f9c, 0 0 40px #f9c, 0 0 50px #f9c, 0 0 60px #f9c, 0 0 70px #f9c;
    }
    100% {
      box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #f9c, 0 0 20px #f9c, 0 0 25px #f9c, 0 0 30px #f9c, 0 0 35px #f9c;
    }
  }

  .pulse-glow {
    animation: pulse 2s infinite, glow 2s infinite;
  }
</style>