"use server";

import { PostType } from "@/lib/types/types";
import { serverUrl } from "@/lib/utils/utils";


// GET ALL POSTS
export const getAllPosts = async () => {
    try {
        const response = await fetch(`${serverUrl}/posts`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err)
    }
};

// CREATE A POST
export const createPost = async (postValues: PostType) => {
    try {
        const response = await fetch(`${serverUrl}/posts/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postValues)
        })
        if (response.ok) {
            // TODO: Add a posts revalidation function
        }
    } catch (err) {
        console.error(err);
    }
};