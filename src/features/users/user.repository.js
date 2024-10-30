import mongoose from 'mongoose';
import UserModel from './user.schema.js';




export default class UserRepository{

    async signUp(name, email, hashedPassword, gender){
        try{
            const user = {name, email, password:hashedPassword, gender};
            const newUser = new UserModel(user);
            return await newUser.save();
            
        }catch(err){
            console.log("Error from signUp:\n", err);
        }
    }
    async findByEmail(email){
        try{
            console.log(await UserModel.findOne({email}));
            return  await UserModel.findOne({email});
        }catch(err){
            console.log("Error from signUp", err);
        }
    }
   

    async resetPassword(userID, hashedPassword){
        let user = await UserModel.findById(userID);
        if(!user){
            throw new Error("No user found");
        }
        user.password = hashedPassword;
        user.save();
        return user;
    }catch(err){
        console.log("error during resetPassword:\n", err);
    }

    async findByID(userID){
        try{
            const result =  await UserModel.findOne({_id:userID});
            console.log("value of result:\n", result);
            return result
        }catch(err){
            console.log("Find by Id error",err);
        }
    }

    async getUserDetails(userId){
        try{
            const user = await UserModel.findById(userId)
            .select('name email gender posts -_id')  // Select only the fields you want from the user
            .populate({
                path: 'posts',  // Populate the 'posts' array
                select: 'caption imageUrl createdBy -_id'  // Select only the desired fields from the Post model
            });
            if(!user){
                return {message:"No user found"}
            }
            return user

        }catch(err){
            console.log("Error from getUserDetails of repo", err);
        }
    }
    async getAllUsers(){
        try{
            const users = await UserModel.find()
            .select('name email gender posts -_id')
            .populate({
                path:'posts',
                select:'caption imageUrl -_id',
                options:{sort:{createdAt:-1}}
            });
            if(!users){
                return {message:"No user found"}
            }
            return users

        }catch(err){
            console.log("Error from getAllUsers of repo", err);
        }
    }
    async updateUserDetails(userId){
        try{
            const user = await UserModel.findById(userId);
            if(!user){
                return false
            }
            
        }catch(err){
            console.log("Error from ", err);
        }
    }

    
}