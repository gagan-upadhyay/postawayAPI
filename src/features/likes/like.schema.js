import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
    item:{
        type:String,
        enum:['Posts', 'Comments'],
        required:true,
    },
    itemId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'item'
    },
    likedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }, 
},{timestamps:true});

const LikeModel = mongoose.model('likes', LikeSchema);
export default LikeModel;