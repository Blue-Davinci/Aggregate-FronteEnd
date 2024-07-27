import { z } from 'zod';
import {encrypt, decrypt} from '$lib/utilities/encryption.js';

const tokenSchema = z
	.string({ required_error: 'A Token is required' })
	.min(26, { message: 'A Valid Token is required' })
	.max(32, { message: 'The Token is Invalid' })
	.refine((value) => value.trim().length > 0, { message: 'Token cannot be only whitespace' });

const emailSchema = z
	.string({ required_error: 'Email is required' })
	.min(1, { message: 'Email is required' })
	.max(64, { message: 'Email must be less than 64 characters' })
	.email({ message: 'Email must be a valid email address' });

const passwordSchema = z.object({
	password: z
		.string({ required_error: 'Passord is required' })
		.min(8, { message: 'Password must be at least 8 characters' })
		.max(32, { message: 'Password must be less than 32 characters' })
		.trim()
});

const nameSchema = z
.string({ required_error: 'name is required' })
.min(3, { message: 'name too short, be more creative?' })
.max(32, { message: 'Password must be less than 32 characters' })
.trim()

const updateCommentSchema = z.object({
	id: z
		.string({ required_error: 'Comment ID is required' })
		.min(1, { message: 'Comment ID is required' })
		.trim(),
	comment_text: z
		.string({ required_error: 'Comment is required' })
		.min(1, { message: 'Comment is required' })
		.max(500, { message: 'Comment must be less than 500 characters' })
		.trim(),
	version: z
		.number({ required_error: 'Version is required' })
		.int({ message: 'Version must be an integer' })
		.min(1, { message: 'Version is not valid' })
});

const commentSchema = z.object({
	post_id: z
		.string({ required_error: 'Post ID is required' })
		.min(1, { message: 'Post ID is required' })
		.trim(),
	parent_comment_id: z
		.string({ required_error: 'Parent Comment ID is required' })
		.min(1, { message: 'Parent Comment ID is required' })
		.trim(),
	comment_text: z
		.string({ required_error: 'Comment is required' })
		.min(1, { message: 'Comment is required' })
		.max(500, { message: 'Comment must be less than 500 characters' })
		.trim()
});
const registrationSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.min(1, { message: 'Email is required' })
		.max(64, { message: 'Email must be less than 64 characters' })
		.email({ message: 'Email must be a valid email address' }),

	password: z
		.string({ required_error: 'Passord is required' })
		.min(8, { message: 'Password must be at least 8 characters' })
		.max(32, { message: 'Password must be less than 32 characters' })
		.trim()
});

const signupSchema = z
	.object({
		name: z
			.string({ required_error: 'Your name is required' })
			.min(1, { message: 'Your name is required' })
			.max(64, { message: 'Email must be less than 64 characters' }),

		email: z
			.string({ required_error: 'Email is required' })
			.min(1, { message: 'Email is required' })
			.max(64, { message: 'Email must be less than 64 characters' })
			.email({ message: 'Email must be a valid email address' }),

		password: z
			.string({ required_error: 'Passord is required' })
			.min(8, { message: 'Password must be at least 8 characters' })
			.max(32, { message: 'Password must be less than 32 characters' })
			.trim(),

		confirmpassword: z
			.string({ required_error: 'Confirmation Passord is required' })
			.min(8, { message: 'Confirmation Password must be at least 8 characters' })
			.max(32, { message: 'Confirmation Password must be less than 32 characters' })
			.trim()
	})
	.superRefine(({ confirmpassword, password }, ctx) => {
		if (confirmpassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must match',
				path: ['password']
			});
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must match',
				path: ['confirmpassword']
			});
		}
	});

