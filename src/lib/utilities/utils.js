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

// Function to fetch image data as a base64 string
async function fetchImageAsBase64(url) {
	try {
		const response = await fetch(url);
		const blob = await response.blob();
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(blob);
		});
	} catch (error) {
		console.error('Error fetching image:', error);
		return null;
	}
}

// Function to convert post data to PDF content
async function convertPostToPDFContent(post, doc) {
	doc.setFontSize(14);
	doc.text(`${post.info.Channel.Title}`, 70, 20);
	doc.text(`${post.info.Channel.Link}`, 70, 30);
	doc.text(`Description:`, 10, 40);
	let descriptionLines = doc.splitTextToSize(post.info.Channel.Description, 180);
	doc.text(descriptionLines, 10, 50);

	let yPosition = 60 + descriptionLines.length * 10;
	for (const item of post.info.Channel.Item) {
		if (item.ImageURL) {
			console.log(`Fetching image: ${item.ImageURL}`);
			const imageBase64 = await fetchImageAsBase64(item.ImageURL);
			if (imageBase64) {
				doc.addImage(imageBase64, 'JPEG', 50, yPosition, 100, 60);
				yPosition += 60;
			} else {
				doc.text('Image not available', 50, yPosition);
				yPosition += 10;
			}
		}
		yPosition += 20;
		doc.text(`Item Title: ${item.Title}`, 10, yPosition);
		yPosition += 10;
		doc.text(`Item Link: ${item.Link}`, 10, yPosition);
		yPosition += 10;
		doc.text(`Published on: ${item.PubDate}`, 10, yPosition);
		yPosition += 10;
		doc.text(`Updated on: ${post.info.updated_at}`, 10, yPosition);
		yPosition += 10;
		doc.text('Description:', 10, yPosition);
		let itemDescriptionLines = doc.splitTextToSize(item.Description, 180);
		doc.text(itemDescriptionLines, 10, yPosition + 10);

		yPosition += 20 + itemDescriptionLines.length * 10;
	}
}

function convertToMarkdown(post) {
	let markdown = `# ${post.info.Channel.Title}\n\n`;
	markdown += `[Link](${post.info.Channel.Link})\n\n`;
	markdown += `${post.info.Channel.Description}\n\n`;

	post.info.Channel.Item.forEach((item) => {
		markdown += `## ${item.Title}\n\n`;
		if (item.ImageURL) {
			markdown += `![${item.Title}](${item.ImageURL})\n\n`;
		}
		markdown += `[Link](${item.Link})\n\n`;
		markdown += `Published on: ${item.PubDate}\n\n`;
		markdown += `${item.Description}\n\n`;
	});

	return markdown;
}
export { 
	setToast, 
	checkForHTMLTags, 
	toTitleCase, 
	buildFeedFollowUrl, 
	processUpdateData,
	getChangedFields,
	convertPostToPDFContent,
	convertToMarkdown
};
