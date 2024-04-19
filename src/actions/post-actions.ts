"use server";

import db from "@/db/drizzle";
import { PostTable } from "@/db/schema";
import { PostType } from "@/lib/types/types";
import { revalidatePath } from "next/cache";


// GET ALL POSTS
export const getAllPosts = async () => {
    const data = await db.select().from(PostTable);
    return data;
}

// CREATE A POST
export const createPost = async (postValues: PostType) => {
    await db.insert(PostTable).values(postValues)
    revalidatePath('/test')
}