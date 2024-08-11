import {VITE_API_BASE_URL_SUBSCRIPTIONS, VITE_API_BASE_URL_SUBSCRIPTIONS_INITIALIZE} from '$env/static/private';
import { json } from '@sveltejs/kit';
import { checkAuthentication } from '$lib/utilities/auth.js';
import {redirect} from '@sveltejs/kit';


export const POST = async ({ cookies, request }) => {
    let init_subscription_url = VITE_API_BASE_URL_SUBSCRIPTIONS_INITIALIZE;
    let {plan_id, amount} = await request.json();
    // prepare the callback url appending the plan_id
    let callback_url = `https://adapted-healthy-monitor.ngrok-free.app/subscription/verify?plan_id=${plan_id}`;
    let auth = checkAuthentication(cookies).user;
    if (!auth) {
        return redirect('/login?redirect=/subscription');
    }
    try{
        let response = await fetch(init_subscription_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `ApiKey ${auth}`
            },
            body: JSON.stringify({plan_id, amount, callback_url})
        });
        if (response.ok){
            let data = await response.json();
            return json(data);
        }else{
            let errorData = await response.json();
            return json({error: errorData.error}, {status: response.status});
        }
    }catch(err){
        console.log("End Point Error: ", err);
    }

}

export const PATCH = async ({ cookies, request }) => {
    let subscription_url = VITE_API_BASE_URL_SUBSCRIPTIONS;
    let {subscription_id} = await request.json();
    let status = "cancelled"
    let auth = checkAuthentication(cookies).user;
    if (!auth) {
        return redirect('/login?redirect=/transactionhistory');
    }
    try{
        let response = await fetch(subscription_url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `ApiKey ${auth}`
            },
            body: JSON.stringify({subscription_id, status})
        });
        if (response.ok){
            let data = await response.json();
            return json(data);
        }else{
            let errorData = await response.json();
            return json({error: errorData.error}, {status: response.status});
        }
    }catch(err){
        console.log("End Point Error: ", err);
    }
}