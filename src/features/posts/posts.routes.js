import express from 'express';
import jwtAuth from '../../middlewares/jwt.middleware.js';
import PostController from './posts.controller.js';


const postRouter = express.Router();

const postController = new PostController();

//fetch all posts to create feed
postRouter.get('/all', (req, res)=>{
    console.log("Value of req.body.userID", req.body.userID);
    postController.getAllFeed(req, res);
});
//retrieve a specific post by postId
postRouter.get('/:postId', (req, res)=>{
    postController.getPostbyID(req, res);
});

//Retrieve all posts for a specific user to display on their profile page.
postRouter.get('/user/:userId', jwtAuth, (req, res)=>{
    postController.getUserPosts(req, res);
});

//Create a new post
postRouter.post('/', jwtAuth, (req, res)=>{
    console.log("Value of req.body.userID", req.body.userID);
    postController.addPost(req, res);
});

postRouter.delete('/:postId', jwtAuth,(req, res)=>{
    postController.deletePost(req, res);
});

postRouter.put('/:postId',jwtAuth, (req, res)=>{
    postController.updatePost(req, res);
});

export default postRouter;