"use server";

import db from "@/db/drizzle";
import { PostTable, UserTable } from "@/db/schema";
import { PostType } from "@/lib/types/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";


// GET ALL POSTS
export const getAllPosts = async () => {
    const data = await db.select({ "post": PostTable, "user": UserTable })
        .from(PostTable)
        .innerJoin(UserTable, eq(PostTable.creatorId, UserTable.userId));

    return data;
}

// CREATE A POST
export const createPost = async (postValues: PostType) => {
    await db.insert(PostTable).values(postValues)
    revalidatePath('/test')
}