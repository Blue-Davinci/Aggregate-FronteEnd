
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
        console.log('sendData error: ', err);
    }
}

export{
    getFeedSearchOptions
}