<script>
      import { Button } from "$lib/components/ui/button";
    </script>
    
    <style>
      .centered-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        text-align: center;
      }
    </style>
    
    <div class="centered-container">
      <Button>Click me</Button>
      <h1>Welcome to SvelteKit</h1>
      <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
    </div>