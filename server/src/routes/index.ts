import express from "express";
const router = express.Router();
import { deleteAll, getAllUsers, getUserByUsername, saveOrUpdateUser } from "../controllers/user";
import { createNewPost, getAllPosts } from "../controllers/post";


// GET ALL USERS
router.get('/users', getAllUsers);

// GET USER BY USERNAME
router.get('/users:username', getUserByUsername);

// CREATE OR UPDATE USER
router.post('/users/save', saveOrUpdateUser);

// GET ALL POSTS
router.get('/posts', getAllPosts);

// CREATE A NEW POST
router.post('/posts/save', createNewPost);

// DELETE ALL USERS FOR SOME REASON
router.delete('/users', deleteAll);


export default router;