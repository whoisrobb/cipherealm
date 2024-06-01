import express, { Request, Response } from "express";
const router = express.Router();
import { deleteAll, deleteUser, getAllUsers, getUserByEmail, getUserByUsername, saveOrUpdateUser } from "../controllers/user";
import { createNewPost, getAllPosts } from "../controllers/post";


router.get('/', async (req: Request, res: Response) => {
    res.status(200).json({ msg: 'working' })
})

// GET ALL USERS
router.get('/users', getAllUsers);

// GET USER BY USERNAME
router.get('/users:username', getUserByUsername);

// GET USER BY EMAIL
router.get('/users/:email', getUserByEmail);

// CREATE OR UPDATE USER
router.post('/users/save', saveOrUpdateUser);

// GET ALL POSTS
router.get('/posts', getAllPosts);

// CREATE A NEW POST
router.post('/posts/save', createNewPost);

// DELETE ALL USERS FOR SOME REASON
router.delete('/users', deleteAll);

// DELETE USER FOR SOME REASON
router.delete('/users/:username', deleteUser);


export default router;