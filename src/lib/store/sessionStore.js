
function saveSessionData(title, data){
    sessionStorage.setItem(title, JSON.stringify(data));
}

function clearSessionData(title){
    sessionStorage.removeItem(title);
}

function getSessionPostData(){
    try {
        const savedFeed = sessionStorage.getItem('rssFeed');
        if (savedFeed) {
            return JSON.parse(savedFeed);
        }
    } catch (err) {
        return {error: err};
    }
    return null; // Fallback: No valid data in session storage
}

export { saveSessionData, clearSessionData, getSessionPostData };