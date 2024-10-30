import PostModel from "../posts/posts.schema.js";
import commentModel from "./comments.schema.js";



export default class CommentRepository{
    async getComments(postId){
        try{
            const result = await commentModel.find({post:postId});
            if(!result){
                return false;
            }
            return result;
        }catch(err){
            console.log("Error from getcomments\n", err);
            return err
        }
    }
    async addComment(postId, userID, comment){
        try{
            console.log("postId:\n",postId);
            // console.log("Value if PostID:",postId+"\n"+"Value of userID:",userID+"\n"+"Value of comment:", comment);
            const newComment = new commentModel({comment:comment, createdBy:userID, post:postId});
            await newComment.save();
            
            //adding comments counts
            await PostModel.findByIdAndUpdate(
                postId, 
                {$inc:{commentCount:1}},
                {commentedBy:userID},
                {new:true}
            );
            return newComment
        }catch(err){
            console.log("Error from getcomments\n", err);
            return err
        }
    }

    async delComment(commentId, userID, postId){
        try{
            console.log("PostId:\n",postId);
            //added a feature to check if the comment is made by the user who is deleting it.
            const comment = await commentModel.findById(commentId);
            if(!comment){
                return {message:"Comment is not present anymore!!"};
            }
            if((comment.createdBy).toString() === (userID)){
                await commentModel.findByIdAndDelete(commentId);
                const result = await PostModel.findByIdAndUpdate(
                    postId,
                    {$inc:{commentCount:-1}},
                    {new:true}
                ); 
                console.log("Value of result from delComment", result);
                return "Comment deleted";
            }else{
                return {message:"Not authorised"}
            }

        }catch(err){
            console.log("Error from getcomments\n", err);
            return err
        }
    }
}