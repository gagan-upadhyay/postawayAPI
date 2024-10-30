import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const url =process.env.DB_URL;

export const connectUsingMongoose = async()=>{
    try{
        await mongoose.connect(url);
        console.log("Database connected to Atlas Mongoose");
    }catch(err){
        console.log(err);
    }
}