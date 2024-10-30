import UserModel from "../users/user.schema.js";
import sendOtpEmail from "./email.js";
import otpModel from "./otp.schema.js";
import crypto from 'crypto';
import bcrypt from 'bcrypt';

export default class OTPRepository{
    async sendOtp(email){
        try{
            console.log("Value of email from repo:\n", email);
            const user = await UserModel.findOne({email});
            console.log("Value of user from repo:\n",user);
            if(!user){
                return 'Error: User Not Found';
            }
            const otp = crypto.randomInt(100000,999999).toString();
            const expiresAt = new Date(Date.now()+10*60*1000);
            const otpSent = await sendOtpEmail(email, otp);
            console.log("Value of otpsent from repo:\n", otpSent);
            await otpModel.create({userId:user._id, otp, expiresAt});
            console.log(`OTP sent to ${email} otp:${otp}`);
            return 'OTP sent successfully';

        }catch(err){
            console.log("Error at sendOtp of Repo", err);
            return err;
        }
    }


    async verifyOTP(email, otp){
        try{
            const user = await UserModel.findOne({email});
            if(!user){
                return "Error: User Not found";
            }
            const otpInDB = await otpModel.findOne({userId:user._id, otp});
            if(!otpInDB){
                return "Error: Invalid OTP";
            }
            if(otpInDB.expiresAt<new Date()){
                await otpInDB.deleteOne({_id:otpInDB._id});
                return "Error: OTP expired";
            }
            // return otp ===otpInDB.otp ? (Date().now<otpInDB.expiresAt?'OTP Matched' && await otpModel.deleteOne({_id:otpInDB._id}):'OTP expired'):'Wrong OTP';
            return "OTP Verified";

        }catch(err){
            console.log("Error at verifyOTP of Repo", err);
            return err;
        }
    }
    async resetPassword(email, otp, newPassword){
        try{
            const user = await UserModel.findOne({email});
            if(!user){
                return "Error: User not found!";
            }
            const otpRecord = await otpModel.findOne({userId:user._id, otp});
            if(!otpRecord){
                return "Error: Invalid or expired OTP";
            }
            const hashedPassword = await bcrypt.hash(newPassword, 12);
            user.password = hashedPassword;
            await user.save();
            await otpModel.deleteOne({_id:otpRecord._id});
            return 'Password reset Successfully!';
        }catch(err){
            console.log("Error at verifyOTP of Repo", err);
            return err;
        }
    }
}