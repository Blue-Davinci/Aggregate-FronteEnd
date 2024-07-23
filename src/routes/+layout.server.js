//load data from our hook up the chain
// we'll get the user event.local and
// propogate it to our files for credential
//settings.
// The result is a boolean value, either authed(true) or not(false)

export const load =  async({locals}) =>{
    let user = locals.user;
    let username = locals.username
    let userimage = locals.userimg;
    console.log("[L.S.J] Root User:",user);
    return{
        props: {
            user,
            username,
            userimage
        }
    }
}; 