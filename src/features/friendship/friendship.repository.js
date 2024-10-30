import UserModel from "../users/user.schema.js";

export default class friendRepository{

    async getFriends(userID){
        try{
            const friends = await UserModel.findById(userID).populate('friends', 'name', 'email');
            console.log('Value of friends\n',friends);
            return friends;

        }catch(err){
            console.log("error from getFriends", err);
            return false;
        }
    }

    async getRequests(userID){
        try{
            const user = await UserModel.findById(userID).select('friendRequest');
            console.log("value of user from getRequets", user);

            const pendingRequests = user.friendRequests.filter(req=>req.status === 'pending');
            console.log("output of pendingrequests\n:", pendingRequests);
            return pendingRequests;

        }catch(err){
            console.log("error from getRequests", err);
            return false;
        }
    }

    async toggleRequest(userID, friendID){
        try{
            console.log("from toggleReq repo");
            const user = await UserModel.findById(userID);
            const isFriend = await user.friends.includes(friendID);

            if(isFriend){
                console.log('inside isFriend');
                user.friends = user.friends.filter(id=>id.toString()!==friendID);
            }else{
                user.friendRequest.push({userId:friendID, status:'pending'});
            }
            await user.save();
            return isFriend?'Friend Removed':'Friend Request sent';

        }catch(err){
            console.log("error from toggleRequest", err);
            return false;
        }
    }
        
    async responseToReq(userID, friendID, status){
        try{
            const user = await UserModel.findById(userID);
            const friendrequest = user.friendRequest.find(req=>req.userId.toString()===friendID);
            console.log(friendrequest);
            if(!friendrequest)
            return 'friend request not found';

            status = friendrequest.status;
            if(status==='accepted'){
                user.friends.push(friendID); //adding to friends
            }

            await user.save();
            return `request ${status}`;


        }catch(err){
            console.log("error from responseToReq", err);
            return false;
        }
    }
             
}