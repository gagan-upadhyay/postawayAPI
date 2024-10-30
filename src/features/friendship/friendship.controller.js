import friendRepository from "./friendship.repository.js";

export default class FriendShipController{
    constructor(){
        this.friendRepository= new friendRepository();
    }

    async getAllFriends(req, res){
        try{
            const result = await this.friendRepository.getFriends(req.params.userId);

            if(!result){
                return res.status(404).send("No Friends, Add Firends")
            }
            return res.status(200).send(result);

        }catch(err){
            console.log("error from getAllFriends", err);
            return res.status(500).send("Internal server error");
        }
    }

    async getPendingRequests(req, res){
        try{
            console.log('Value of user logged in :\n', req.body.userID);
            const result = await this.friendRepository.getRequests(req.body.userID);
            if(!result){
                return res.status(204).send("No pending requests");
            }
            return res.status(200).send(result);
        }catch(err){
            console.log("error from getPendingRequests", err);
            return res.status(500).send("Internal server error");
        }
    }

    async toggleRequests(req, res){
        try{
            const {friendId} = req.params;
            console.log('Value of friendId and userID',friendId, req.body.userID);
            const result = await this.friendRepository.toggleRequest(req.body.userID, friendId);

            return res.status(200).send(`${result}!`); //either print accepted or removed

        }catch(err){
            console.log("error from toggleRequests", err);
            return res.status(500).send("Internal server error");
        }
    }

    async responseToRequest(req, res){
        try{
            const {friendId} = req.params;
            const result = await this.friendRepository.responseToReq(req.body.userID, friendId, req.body.status);

            return res.status(200).send(result); //either print accepted or removed

        }catch(err){
            console.log("error from responseToRequest", err);
            return res.status(500).send("Internal server error");
        }
    }


}