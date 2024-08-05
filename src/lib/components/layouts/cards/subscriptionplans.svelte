<script>
	import { initializeSubscription } from '$lib/dataservice/subscriptionDataService';
	import { setToast } from '$lib/utilities/utils';
	export let plan;
  	export let user;

	let isSaving = false;

	const handlePurchase = async () => {
		if (plan.amount === 0) {
			setToast(
				true,
				'You have selected the free plan. Who says the best things in life aren’t free?',
				4000
			);
			return;
		}
		if (!user || user === undefined) {
			setToast(false, 'You need to login to purchase a plan.');
			return;
		}
		isSaving = true;
		try {
			let response = await initializeSubscription(plan.id, plan.amount);
			if (response.error) {
				let message = response.error.transaction ? response.error.transaction.message : response.error.message;
				setToast(false, response.message, 3000);
				isSaving = false; // Reset isSaving in case of error
				return;
			} else {
				console.log('Response: ', response.data);
				let payment_gateway_url = response.data.initialization.data.authorization_url;
				setToast(true, 'Redirecting to payment gateway...', 3000);
				window.location.href = payment_gateway_url;
			}
		} catch (error) {
			console.error('Error: ', error);
			setToast(false, 'An error occurred. Please try again.', 3000);
		} finally {
			isSaving = false;
		}
	};

	function formatAmount(plan_duration, plan_amount) {
		if (plan_duration === 'month') {
			return `$${plan_amount}/month`;
		} else if (plan_duration === 'year') {
			return `$${plan_amount}/year`;
		} else {
			return '$0/month';
		}
	}

	function splitFeature(feature) {
		const [title, ...description] = feature.split(':');
		return { title: title.trim(), description: description.join(':').trim() };
	}
</script>

<div
	class="flex h-full transform flex-col overflow-hidden rounded-lg bg-white shadow-lg transition duration-500 ease-in-out hover:scale-105 dark:bg-gray-800"
>
	<button
		type="button"
		class="relative h-48 w-full cursor-pointer object-cover focus:outline-none"
		on:click={handlePurchase}
		style="background-image: url('{plan.image}'); background-size: cover; background-position: center;"
	>
		<span
			class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100"
		>
			{#if plan.amount !== 0}
				<span class="text-lg font-semibold text-white">Purchase Plan</span>
			{/if}
		</span>
	</button>
	<div
		class="flex h-full flex-col justify-between p-4 hover:bg-gradient-to-r hover:from-gray-100 hover:via-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:via-gray-800 dark:hover:to-gray-900"
	>
		<div>
			<h2 class="cursor-pointer text-2xl font-semibold text-gray-900 dark:text-white">
				{plan.name}
			</h2>
			<p class="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">
				{formatAmount(plan.duration, plan.amount)}
			</p>
			<ul class="mt-4 space-y-2">
				{#each plan.features as feature}
					{#if feature}
						<li class="flex items-start text-gray-700 dark:text-gray-300">
							<svg
								class="mt-1 h-5 w-5 text-green-500 dark:text-green-300"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M9 12l2 2 4-4-1.41-1.42L11 11.17l-1.59-1.59L8 10l1 1z" />
							</svg>
							<div class="ml-3">
								<span class="font-bold">{splitFeature(feature).title}:</span>
								<span class="ml-1">{splitFeature(feature).description}</span>
							</div>
						</li>
					{/if}
				{/each}
			</ul>
		</div>
		<div class="mt-4">
			<button
				class="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 px-5 py-3 text-lg font-medium text-white shadow-md transition duration-300 hover:from-blue-600 hover:to-teal-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 dark:from-blue-600 dark:to-teal-500 dark:hover:from-blue-700 dark:hover:to-teal-600"
				on:click={handlePurchase}
				disabled={isSaving}
			>
				{#if isSaving}
					<svg
						width="20"
						height="20"
						fill="currentColor"
						class="mr-2 animate-spin"
						viewBox="0 0 1792 1792"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"
						>
						</path>
					</svg>
					Processing...
				{:else}
					Buy Now
				{/if}
			</button>
		</div>
	</div>
</div>
