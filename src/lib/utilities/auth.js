import {z} from 'zod';

const tokenSchema = z
    .string({required_error: "A Token is required"})
    .min(26, {message: "A Valid Token is required"})
    .max(30, {message: "The Token is Invalid"})
    .refine(value => value.trim().length > 0, {message: "Token cannot be only whitespace"});

const passwordSchema = z
.string({required_error: "A Password is required"})
.min(1, {message: "A Valid Password is required"})
.max(30, {message: "The Password is Invalid"})

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
    
function checkAuthentication(cookies){
    //we check if the user has a cookie;
    //if the user has a cookie and it's valid we return an object {status: true, user: user}
    //otherwise we return {status: false}
    let user = cookies.get('authtoken');
    if (!user || user === null) {
        return {status: false};
    }else{   
        return {status: true, user: user};
    }
}
function saveAuthentication(cookies, apikey){
    try{
        cookies.set('authtoken', apikey.token, {
            path: '/',
            expires: new Date(apikey.expiry)
        });
        return true;
    }catch(err){
        console.log("Error saving authentication: ", err);
        return false
    }

}
function deleteAuthentication(cookies){
    try{
        cookies.delete('authtoken', {path:'/'});
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
    registrationSchema
};