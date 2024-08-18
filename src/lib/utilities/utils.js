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
    if (params.feed_type) {
        queryParts.push(`feed_type=${encodeURIComponent(params.feed_type)}`);
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

function processPlanUpdateData(formData) {
    let updatedData = {
        id: formData.plan_id,
        name: formData.name,
        image: formData.image,
        description: formData.description,
        duration: formData.duration,
        price: formData.price,
        features: formData.formfeatures,
        status: formData.status
    };
    let originalData = {
        id: formData.plan_id,
        name: formData.original_name,
        image: formData.original_image,
        description: formData.original_description,
        duration: formData.original_duration,
        price: formData.original_price,
        features: formData.original_features,
        status: formData.original_status,
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
        if (Array.isArray(original[key]) && Array.isArray(updated[key])) {
            // Compare arrays by value
            if (!arraysEqual(original[key], updated[key])) {
                changes[key] = updated[key];
            }
        } else if (original[key] !== updated[key]) {
            changes[key] = updated[key];
        }
    }

    return changes;
}

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
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
    const margin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = margin + 20;

    // Function to add a border around the page
    function addPageBorder() {
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);
    }

    // Function to check and handle page overflow
    function checkPageOverflow(additionalHeight = 20) {
        if (yPosition + additionalHeight > pageHeight - margin) {
            doc.addPage();
            yPosition = margin;
            addPageBorder();
        }
    }

    // Add initial border
    addPageBorder();

    // Channel Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40);
    let titleLines = doc.splitTextToSize(post.info.Channel.Title, pageWidth - 2 * margin - 20);
    doc.text(titleLines, margin + 10, yPosition);
    yPosition += titleLines.length * 4 + 5;

    // Channel Link
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 255);
    let linkLines = doc.splitTextToSize(post.info.Channel.Link, pageWidth - 2 * margin - 20);
    doc.textWithLink(linkLines.join('\n'), margin + 10, yPosition, { url: post.info.Channel.Link });
    yPosition += linkLines.length * 4 + 5;

    // Description
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);
    doc.text("Description:", margin + 10, yPosition);
    yPosition += 10;
    doc.setFont("helvetica", "normal");
    let descriptionLines = doc.splitTextToSize(post.info.Channel.Description, pageWidth - 2 * margin - 20);
    doc.text(descriptionLines, margin + 10, yPosition);
    yPosition += descriptionLines.length * 4 + 5;

    // Iterate over items
    for (const item of post.info.Channel.Item) {
        checkPageOverflow(60); // Check if space is enough before adding new item

        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(40);
        let itemTitleLines = doc.splitTextToSize(`Item Title: ${item.Title}`, pageWidth - 2 * margin - 20);
        doc.text(itemTitleLines, margin + 10, yPosition);
        yPosition += itemTitleLines.length * 5 + 5;

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(0);
        let itemLinkLines = doc.splitTextToSize(item.Link, pageWidth - 2 * margin - 20);
        doc.textWithLink(itemLinkLines.join('\n'), margin + 10, yPosition, { url: item.Link });
        yPosition += itemLinkLines.length * 5 + 5;

        doc.text(`Published on: ${item.PubDate}`, margin + 10, yPosition);
        yPosition += 10;
        doc.text(`Updated on: ${post.info.updated_at}`, margin + 10, yPosition);
        yPosition += 10;

        if (item.ImageURL) {
            checkPageOverflow(70); // Check if space is enough for the image

            const imageBase64 = await fetchImageAsBase64(item.ImageURL);
            if (imageBase64) {
                doc.addImage(imageBase64, 'JPEG', margin + 10, yPosition, pageWidth - 2 * margin - 20, 60);
                yPosition += 60;
            } else {
                doc.text('Image not available', margin + 10, yPosition);
                yPosition += 10;
            }
        }

        yPosition += 10;
        doc.setFont("helvetica", "bold");
        doc.text('Description:', margin + 10, yPosition);
        yPosition += 10;
        doc.setFont("helvetica", "normal");
        let itemDescriptionLines = doc.splitTextToSize(item.Description, pageWidth - 2 * margin - 20);

        for (let i = 0; i < itemDescriptionLines.length; i++) {
            checkPageOverflow(10); // Check if space is enough for each line of the description
            doc.text(itemDescriptionLines[i], margin + 10, yPosition);
            yPosition += 10;
        }

        yPosition += 10;
        checkPageOverflow();
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

function isValidPermissionFormat(input) {
    // format permissionname:permission
    const regex = /^[a-zA-Z0-9]+:[a-zA-Z0-9]+$/;
    // Test the input against the regex
    return regex.test(input);
}
export { 
	setToast, 
	checkForHTMLTags, 
	toTitleCase, 
	buildFeedFollowUrl, 
	processUpdateData,
	getChangedFields,
	convertPostToPDFContent,
	convertToMarkdown,
    isValidPermissionFormat,
    processPlanUpdateData
};
