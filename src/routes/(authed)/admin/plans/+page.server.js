import { checkAuthentication } from '$lib/utilities/auth.js';
import { VITE_API_BASE_URL_ADMIN_PLANS } from '$env/static/private';
import { redirect, error, fail } from '@sveltejs/kit';
import { paymentPlanSchema } from '$lib/utilities/auth.js';
import {processPlanUpdateData, getChangedFields} from '$lib/utilities/utils.js';

export const load = async ({ fetch, cookies }) => {
	const auth = checkAuthentication(cookies).user;
	if (!auth) {
		return redirect(303, `/login?redirectTo=/admin/plans`);
	}
	const plans_url = `${VITE_API_BASE_URL_ADMIN_PLANS}`;
	try {
		let response = await fetch(plans_url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `ApiKey ${auth}`
			}
		});
		if (response.ok) {
			let data = await response.json();
			return data;
		} else {
			let errorData = await response.json();
			return {
				error: errorData.error,
				status: response.status
			};
		}
	} catch (err) {
		console.log('Error: ', err);
		error(500, {
			title: 'Error Loading Plans',
			message: `Something happened and we could not load any plans.`,
			info: "It's not you, it's us. Please try again later."
		});
	}
};

export const actions = {
	addplan: async ({ request, cookies }) => {
		const auth = checkAuthentication(cookies).user;
		if (!auth) {
			return redirect(303, `/login?redirectTo=/admin/plans`);
		}
		const plans_url = `${VITE_API_BASE_URL_ADMIN_PLANS}`;
		let newPlan = Object.fromEntries(await request.formData());
		console.log('Plans_Url: ', plans_url);
		// Convert price to a number
		if (newPlan.price) {
			newPlan.price = parseFloat(newPlan.price);
		}
		try {
			const result = paymentPlanSchema.parse(newPlan);
			console.log(result);
		} catch (err) {
			const fieldErrors = err.flatten();
			console.log('Field Errord: ', fieldErrors);
			return fail(400, {
				description: 'an error occurred while processing your request',
				error: fieldErrors.fieldErrors
			});
		}

		console.log('Plan data: ', newPlan);
		// Convert features to an array
		if (newPlan.features) {
			newPlan.features = newPlan.features.split(',').map((feature) => feature.trim());
		}
		try {
			let response = await fetch(`${plans_url}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `ApiKey ${auth}`
				},
				body: JSON.stringify(newPlan)
			});
			if (response.ok) {
				let data = await response.json();
				return data;
			} else {
				let errorData = await response.json();
				return {
					error: errorData.error,
					status: response.status
				};
			}
		} catch (err) {
			console.log('Error: ', err);
			return {
				description: 'an error occurred while processing your request',
				error: err.message
			};
		}
	},

	updatePlan: async ({ request,  cookies }) => {
		const auth = checkAuthentication(cookies).user;
		if (!auth) {
			return redirect(303, `/login?redirectTo=/admin/plans`);
		}
		const plans_url = `${VITE_API_BASE_URL_ADMIN_PLANS}`;
		let updatedPlan = Object.fromEntries(await request.formData());
		//process the data
		let processedData = processPlanUpdateData(updatedPlan);
		//get the changes
		let changes = getChangedFields(processedData.originalData, processedData.updatedData);
		console.log('Changes: ', changes);
		//if no changes then we complain
		if (Object.keys(changes).length === 0) {
			return fail(400, {
				description: 'an error occurred while processing your request',
				error: {
					fieldErrors: {
						name: ['No changes were detected in the data provided.']
					}
				}
			});
		}
		//if there were changes, let's run our schema validation but convert the price to
		// a number
		if (processedData.updatedData.price) {
			processedData.updatedData.price = parseFloat(processedData.updatedData.price);
		}
		// now validate the processed updated data
		try {
			const result = paymentPlanSchema.parse(processedData.updatedData);
			console.log("Passed verifivations: ", result);
		} catch (err) {
			const fieldErrors = err.flatten();
			console.log('Field Errors: ', fieldErrors);
			return fail(400, {
				description: 'an error occurred while processing your request',
				error: fieldErrors.fieldErrors
			});
		}
		// if the validated data is okay, we check if the chnages have a price
		// or features so they can be converted to the right format
		changes = dataConvertor(changes);

		// we are okay so, check if the id's are similar, if not then there's an issue somewhere
		if (processedData.originalData.id !== processedData.updatedData.id) {
			return fail(400, {
				description: 'an error occurred while processing your request',
				error: {
					fieldErrors: {
						name: ['The data provided does not match the expected values.']
					}
				}
			});
		}
		// get the id of the plan
		const planID = processedData.originalData.id;
		const url = `${plans_url}/${planID}`;
		try {
			let response = await fetch(url, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `ApiKey ${auth}`
				},
				body: JSON.stringify(changes)
			});
			if (response.ok) {
				let data = await response.json();
				return {
					status: 200,
					updatedPlan: data
				};
			} else {
				let errorData = await response.json();
				return {
					error: errorData.error,
					status: response.status
				};
			}
		} catch (err) {
			console.log('Error: ', err);
			return {
				description: 'an error occurred while processing your request',
				error: err.message
			};
		}
	}
};


function dataConvertor(data){
	if (data.price) {
		data.price = parseFloat(data.price);
	}
	if (data.features) {
		data.features = data.features.split(',').map((feature) => feature.trim());
	}
	return data;
}