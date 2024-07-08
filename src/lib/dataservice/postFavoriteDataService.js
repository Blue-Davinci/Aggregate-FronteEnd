
async function addFavoritePost(post_id, feed_id) {
	try {
		let url = '/api/postfollows';
		//console.log('Got: ', data);
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ post_id,feed_id })
		});
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			const errorData = await response.json();
			return errorData;
		}
	} catch (err) {
		console.log('sendData error: ', err);
	}
}

async function removeFavoritePost(post_id){
    try{
        let url = `/api/postfollows?id=${post_id}`;
        const response = await fetch(url, {
            method: 'DELETE'
        });
        if (response.ok){
            const data = await response.json();
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
    addFavoritePost,
    removeFavoritePost
}