<script>
    const plans = [
        {
            name: "Free",
            price: "$0/month",
            image: "https://images.unsplash.com/photo-1547481887-a26e2cacb5b2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            features: [
                "5 feeds",
                "Follow 10 feeds",
                "10 messages/day"
            ],
            buttonText: "Get Started"
        },
        {
            name: "Monthly",
            price: "$10/month",
            image: "https://images.unsplash.com/photo-1656941599882-808d7b04b86a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9udGhseXxlbnwwfHwwfHx8MA%3D%3D",
            features: [
                "20 feeds",
                "Follow 40 feeds",
                "50 messages/day",
                "Priority support"
            ],
            buttonText: "Buy Now"
        },
        {
            name: "Annual",
            price: "$100/year",
            image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8eWVhcmx5JTIwcGF5bWVudHxlbnwwfHwwfHx8MA%3D%3D",
            features: [
                "Unlimited feeds",
                "Follow unlimited feeds",
                "Unlimited messages/day",
                "24/7 support",
                "Custom integrations"
            ],
            buttonText: "Buy Now"
        }
    ];

    function handlePurchase(planName) {
        alert(`Purchasing ${planName} plan!`);
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl w-full space-y-8">
        <h1 class="text-4xl font-extrabold text-center text-white">Choose Your Plan</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each plans as plan}
                <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-green-400 hover:via-blue-500 hover:to-purple-500">
                    <button type="button" class="w-full h-48 object-cover cursor-pointer" on:click={() => handlePurchase(plan.name)} style="background-image: url('{plan.image}'); background-size: cover; background-position: center;"></button>
                    <div class="p-6 flex flex-col justify-between h-full">
                        <div>
                            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white cursor-pointer">{plan.name}</h2>
                            <p class="mt-4 text-4xl font-extrabold text-gray-900 dark:text-white">{plan.price}</p>
                            <ul class="mt-6 space-y-4">
                                {#each plan.features as feature}
                                    <li class="flex items-center text-gray-700 dark:text-gray-300">
                                        <svg class="h-6 w-6 text-green-500 dark:text-green-300" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 12l2 2 4-4-1.41-1.42L11 11.17l-1.59-1.59L8 10l1 1z"/>
                                        </svg>
                                        <span class="ml-3">{feature}</span>
                                    </li>
                                {/each}
                            </ul>
                        </div>
                        <div class="mt-6">
                            <button class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-150" on:click={() => handlePurchase(plan.name)}>{plan.buttonText}</button>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
