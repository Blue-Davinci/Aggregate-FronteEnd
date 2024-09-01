// getFeedSearchOptions() returns all feeds available and is displayed
// in our feeds combo box for filtering by feeds.
async function getFeedSearchOptions(){
    try{
        let url = '/api/feedsearchoptions';
        const response = await fetch(url,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok){
            let data = await response.json();
            return data;
        }else{
            let errorData = await response.json();
            return errorData;
        }
        
    }catch(err){
        console.log('Feed Search Option  sendData error: ', err);
    }
}

async function getFeedPrioritiesSearchOptions(){
    try{
        let url = '/api/feedprioritysearchoptions';
        const response = await fetch(url,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok){
            let data = await response.json();
            return data;
        }else{
            let errorData = await response.json();
            return errorData;
        }
        
    }catch(err){
        console.log('FeedPriority Search Option sendData error: ', err);
    }
}

async function getFeedTypesSearchOptions(){
    try{
        let url = '/api/feedtypesearchoptions';
        const response = await fetch(url,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok){
            let data = await response.json();
            return data;
        }else{
            let errorData = await response.json();
            return errorData;
        }
        
    }catch(err){
        console.log('FeedType Search Option sendData error: ', err);
    }
}

export{
    getFeedSearchOptions,
    getFeedTypesSearchOptions,
    getFeedPrioritiesSearchOptions
}