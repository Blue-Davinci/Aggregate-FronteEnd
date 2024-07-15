<script>
import {goto} from '$app/navigation';
import {Button} from '$lib/components/ui/button';
import {ArrowBigLeft} from 'lucide-svelte/icons';
import { fly, slide } from 'svelte/transition';
import { onMount } from 'svelte';
let ComboBox;

onMount(async () => {
    ComboBox = (await import('$lib/components/layouts/search-options/feedscombobox.svelte')).default;
  });
</script>

<div in:fly={{ x: -200, duration: 1000 }} out:slide={{ duration: 600 }}>
<Button on:click={() => goto('/dashboard')}> <ArrowBigLeft class="inline-block h-4 w-4 mr-2 -mt-1" /> Go Back</Button>

<h1>
    This is the account page
</h1>
<p>
    This is a protected page. You can only access this page if you are logged in.
</p>
</div>

{#if ComboBox}
  <svelte:component this={ComboBox} />
{:else}
  <!-- Optional: Placeholder while loading -->
  <div>Loading...</div>
{/if}