import { toast } from '@zerodevx/svelte-toast';

function setToast(status, message, duration = 4000) {
	if (status) {
		// we push a good toast message to the user
		toast.push(message, {
			duration: duration,
			type: status ? 'success' : 'error',
			target: 'new',
			dismissable: false
		});
	} else {
		//push a failure toast
		toast.push(message, {
			target: 'new',
			duration: duration,
			theme: {
				'--toastBackground': 'red',
				'--toastColor': 'white',
				'--toastBarBackground': 'red'
			}
		});
	}
}
function toTitleCase(str) {
	if (str) {
		return str.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	} else {
		return str;
	}
}

function checkForHTMLTags(str) {
	const htmlTagPattern = /<\/?[a-z][\s\S]*>/i;
	return htmlTagPattern.test(str);
}

function buildFeedFollowUrl(baseUrl, params) {
    let queryParts = [];
    // Check each parameter and add it to queryParts if it's not undefined or empty
    if (params.name) {
        queryParts.push(`name=${encodeURIComponent(params.name)}`);
    }
    if (params.page) {
        queryParts.push(`page=${encodeURIComponent(params.page)}`);
    }
    if (params.page_size) {
        queryParts.push(`page_size=${encodeURIComponent(params.page_size)}`);
    }
	if (params.feedID) {
        queryParts.push(`feedID=${encodeURIComponent(params.feedID)}`);
    }
    // Only append '?' if there are query parameters
    if (queryParts.length > 0) {
        return `${baseUrl}?${queryParts.join('&')}`;
    } else {
        return baseUrl; // Return the base URL without a '?' if there are no parameters
    }
}

export { setToast, checkForHTMLTags, toTitleCase, buildFeedFollowUrl };
