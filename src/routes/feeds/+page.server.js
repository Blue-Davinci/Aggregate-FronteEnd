import { error } from '@sveltejs/kit';
import {VITE_API_BASE_URL} from '$env/static/private';

export const load = async ({fetch}) => {
    let url = `${VITE_API_BASE_URL}/feeds`;
    const res = await fetch(`${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(res.ok){
        const data = await res.json();
        return data;
    }else{
        error(res.status, {
            title: "Error loading Feeds",
            message: `Something happened and we Could not load any Feeds.`,
            info: "it's not you, it's us. Please try again later."
        });
    }
}