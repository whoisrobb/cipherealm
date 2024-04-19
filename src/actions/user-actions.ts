"use server";

import db from "@/db/drizzle";
import { User, UserTable } from "@/db/schema";
import { toast } from "sonner";

type SavedUser = {
    userId: string;
    username: string;
    avatar: string | null;
}

// CREATE NEW USER
export const saveUser = async (userData: SavedUser) => {
    await db.insert(UserTable).values(userData)
    toast(`Welcome ${userData.username}`)
}

// GET ALL USERS
export const getAllUsers = async () => {
    return db.select().from(UserTable)
}