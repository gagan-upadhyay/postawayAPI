import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    comment:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
        required:true,
    },

}, {timestamps:true});

const commentModel = new mongoose.model('Comments', commentSchema)

export default commentModel;