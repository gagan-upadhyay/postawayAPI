import express from 'express';
import jwtAuth from '../../middlewares/jwt.middleware.js';
import UserController from './user.controller.js';



const userRouter = express.Router();

const userController = new UserController();


userRouter.post('/signup', (req, res)=>{
    userController.signUp(req, res);
});

userRouter.post('/signin', (req, res)=>{
    userController.signIn(req, res);
});

userRouter.put('/resetpassword', jwtAuth,(req, res)=>{
    userController.resetPassword(req, res);
});

userRouter.get('/get-details/:userId', jwtAuth, (req, res)=>{
    userController.getUserDetails(req, res);
});

userRouter.get('/get-all-details', jwtAuth, (req, res)=>{
    userController.getAllDetails(req, res);
});

userRouter.get('/update-details/:userId', jwtAuth, (req, res)=>{
    userController.updateUserDetails(req, res);
});

userRouter.post('/logout', jwtAuth, (req, res)=>{
    userController.logout(req, res)
});

userRouter.post('/logout-all-devices', jwtAuth, (req, res)=>{
    userController.logoutAllDevices(req, res)
});


export default userRouter;