
function saveSessionData(title, data){
    console.log("saving session data for: ", title);
    sessionStorage.setItem(title, JSON.stringify(data));
}

function clearSessionData(title){
    console.log("clearing session data for: ", title);
    sessionStorage.removeItem(title);
}

function getSessionPostData(dataItem){
    try {
        const savedFeed = sessionStorage.getItem(dataItem);
        if (savedFeed) {
            return JSON.parse(savedFeed);
        }
    } catch (err) {
        return {error: err};
    }
    return null; // Fallback: No valid data in session storage
}

export { saveSessionData, clearSessionData, getSessionPostData };