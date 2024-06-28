<script>
    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button";
    import { fly, slide } from 'svelte/transition';
    import { goto } from '$app/navigation';
    import Star from "lucide-svelte/icons/star"; 
      import { Toggle } from "$lib/components/ui/toggle";
       import * as Tooltip from "$lib/components/ui/tooltip";
    //import { quintOut } from 'svelte/easing';
    //  transition:fly={{ delay: 250, duration: 300, x: 100, y: 500, opacity: 0.5, easing: quintOut }}
  </script>
  
  <style>
    .center {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      font-family: 'Roboto', sans-serif; /* Changed to Roboto */
    }
  </style>
  
  <div 
  class="center" 	
  in:fly={{ x: -200, duration: 1000 }} out:slide={{ duration: 600 }}
  >
    <Card.Root class="w-[550px] space-y-4">
      <Card.Header>
        <Card.Title>About Aggregate</Card.Title>
        <img src="/agglogo.png" alt="Aggregate Logo" class="mx-auto my-1" style="max-width: 250px;"/>
        <hr />
      </Card.Header>
      <Card.Content class="p-3">
        <p class="mb-4">Aggregate is a project aimed at simplifying the development process by providing a unified platform for managing various web development frameworks.</p>
        <p>Whether you're working with SvelteKit, Next.js, Astro, or Nuxt.js, Aggregate streamlines your workflow for a more efficient project deployment.</p>
      </Card.Content>
      <Card.Footer class="flex justify-center p-4 gap-10">
        <Button on:click={() => goto('/')}>Learn More</Button>
        <Tooltip.Root>
            <Tooltip.Trigger>
              <Toggle variant="outline" aria-label="Toggle favorite" class="mr-10">
                  <Star class="h-4 w-4" /> <!-- Use the Star icon inside the Toggle -->
                </Toggle>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <p>Add to library</p>
            </Tooltip.Content>
          </Tooltip.Root>
      </Card.Footer>
    </Card.Root>
  </div>

