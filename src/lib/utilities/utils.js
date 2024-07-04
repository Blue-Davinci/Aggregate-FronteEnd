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
export { setToast, checkForHTMLTags, toTitleCase };
