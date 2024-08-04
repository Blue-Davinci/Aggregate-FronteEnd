import adapter from '@sveltejs/adapter-auto';
import 'dotenv/config';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		csrf: {
			checkOrigin: true, // Use the VITE_ORIGIN environment variable
		  }
	}
};

console.log('Configured ORIGIN:', process.env.ORIGIN); // Ensure it's logging the correct orig

export default config;
