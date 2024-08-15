<script>
    import {Edit, PlusCircle, CheckCircle, User, DollarSign, Calendar} from 'lucide-svelte'
    let plans = [
        {
            "id": 1,
            "name": "Free",
            "image": "https://i.ibb.co/RPJ0LkQ/Untitled-design.png",
            "description": "Get Started",
            "duration": "free",
            "amount": 0,
            "features": [
                "5 Feeds: Track up to 5 of your favorite topics or websites.",
                "Follow 10 Feeds: Keep tabs on updates from 10 different feeds.",
                "10 Messages/Day: Send up to 10 personalized messages per day.",
                "Basic Analytics: Get insights into your feed consumption.",
                "Community Access: Join discussions and get tips from other users."
            ],
            "created_at": "2024-08-03T19:54:17+03:00",
            "updated_at": "2024-08-03T19:54:17+03:00",
            "status": "active",
            "version": 1
        },
        {
            "id": 2,
            "name": "Monthly",
            "image": "https://i.ibb.co/Wxs7Dvd/Untitled-design-1.png",
            "description": "Buy Now",
            "duration": "month",
            "amount": 10,
            "features": [
                "20 Feeds: Aggregate up to 20 diverse feeds for a richer experience.",
                "Follow 40 Feeds: Stay informed with updates from 40 different feeds.",
                "50 Messages/Day: Engage more with up to 50 messages daily.",
                "Advanced Analytics: Detailed insights on your feed interactions and trends.",
                "Priority Support: Faster response times from our support team.",
                "Feed Scheduling: Schedule updates and content delivery at your convenience.",
                "Content Filtering: Filter content based on keywords or topics of interest."
            ],
            "created_at": "2024-08-03T19:54:17+03:00",
            "updated_at": "2024-08-03T19:54:17+03:00",
            "status": "active",
            "version": 1
        },
        {
            "id": 3,
            "name": "Annual",
            "image": "https://i.ibb.co/9sXPGWW/Untitled-design-2.png",
            "description": "Buy Now",
            "duration": "year",
            "amount": 100,
            "features": [
                "Unlimited Feeds: Aggregate an unlimited number of feeds.",
                "Follow Unlimited Feeds: Never miss an update from any feed.",
                "Unlimited Messages/Day: Unlimited messaging capabilities for maximum engagement.",
                "Premium Analytics: Deep dive into trends, popular topics, and consumption patterns.",
                "24/7 Support: Get assistance any time of the day or night.",
                "Feed Customization: Personalize the appearance and organization of your feeds.",
                "Exclusive Content: Access to exclusive content and premium feed sources.",
                "Early Access to New Features: Be the first to try out new features and improvements."
            ],
            "created_at": "2024-08-03T19:54:17+03:00",
            "updated_at": "2024-08-03T19:54:17+03:00",
            "status": "active",
            "version": 1
        },
        {
            "id": 4,
            "name": "Platinum Plan",
            "image": "https://images.unsplash.com/photo-1469488619210-f2bf26ab0987?q=80&w=1308&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "description": "This is a premium subscription plan offering exclusive features.",
            "duration": "year",
            "amount": 150,
            "features": [
                "Unlimited access to all resources",
                "Priority customer support",
                "Exclusive webinars and workshops",
                "Early access to new features",
                "Customizable dashboard"
            ],
            "created_at": "2024-08-15T12:10:43+03:00",
            "updated_at": "2024-08-15T15:25:05+03:00",
            "status": "active",
            "version": 2
        }
    ];
</script>
<div class="bg-gray-100 p-6 dark:bg-gray-900">
    <!-- Statistics Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div class="bg-blue-500 dark:bg-blue-700 text-white shadow-lg rounded-lg p-6 transform hover:scale-105 hover:bg-blue-600 dark:hover:bg-blue-800 transition duration-300">
            <div class="flex items-center">
                <CheckCircle class="text-white mr-2" />
                <h2 class="text-lg font-bold">Total Plans</h2>
            </div>
            <p class="text-4xl font-extrabold">{plans.length}</p>
        </div>
        <div class="bg-green-500 dark:bg-green-700 text-white shadow-lg rounded-lg p-6 transform hover:scale-105 hover:bg-green-600 dark:hover:bg-green-800 transition duration-300">
            <div class="flex items-center">
                <CheckCircle class="text-white mr-2" />
                <h2 class="text-lg font-bold">Most Used Plan</h2>
            </div>
            <p class="text-4xl font-extrabold">Free</p>
        </div>
        <div class="bg-purple-500 dark:bg-purple-700 text-white shadow-lg rounded-lg p-6 transform hover:scale-105 hover:bg-purple-600 dark:hover:bg-purple-800 transition duration-300">
            <div class="flex items-center">
                <CheckCircle class="text-white mr-2" />
                <h2 class="text-lg font-bold">Latest Plan</h2>
            </div>
            <p class="text-4xl font-extrabold">{plans[plans.length - 1].name}</p>
        </div>
    </div>

    <!-- Plans Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {#each plans as plan}
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col transition transform hover:scale-105 duration-300">
                <div class="relative">
                    <img class="w-full h-48 object-cover" src={plan.image} alt={plan.name} />
                </div>
                <div class="p-4 flex flex-col flex-grow items-center">
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h2>
                    <p class="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 p-3 rounded-md text-center mb-4">
                        {plan.description}
                    </p>
                    <ul class="text-gray-600 dark:text-gray-400 mb-4 space-y-1">
                        {#each plan.features as feature}
                            <li class="flex items-center space-x-2">
                                <CheckCircle class="text-blue-500" />
                                <span>{feature}</span>
                            </li>
                        {/each}
                    </ul>
                    <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 w-full">
                        <span class="text-lg font-semibold text-blue-600 dark:text-blue-400">{plan.amount == 0 ? 'Free' : `$${plan.amount}`}</span>
                        <span class="text-sm text-gray-500 dark:text-gray-400 capitalize badge">{plan.duration}</span>
                    </div>
                </div>
                <button class="absolute top-2 left-2 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-300">
                    <Edit />
                </button>
            </div>
        {/each}
    </div>

    <!-- Add Plan Button -->
    <button class="fixed bottom-4 right-4 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition duration-300">
        <PlusCircle />
    </button>
</div>
