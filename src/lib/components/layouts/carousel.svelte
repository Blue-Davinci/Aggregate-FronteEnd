<!-- Carousel.svelte -->
<script>
    import Autoplay from "embla-carousel-autoplay";
    import { Star } from 'lucide-svelte';
    import * as Card from "$lib/components/ui/card";
    import * as Carousel from "$lib/components/ui/carousel";

    export let posts;
    let slicedPosts = posts.slice(0, 8);
    const plugin = Autoplay({ delay: 2000, stopOnInteraction: true });
</script>

<div class="w-full mt-8 mb-8">
    <div class="flex items-center mb-4">
        <Star class="h-6 w-6 mr-2 text-yellow-500" /> <!-- Changed color to yellow -->
        <h2 class="text-lg font-semibold">My Favorites</h2>
    </div>

    <h2 class="text-2xl font-bold mb-4">Featured Posts</h2> <!-- Added title -->

    <Carousel.Root plugins={[plugin]} class="w-full">
        <Carousel.Content class="flex w-full">
            {#each slicedPosts as post (post.id)}
                <Carousel.Item class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                    <div class="p-1 h-full">
                        <Card.Root>
                            <Card.Content class="flex flex-col h-80 items-center justify-center p-6 relative">
                                <img src={post.Channel.Item[0].ImageURL} alt="Post" class="w-full h-full object-cover mb-2" />
                                <div class="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 text-white p-2">
                                    <h3 class="text-lg font-semibold truncate">{post.Channel.Item[0].Title}</h3>
                                    <p class="text-sm truncate">{post.Channel.Item[0].Description.slice(0, 50)}...</p>
                                </div>
                            </Card.Content>
                        </Card.Root>
                    </div>
                </Carousel.Item>
            {/each}
        </Carousel.Content>
        <Carousel.Previous />
        <Carousel.Next />
    </Carousel.Root>
</div>

<style>
    .truncate {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>
