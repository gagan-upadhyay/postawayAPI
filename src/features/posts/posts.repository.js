import UserModel from "../users/user.schema.js";
import PostModel from "./posts.schema.js";


export default class PostRepository{
    
    async allFeed(){
        try{
            const feed = await PostModel.find();
            console.log(feed);
            return feed;

        }catch(err){
            console.log("Error from postRepo all fn. :\n", err);
        }
    }

    async getUserPosts(userID){
        try{
            const user = await UserModel.findById(userID);
            console.log(user.posts);
            const posts = await PostModel.find({
                _id:{
                    $in:user.posts
                }
            })
            console.log(posts);
            return posts

        }catch(err){
            console.log("Error from getUserPosts:\n", err);
        }
    }

    async addPost(userID, caption, imageUrl){
        try{
            console.log(userID)
            const user = await UserModel.findById(userID);

            const newPost = new PostModel({caption, imageUrl, createdBy:user._id});
            const savedPost = await newPost.save();
            console.log("savedPost from addPost:\n", savedPost);
            
            user.posts.push(savedPost._id);
            const savedUser = await user.save();
            console.log(savedUser);

            // console.log("value of user:\n", user.posts);
            
            // user.posts.push({post});
            // const savedUser = await user.save();
            // console.log("Saved user from addpost:\n", savedUser);
            
            return savedPost;
        }catch(err){
            console.log("Error from addPost:\n", err);
        }
    }

    async getPostById(postId){
        try{
            const result = await PostModel.findById(postId);
            return result
        }catch(err){
            console.log("Error from :\n",err)
        }
    }
    async deletePost(postId){
        try{
            const deletedPost = await PostModel.findByIdAndDelete(postId);
            if (!deletedPost) {
                return { message: "Post not found" }; 
            }
            
            await UserModel.updateMany(
                { posts: postId }, // Find any user with this post in their posts array
                { $pull: { posts: postId } }  // Remove the postId from the posts array
            );
            return deletedPost;
        }catch(err){
            console.log("Error from deletePost:\n",err);
            return null;
        }
    }
    async updatePost(postId, caption, imageUrl){
        try{
            // console.log("value of postId and new objectId(postId)", postId, "\n", new ObjectId(postId));
            const post = await PostModel.findByIdAndUpdate(postId, {caption:caption, imageUrl:imageUrl
            });
            return post;
            
        }catch(err){
            console.log("error from updatePost:\n", err);
        }
    }
    
}