const feedSchema = z.object({
	name: z
		.string({ required_error: 'Post Name is required' })
		.min(1, { message: 'Post Name is required' })
		.max(500, { message: 'Post Name must be less than 500 characters' })
		.trim(),
	url: z
		.string({ required_error: 'Post URL is required' })
		.min(1, { message: 'Post URL is required' })
		.trim(),
	img_url: z
		.string({ required_error: 'Post Image URL is required' })
		.min(1, { message: 'Post Image URL is required' })
		.trim(),
	feed_type: z
		.string({ required_error: 'Post Type is required' })
		.min(1, { message: 'Post Type is required' })
		.max(50, { message: 'Post Type must be less than 50 characters' })
		.trim(),
	feed_description: z
		.string({ required_error: 'Post Description is required' })
		.min(1, { message: 'Post Description is required' })
		.max(500, { message: 'Post Description must be less than 500 characters' })
		.trim(),
	is_hidden: z.boolean({ required_error: 'Post Visibility is required' })
});

function checkAuthentication(cookies) {
	//we check if the user has a cookie;
	//if the user has a cookie and it's valid we return an object {status: true, user: user}
	//otherwise we return {status: false}
	let user = cookies.get('authtoken');
    let authexpiry = cookies.get('authexpiry');
	// we return a parsed user object
	let userInfo = cookies.get('user');
	let parsedUserInfo = {};
	if (userInfo) {
		parsedUserInfo = JSON.parse(userInfo);
	}
	if (!user || user === null) {
		return { status: false };
	} else {
		return { status: true, user: decrypt(user), authexpiry:authexpiry, userinfo: parsedUserInfo };
	}
}

function updateAuthentication(cookies, key, value) {
	try {
		// we get our user info
		let cookieInfo = checkAuthentication(cookies);
		if (!cookieInfo) {
			return false;
		}
		let userInfo = cookieInfo.userinfo;
		console.log('Cookie info before Update: ', cookieInfo, 'Key: ', key, 'Value: ', value);
		let apikey = {token : cookieInfo.user, expiry : cookieInfo.authexpiry};
		if (Object.prototype.hasOwnProperty.call(userInfo, key)) {
			userInfo[key] = value;
			console.log('User Info before update: ', userInfo);
			// call saveAuthentication to save the updated user info
            // NOTE: we set the last parameter to true to indicate that we are updating the profile
			saveAuthentication(cookies, apikey, userInfo, true);
		}
		return true;
	} catch (err) {
		console.log('Error saving authentication: ', err);
		return false;
	}
}
// saveAuthentication() saves the user's authentication information to cookies
// we save the user's authentication token and the user's information to cookies
// This function also takes in an optional parameter isProfileUpdate which is set to false by default
// This parameter is used to determine if the user is updating their profile
// If they are, we skip the step for setting the apiKEY as it requires an expiry date
function saveAuthentication(cookies, apikey, user, isProfileUpdate = false) {
    //console.log("Profile Update Status: ",apikey, user, isProfileUpdate);
	try {
		if (!user) {
			return false;
		}
		// save a special auth cookie for the user
        // we check if the user is updating their profile, if so we skip this step
		if (!isProfileUpdate) {
			cookies.set('authtoken', encrypt(apikey.token), {
				path: '/',
				expires: new Date(apikey.expiry)
			});

            cookies.set('authexpiry', apikey.expiry, {
                path: '/',
				expires: new Date(apikey.expiry)
        })
		}
		// we serialize the user object and save it as a cookie
		let serializedUser = JSON.stringify(user);
		// save the user's name as a cookie too.
		// ToDo change this to original name!
		cookies.set('user', serializedUser, {
			// Corrected the placement of the closing parenthesis
			path: '/',
			expires: new Date(apikey.expiry)
		});
		return true;
	} catch (err) {
		console.log('Error saving authentication: ', err);
		return false;
	}
}
/* / Simple function to extract the username from the email
function extractUsername(email){
    console.log("getting email: ", email);
    return email.split('@')[0];
}
*/
// Delete authentication cookies
function deleteAuthentication(cookies) {
	try {
		cookies.delete('authtoken', { path: '/' });
		cookies.delete('username', { path: '/' });
		return true;
	} catch (err) {
		console.log('Error logging out', err);
		return false;
	}
}

export {
	checkAuthentication,
	deleteAuthentication,
	saveAuthentication,
	updateAuthentication,
	tokenSchema,
	passwordSchema,
	registrationSchema,
	feedSchema,
	signupSchema,
	emailSchema,
	updateCommentSchema,
	commentSchema,
	nameSchema
};
