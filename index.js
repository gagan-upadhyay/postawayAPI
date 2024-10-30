// importing express' modules:

import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// import cors from 'cors';

// importing custom packages:
// --------------------------------
import { connectUsingMongoose } from './src/config/mongoose.js';


import userRouter from './src/features/users/user.routes.js';
import postRouter from './src/features/posts/posts.routes.js';
import likeRouter from './src/features/likes/likes.routes.js';
import commentRouter from './src/features/comments/comments.routes.js';
import friendShipRouter from './src/features/friendship/friendship.routes.js';
import otpRouter from './src/features/otp/otp.routes.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
// import jwtAuth from './src/middlewares/jwt.middleware.js';

// --------------------------------
dotenv.config();
const server = express();
server.use(express.json());

server.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false},
}));

server.use(cookieParser());
// server.use(express.urlencoded({extended:true}));

// routes
server.get('/', (req, res)=>{
    res.send("Welcome to the API for postaway");
});

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);
server.use('/api/likes', likeRouter);
server.use('/api/comments', commentRouter);
server.use('/api/friends', friendShipRouter);
server.use('/api/otp', otpRouter)

server.post('/api/test-body',jwtAuth, (req, res) => {
    console.log("Test route req.body:", req.body);
    res.send(req.body);
});



// Specifying ports:
server.listen(3000, ()=>{
    console.log("server is running on port 3000");
    connectUsingMongoose();
});