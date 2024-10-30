import express from 'express';
import jwtAuth from '../../middlewares/jwt.middleware.js';
import LikeController from './like.controller.js';

const likeRouter = express.Router(); 
const likeController = new LikeController();


likeRouter.get('/:id', (req, res)=>{
    likeController.getAllLikes(req, res)
});

likeRouter.post('/toggle/:id', jwtAuth,(req, res)=>{
    likeController.toggleLike(req, res)
});

export default likeRouter;