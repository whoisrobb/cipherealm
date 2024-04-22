"use server";

import db from "@/db/drizzle";
import { UserTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

type SavedUser = {
    // clerkId: string;
    username: string;
    email: string;
    avatar: string | null;
}

// CREATE NEW USER
export const saveOrUpdateUser = async (userData: SavedUser) => {
    try {
        const { email } = userData;

        const user = await db.select()
            .from(UserTable)
            .where(eq(UserTable.email, email))

        if (user.length > 0) {
            await db.update(UserTable)
                .set(userData)
                .where(eq(UserTable.email, email))
        } else {
            await db.insert(UserTable)
                .values(userData)
        }

        const savedUser = await db.select()
            .from(UserTable)
            .where(eq(UserTable.email, email))
        
        return savedUser;
    } catch (err) {
        console.error(err)
    }
}

// GET ALL USERS
export const getAllUsers = async () => {
    return db.select().from(UserTable)
}