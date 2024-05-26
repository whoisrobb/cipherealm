import { eq } from "drizzle-orm";
import db from "../db";
import { UserTable } from "../db/schema";
import { Request, Response } from "express";


// GET ALL USERS
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await db.select().from(UserTable);
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err)
    }
};

// CREATE OR UPDATE USER
export const saveOrUpdateUser = async (req: Request, res: Response) => {
    try {
        const { username, email, avatar } = req.body;

        const user = await db.select()
            .from(UserTable)
            .where(eq(UserTable.email, email))

        if (user.length > 0) {
            await db.update(UserTable)
                .set({
                    username: username,
                    email: email,
                    avatar: avatar
                })
                .where(eq(UserTable.email, email))
        } else {
            await db.insert(UserTable)
                .values({
                    username: username,
                    email: email,
                    avatar: avatar
                })
        }

        const savedUser = await db.select()
            .from(UserTable)
            .where(eq(UserTable.email, email))
        
        res.status(201).json(savedUser);

    } catch (err) {
        res.status(500).json({ message: err })
    }
};

// GET USER BY USERNAME
export const getUserByUsername = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;
        const user = await db.select()
            .from(UserTable)
            .where(eq(UserTable.username, username))

        return user;
    } catch (err) {
        res.status(500).json(err);
    }
};

export const deleteAll = async (req: Request, res: Response) => {
    await db.delete(UserTable)
    res.status(200).json({ message: 'Deleted' })
}

export const deleteUser = async (req: Request, res: Response) => {
    const { username } = req.params;
    await db.delete(UserTable).where(eq(UserTable.username, username))
    res.status(200).json({ message: 'Deleted' })
}