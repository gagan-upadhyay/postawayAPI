import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:["Male", "Female"],
        required:true
    },
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ],
    tokenVersion:{
        type:Number,
        default:0
    },
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }],
        
    
    friendRequest:[{
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
        status:{
            type:String,
            enum:['pending', 'accepted', 'rejected'],
            default:'pending'

        }
        
    }]
    
});

const UserModel = new mongoose.model('User', userSchema);

export default UserModel;