
// sendData() sends our info to the api endpoint
async function sendData(method, data){
    try{
        let url = "/api/feedfollows";
    console.log("Got: ", data);
    const response = await fetch (url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({feed_id: data})
    });
    if (response.ok){
        const data = await response.json();
        return data;
    }else{
        const errorData = await response.json();
        return errorData;
    }
    }catch(err){
        console.log("sendData error: ", err);
    }
}
export {sendData};