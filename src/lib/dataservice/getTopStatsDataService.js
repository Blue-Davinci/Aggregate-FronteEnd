// This function is the link between us and the backend API 
// and will return the contents of our Top 5 feeds.

async function getTopFavoriteFeeds(){
    try{
        let url = '/api/topfeeds';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok){
            const data = await response.json();
            return data;
        }else{
            const errorData = await response.json();
            return errorData;
        }
    }catch(err){
        console.log("Error while getting Top Feeds: ", err);
    }
}

// This function is the link between us and the backend API
// and will return the contents of our Top 5 creators. The top
// creators are gathered by the amount of users who follow the feeds 
// they have created.
async function getTopFeedCreators(){
    try{
        let url = '/api/topcreators';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok){
            const data = await response.json();
            //console.log("Recieved data: ", data);
            return data;
        }else{
            const errorData = await response.json();
            return errorData;
        }
    }catch(err){
        console.log("Error while getting Top Feeds: ", err);
    }
}

export{
    getTopFavoriteFeeds,
    getTopFeedCreators
};