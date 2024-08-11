
// This file contains the functions that are used to interact with the backend for subscription related operations

// initializeSubscription() is the dataservice responsible in communicating
// with our api endpoint to facilitate the initialization of a subscription
// we pass the plan_id and the amount to be charged.
// the backend re-verifies this data.
const initializeSubscription = async (plan_id, amount) => {
    if(!plan_id || !amount){
        return {
            success: false,
            status: 400,
            error: {message: "Invalid Subscription Data"}
        }
    }
    let url = `/api/subscription`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({plan_id, amount})
    });
    if (!response.ok) {
        let data = await response.json();
        return {
            success: false,
            status: response.status,
            error: data.error
        }
    }
    return {
        success: true,
        status: response.status,
        data: await response.json(),
    };
}

const getChallengedTransaction = async () => {
    let url = `/api/challengedsubscriptions`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        let data = await response.json();
        return {
            success: false,
            status: response.status,
            error: data.error
        }
    }
    return {
        success: true,
        status: response.status,
        data: await response.json(),
    };
}

const cancelSubscription = async (subscription_id) => {
    let url = `/api/subscription`;
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({subscription_id})
    });
    if (!response.ok) {
        let data = await response.json();
        return {
            success: false,
            status: response.status,
            error: data.error
        }
    }
    return {
        success: true,
        status: response.status,
        data: await response.json(),
    };
}

const cancelChallengedTransaction = async (challenged_transaction_id) => {
    let url = `/api/challengedsubscriptions`;
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({challenged_transaction_id})
    });
    if (!response.ok) {
        let data = await response.json();
        return {
            success: false,
            status: response.status,
            error: data.error
        }
    }
    return {
        success: true,
        status: response.status,
        data: await response.json(),
    };
}

export {
    initializeSubscription,
    getChallengedTransaction,
    cancelSubscription,
    cancelChallengedTransaction
}