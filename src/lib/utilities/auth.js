import {z} from 'zod';

const tokenSchema = z
    .string({required_error: "A Token is required"})
    .min(26, {message: "A Valid Token is required"})
    .max(32, {message: "The Token is Invalid"})
    .refine(value => value.trim().length > 0, {message: "Token cannot be only whitespace"});


const emailSchema = z
.string({required_error: "Email is required"})
.min(1, {message: "Email is required"})
.max(64, {message: "Email must be less than 64 characters"}).
email({message: "Email must be a valid email address"});

const passwordSchema = z.object({
	password: z
	.string({required_error:"Passord is required"})
	.min(8, {message: "Password must be at least 8 characters"})
	.max(32, {message: "Password must be less than 32 characters"})
	.trim(),
})

const commentSchema = z.object({
    post_id: z
    .string({required_error: "Post ID is required"})
    .min(1, {message: "Post ID is required"})
    .trim(),
    parent_comment_id: z
    .string({required_error: "Parent Comment ID is required"})
    .min(1, {message: "Parent Comment ID is required"})
    .trim(),
    comment_text: z
    .string({required_error: "Comment is required"})
    .min(1, {message: "Comment is required"})
    .max(500, {message: "Comment must be less than 500 characters"})
    .trim(),
});
const registrationSchema = z.object({
	email: z
	.string({required_error: "Email is required"})
	.min(1, {message: "Email is required"})
	.max(64, {message: "Email must be less than 64 characters"}).
	email({message: "Email must be a valid email address"}),

	password: z
	.string({required_error:"Passord is required"})
	.min(8, {message: "Password must be at least 8 characters"})
	.max(32, {message: "Password must be less than 32 characters"})
	.trim(),
});

const signupSchema = z.object({
    name: z
    .string({required_error: "Your name is required"})
	.min(1, {message: "Your name is required"})
	.max(64, {message: "Email must be less than 64 characters"}),

	email: z
	.string({required_error: "Email is required"})
	.min(1, {message: "Email is required"})
	.max(64, {message: "Email must be less than 64 characters"}).
	email({message: "Email must be a valid email address"}),

	password: z
	.string({required_error:"Passord is required"})
	.min(8, {message: "Password must be at least 8 characters"})
	.max(32, {message: "Password must be less than 32 characters"})
	.trim(),

    confirmpassword : z
    .string({required_error:"Confirmation Passord is required"})
	.min(8, {message: "Confirmation Password must be at least 8 characters"})
	.max(32, {message: "Confirmation Password must be less than 32 characters"})
	.trim(),
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
    .string({required_error: "Post Name is required"})
    .min(1, {message: "Post Name is required"})
    .max(500, {message: "Post Name must be less than 500 characters"})
    .trim(),
    url: z
    .string({required_error: "Post URL is required"})
    .min(1, {message: "Post URL is required"})
    .trim(),
    img_url: z
    .string({required_error: "Post Image URL is required"})
    .min(1, {message: "Post Image URL is required"})
    .trim(),
    feed_type: z
    .string({required_error: "Post Type is required"})
    .min(1, {message: "Post Type is required"})
    .max(50, {message: "Post Type must be less than 50 characters"})
    .trim(),
    feed_description: z
    .string({required_error: "Post Description is required"})
    .min(1, {message: "Post Description is required"})
    .max(500, {message: "Post Description must be less than 500 characters"})
    .trim(),
    is_hidden: z
    .boolean({required_error: "Post Visibility is required"}),
});
    
function checkAuthentication(cookies){
    //we check if the user has a cookie;
    //if the user has a cookie and it's valid we return an object {status: true, user: user}
    //otherwise we return {status: false}
    let user = cookies.get('authtoken');
    let username = cookies.get('username');
    if (!user || user === null) {
        return {status: false};
    }else{   
        return {status: true, user: user, username: username};
    }
}
function saveAuthentication(cookies, apikey, email){
    try{
        // save a special auth cookie for the user
        cookies.set('authtoken', apikey.token, {
            path: '/',
            expires: new Date(apikey.expiry)
        });
        // save the user's name as a cookie too.
        // ToDo change this to original name!
        cookies.set('username', extractUsername(email), { // Corrected the placement of the closing parenthesis
            path: '/',
            expires: new Date(apikey.expiry)
        });
        return true;
    }catch(err){
        console.log("Error saving authentication: ", err);
        return false;
    }
}
// Simple function to extract the username from the email
function extractUsername(email){
    console.log("getting email: ", email);
    return email.split('@')[0];
}

// Delete authentication cookies
function deleteAuthentication(cookies){
    try{
        cookies.delete('authtoken', {path:'/'});
        cookies.delete('username',{path:'/'} );
        return true
    }catch(err){
        console.log("Error logging out", err);
        return false
    }
}

export {
    checkAuthentication,
    deleteAuthentication, 
    saveAuthentication, 
    tokenSchema, 
    passwordSchema, 
    registrationSchema,
    feedSchema,
    signupSchema,
    emailSchema,
    commentSchema
};