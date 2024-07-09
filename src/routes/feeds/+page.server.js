import { error } from '@sveltejs/kit';
import {VITE_API_BASE_URL_FEEDS, VITE_API_BASE_URL_FEED_FOLLOW} from '$env/static/private';
import {checkAuthentication} from '$lib/utilities/auth.js';


// If a user isn't authenticated, we load all data from feeds
// otherwise we load all the data and also load followed feeds for the user with the api key
// after loading this data, for each feed, if the user follows the feed we add the boolean
// true e.g feed.id = xxxx, feed.followed = true
// that way, on the frontend we can also show whether a feed is followed or not
export const load = async ({ fetch, cookies }) => {
    let feed_url = `${VITE_API_BASE_URL_FEEDS}`;
    let auth = checkAuthentication(cookies).user;

    if (!auth) {
        return await getAllFeeds({ fetch }, feed_url);
    } else {
        let allfeeds = await getAllFeeds({ fetch }, feed_url);
        let followed = await getFeedFollows({ fetch }, auth);

        if (allfeeds.feeds && Array.isArray(allfeeds.feeds) && followed.feed_follows) {
            allfeeds.feeds = allfeeds.feeds.map(feed => {
                feed.isFollowed = followed.feed_follows.some(f => f.feed_id === feed.id);
                if (feed.isFollowed) {
                    const followedFeed = followed.feed_follows.find(f => f.feed_id === feed.id);
                    feed.follow_id = followedFeed.id; // we obtaine the ID tag in followed feed
                } else {
                    feed.follow_id = null; // otherwise set to null
                }
                return feed;
            });
        } else {
            console.log('Invalid data structure for allfeeds or followed feeds.');
        }

        return allfeeds;
    }
};

const getAllFeeds = async ({ fetch }, feed_url) => {
    const res = await fetch(feed_url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (res.ok) {
        return await res.json();
    } else {
        error(res.status, {
            title: 'Error loading Feeds',
            message: `Something happened and we Could not load any Feeds.`,
            info: "It's not you, it's us. Please try again later."
        });
    }
};

const getFeedFollows = async ({ fetch }, auth) => {
    const res = await fetch(`${VITE_API_BASE_URL_FEED_FOLLOW}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `ApiKey ${auth}`
        }
    });
    if (res.ok) {
        return await res.json();
    } else {
        error(res.status, {
            title: 'Error loading Feeds',
            message: `Something happened and we Could not load any Feeds.`,
            info: "It's not you, it's us. Please try again later."
        });
    }
};