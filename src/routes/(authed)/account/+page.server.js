import { v2 as cloudinary } from 'cloudinary';
import { redirect } from '@sveltejs/kit';
import { checkAuthentication, updateAuthentication, nameSchema } from '$lib/utilities/auth.js';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '$env/static/private';
import { fail } from '@sveltejs/kit';
import { updateUserInformation } from '$lib/dataservice/userAccountDataService.js';
// Configure Cloudinary
cloudinary.config({
	cloud_name: 'djg9a13ka',
	api_key: `${CLOUDINARY_API_KEY}`,
	api_secret: `${CLOUDINARY_API_SECRET}`
});

export const actions = {
	username: async ({ request, fetch, cookies }) => {
		console.log('updating username');
		let auth = checkAuthentication(cookies).user;
		if (!auth) {
			return redirect(303, `/login?redirectTo=/account`);
		}
		let updateInfo = await request.formData();
		// perform validation
		// get the new name and the old name
		let newName = updateInfo.get('newname');
		let oldName = updateInfo.get('currentname');
		console.log('New and old names: ', newName, oldName);
		try {
			nameSchema.parse(newName);
		} catch (err) {
			const fieldErrors = err.flatten();
			console.log('Error: ', fieldErrors);

			return fail(400, {
				description: 'an error occurred while processing your request',
				error: {
					newname: fieldErrors.formErrors
				}
			});
		}
		// check if the new name is the same as the old name
		if (oldName === newName) {
			return fail(500, {
				error: {
					newname: ['please provide a new name']
				}
			});
		}
		// send the new name to the endpoint
		let result = await updateUserInformation(fetch, { name: newName }, auth);
		console.log('Success, result: ', result);
		if (!result.error) {
			// if no error then we proceed to save the new object
			let result = updateAuthentication(cookies, 'name', newName);
			if (!result) {
				console.log('Error updating cookie');
				return fail(500, {
					error: {
						name: ['an error occurred while processing your request']
					}
				});
			}
			return result;
		} else {
			return fail(500, {
				error: {
					name: ['an error occurred while processing your request']
				}
			});
		}
	},

	upload: async ({ request, fetch, cookies }) => {
		let auth = checkAuthentication(cookies).user;
		if (!auth) {
			return redirect(303, `/login?redirectTo=/account`);
		}
		const data = await request.formData();
		const file = data.get('file');
		console.log('File: ', file);
		if (file.size === 0) {
			console.log('Not a file');
			return fail(400, {
				error: {
					file: ['please provide a valid image']
				}
			});
		}

		// Convert file to Base64
		const fileArrayBuffer = await file.arrayBuffer();
		const base64 = `data:${file.type};base64,${Buffer.from(fileArrayBuffer).toString('base64')}`;

		try {
			// Upload the Base64 string to Cloudinary
			const uploadResult = await cloudinary.uploader.upload(base64, {
				resource_type: 'auto', // Automatically detect the resource type
				folder: 'avatars',
				public_id: `avatar_${Date.now()}`
			});
			let imageURL = uploadResult.secure_url;
			console.log('ImageURL: ', imageURL);
			// we get the data from our update info
			let result = await updateUserInformation(fetch, { img_url: imageURL }, auth);
			if (!result.error) {
				// if no error then we proceed to save the new object
				let result = updateAuthentication(cookies, 'user_img', imageURL);
				if (!result) {
					console.log('Error updating cookie');
					return fail(500, {
						error: {
							file: ['an error occurred while processing your request']
						}
					});
				}
				return {
					status: 200,
					data: {
						avatarUrl: imageURL
					}
				};
			} else {
				console.log('Error updating user info');
				return fail(500, {
					error: {
						file: ['an error occurred while processing your request']
					}
				});
			}
		} catch (err) {
			console.log('Avatar Upload Error: ', err);
			return fail(500, {
				error: {
					file: ['an error occurred while processing your request']
				}
			});
		}
	}
};
