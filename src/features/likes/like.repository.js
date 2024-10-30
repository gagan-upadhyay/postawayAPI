import LikeModel from './like.schema.js'
import PostModel from "../posts/posts.schema.js";

export default class LikeRepository{
    async toggleLike(itemID, userID){
        try{
            console.log("Value of userID, itemID ", userID, itemID);
            const postItem = await PostModel.findOne({_id:itemID});
            if(postItem){ //checking if the id provided is from post
                const likeItem={item:"Posts", itemId:itemID, likedBy:userID}
                const result = await LikeModel.findOne(likeItem); //check if the item is already liked
                
                if(result){
                    console.log("Value of result:\n",result);
                    await LikeModel.findOneAndDelete(likeItem);

                    const updateLike = await PostModel.findByIdAndUpdate(
                        itemID, 
                        {$inc:{likeCount:-1}},
                        {new:true}
                    );
                    console.log("Value of updated Like", updateLike);
                    return result
                    
                }else{
                    //if item is not liked by logged in user:
                const newLike = new LikeModel(likeItem);
                const newLiked = await newLike.save();
                console.log("Value of newLiked", newLiked);

                await PostModel.findByIdAndUpdate(
                    itemID, 
                    {$inc:{likeCount:1}},
                    {new:true}
                );
                
                return newLiked;
                }
                
            }
            
        }catch(err){
            console.log("Error at likeRepo: toggleLike", err);
            return "Internal server error";
        }
    }
    async getAllLikes(id){
        try{
            
            const result = await PostModel.findById(id).select('likeCount');
            console.log("Value of result form getAllLikes \n",result);
            if(!result){
                return false;
            }
            return {likes:result.likeCount}
        }catch(err){
            console.log("Error at likeRepo: getAllLike", err);
            return "Internal server error";
        }
    }
}