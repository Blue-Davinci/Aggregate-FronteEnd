
async function getSampleRSSPostsForFeed(feedID){
    try{
        let url = `/api/sampleposts?feedID=${feedID}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok){
            const data = await response.json();
            console.log("Sample Data: ", data);
            return data;
        }else{
            const errorData = await response.json();
            return errorData;
        }
    }catch(err){
        console.log('sendData error: ', err);
    }
}

export{
    getSampleRSSPostsForFeed
}