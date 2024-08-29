
const adminUpdateFeed = async (feedId, feedData) => {
    if (!feedId) {
        return {
            success: false,
            status: 400,
            error: "Invalid Feed ID"
        };
    }
    let feed_url = `/api/adminfeeds?id=${feedId}`;
    try {
        let response = await fetch(feed_url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedData)
        });
        if (response.ok) {
            return {
                success: true,
                status: response.status,
                data: await response.json(),
            };
        } else {
            let errorData = await response.json();
            return {
                success: false,
                status: response.status,
                error: errorData.error
            }
        }
    } catch (err) {
        return {
            success: false,
            status: 500,
            error: { message: err.message }
        }
    }
}

export {
    adminUpdateFeed
}