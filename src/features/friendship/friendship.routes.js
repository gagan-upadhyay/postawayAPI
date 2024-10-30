import { Router } from "express";
import FriendShipController from "./friendship.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";



const friendShipRouter = Router();

const friendshipController = new FriendShipController();

friendShipRouter.get('/get-friends/:userId', (req, res)=>{
    friendshipController.getAllFriends(req, res);
});

friendShipRouter.get('/get-pending-requests',jwtAuth, (req, res)=>{
    friendshipController.getPendingRequests(req, res);
});

friendShipRouter.post('/toggle-friendship/:friendId', jwtAuth,(req, res)=>{
    friendshipController.toggleRequests(req, res);
});

friendShipRouter.post('/response-to-request/:friendId', jwtAuth, (req, res)=>{
    friendshipController.responseToRequest(req, res);
});



export default friendShipRouter;