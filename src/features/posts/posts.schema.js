import mongoose from "mongoose";

export const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    likeCount:{
        type:mongoose.Schema.Types.Number,
        default:0
    },
    likedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    commentCount:{
        type:mongoose.Schema.Types.Number,
        default:0
    },
    commentedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

});

const PostModel = new mongoose.model('Post', postSchema);
export default PostModel;