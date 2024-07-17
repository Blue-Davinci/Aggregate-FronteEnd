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

// This function returns an updatedData object and an originalData object
function processUpdateData(formData) {
	let updatedData = {
		id: formData.original_id,
		name: formData.name,
		url: formData.url,
		img_url: formData.img_url,
		feed_type: formData.feed_type,
		feed_description: formData.feed_description,
		is_hidden: formData.is_hidden
	};

	let originalData = {
		id: formData.original_id,
		name: formData.original_name,
		url: formData.original_url,
		img_url: formData.original_img_url,
		feed_type: formData.original_feed_type,
		feed_description: formData.original_feed_description,
		is_hidden: formData.original_is_hidden === 'true'
	};

	return {
		updatedData,
		originalData
	};
}

// This function returns an object containing the fields that have changed
function getChangedFields(original, updated) {
	const changes = {};
	for (const key in original) {
		if (original[key] !== updated[key]) {
				changes[key] = updated[key];
		}
	}
	return changes;
}
export { 
	setToast, 
	checkForHTMLTags, 
	toTitleCase, 
	buildFeedFollowUrl, 
	processUpdateData,
	getChangedFields 
};
