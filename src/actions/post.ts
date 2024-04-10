"use server";

import db from "@/db/drizzle";
import { post } from "@/db/schema";


// GET ALL POSTS
export const getAllPosts = async () => {
    const result = await db.select().from(post)
    return result;
}

// CREATE NEW POST
export const createPost = async () => {

}