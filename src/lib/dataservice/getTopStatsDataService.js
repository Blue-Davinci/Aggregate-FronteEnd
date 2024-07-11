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

export{
    getTopFavoriteFeeds
};