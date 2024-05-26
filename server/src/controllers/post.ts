import { Request, Response } from "express"
import { PostTable, UserTable } from "../db/schema";
import { eq } from "drizzle-orm";
import db from "../db";


// GET ALL POSTS
export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const data = await db.select({ "post": PostTable, "user": UserTable })
            .from(PostTable)
            .innerJoin(UserTable, eq(PostTable.creatorId, UserTable.userId));

        res.status(200).json(data);
    return data;
    } catch (err) {
        res.status(500).json(err)
    }
};

// CREATE A POST
export const createNewPost = async (req: Request, res: Response) => {
    try {
        const { postValues } = req.body;
        console.log(postValues)
        // await db.insert(PostTable).values(postValues)

    } catch (err) {
        res.status(500).json(err);
    }
}