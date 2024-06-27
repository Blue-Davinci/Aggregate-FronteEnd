<script>
      import { Button } from "$lib/components/ui/button";
      import Intro from "$lib/components/layouts/intro.svelte";
      import Productivity from "$lib/components/layouts/productivity.svelte";
      import Reviews from "$lib/components/layouts/reviews.svelte";
      import Footer from "$lib/components/layouts/footer.svelte";
    </script>
    
<svelte:head>
  <title>Home</title>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link
    rel="icon"
    type="image/png"
    sizes="32x32"
    href="/favicon-32x32.png"
  />
  <link
  href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&family=Raleway:wght@400;700&display=swap"
  rel="stylesheet"
/>
<link rel="stylesheet" href="/home.css" />
</svelte:head>

<Intro />
<Productivity />
<Reviews />
<Footer />