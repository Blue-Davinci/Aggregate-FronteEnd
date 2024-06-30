import { redirect } from '@sveltejs/kit';
import { checkAuthentication } from '$lib/utilities/auth.js';

// The hook function is an async function that takes an event and a resolve function
// checks whether a user is authenticated and which path is being accessed. Depending on which,
// it will redirect the user accordingly.
export  const handle =  async({ event, resolve }) =>{
	// authenticated endpoints
	const authenticatedPaths = ['/dashboard', '/logout', '/profile', '/settings'];
	const safelistPaths = ['/login', '/signup'];
	const requestedPath = event.url.pathname;
	let credentials = checkAuthentication(event.cookies);
	// Attempt to get the client address directly
	let clientAddress = event.getClientAddress();

	// Fallback to checking the 'X-Forwarded-For' header if direct access fails
	if (!clientAddress) {
		const forwardedFor = event.request.headers.get('x-forwarded-for');
		clientAddress = forwardedFor ? forwardedFor.split(',')[0] : 'Unknown';
	}
	console.log('[H.S.J] Request is accessing:', requestedPath === '/' ? '/Home' : requestedPath);
	console.log('[H.S.J] Received connection from: ', clientAddress);
	// Check if the requested path requires authentication or route is safef listed 
	const requiresAuth = authenticatedPaths.some((path) => requestedPath.includes(path));
    const isSafelist = safelistPaths.some((path) => requestedPath.includes(path));
	// Check if user is authenticated for every request and accessing specified paths
	if (!credentials.status && !credentials.user && requiresAuth) {
		redirect(303, `/login?redirectTo=${requestedPath}`);
	} else {
		// otherwise if logged in and trying to access safelisted paths eg login or signup then
		// we redirect them to the home page
		if (isSafelist) {
			redirect(303, `/`);
		}
		// proceed with writting the locals
		// what we will do is simply set the locals to true rather than do write the
		event.locals.user = true;
	}
	console.log('[H.S.J] Event Locals User:', event.locals.user);
	const response = await resolve(event);

	return response;
};
