
// deleteScraperErrorLog - Function to delete a specific error log entry from the database
const deleteScraperErrorLog = async (id) => {
    if (!id) {
        return {
            success: false,
            status: 400,
            error: "Invalid Error ID"
        };
    }
    let clearerror_url = `/api/scrapererrors?id=${id}`;
    try {
        let response = await fetch(clearerror_url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
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
    deleteScraperErrorLog
}