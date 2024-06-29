import { error } from '@sveltejs/kit';
import {VITE_API_BASE_URL_FEEDS} from '$env/static/private';

export const load = async ({fetch}) => {
    let feed_url = `${VITE_API_BASE_URL_FEEDS}`;
    const res = await fetch(`${feed_url}`, {
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