import { Router } from "express";
import CommentController from "./comments.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";

const commentRouter = Router();
const commentController = new CommentController();




commentRouter.get('/:postId', (req, res)=>{
    commentController.getComment(req, res)
});

commentRouter.post('/:postId', jwtAuth,(req, res)=>{
    commentController.postComment(req, res)    
});

commentRouter.delete('/:commentId',jwtAuth, (req, res)=>{
    commentController.delComment(req, res) 
});
commentRouter.put('/:commentId', jwtAuth,(req, res)=>{
    commentController.editComment(req, res)
});

export default commentRouter;