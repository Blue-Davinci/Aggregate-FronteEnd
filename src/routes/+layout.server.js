//load data from our hook up the chain
// we'll get the user event.local and
// propogate it to our files for credential
//settings.
// The result is a boolean value, either authed(true) or not(false)

export const load =  async({locals, url}) =>{
    let user = locals.user;
    let username = locals.username
    let userimage = locals.userimg;
    let metadata = defaultMetaData(url);
    let userRole = locals.isAdmin;
    console.log("[L.S.J] Root User:",user);
    return{
        props: {
            user,
            username,
            userimage,
            userRole,
            metadata
        }
    }
}; 

function defaultMetaData(url){
    const baseMetaTags = Object.freeze({
        title: 'Aggregate',
        titleTemplate: '%s ',
        description: 'Unify, Simplify, Aggregate!',
        canonical: new URL(url.pathname, url.origin).href,
        openGraph: {
          type: 'website',
          url: new URL(url.pathname, url.origin).href,
          locale: 'en_IE',
          title: 'Aggregate',
          description: 'Unify, Simplify, Aggregate!',
          siteName: 'Aggregate',
          images: [
            {
              url: 'https://i.ibb.co/WKxXnqw/agglogo.png',
              alt: 'Og Image Alt',
              width: 800,
              height: 600,
              secureUrl: 'https://i.ibb.co/WKxXnqw/agglogo.png',
              type: 'image/png'
            }
          ]
        }
      });

      return baseMetaTags;
}