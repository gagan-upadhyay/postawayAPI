import OTPRepository from "./otp.respository.js";

export default class OTPController{
    constructor(){
        this.otpRepository = new OTPRepository();
    }

    async sendOtp(req, res){
        try{
            const {email} = req.body;
            console.log("Value of req.body", req.body.email);
            const result = await this.otpRepository.sendOtp(email);
            console.log("value of result from controller: \n",result);

            if(result.includes("Error")){
                return res.status(404).send(result);
            }
            
            return res.status(200).send('OTP Sent Successfully');

        }catch(err){
            console.log("Error at sendOtp", err);
            return res.status(500).send("Internal Server Error!");
        }
    }

    async verifyOtp(req, res){
        try{
            const {email, otp} = req.body;
            const result = await this.otpRepository.verifyOTP(email, otp);
            
            if(result.includes("Error")){
                return res.status(404).send(result);
            }
        
            return res.status(200).send(result);
        }catch(err){
            console.log("Error at sendOtp", err);
            return res.status(500).send("Internal Server Error!");
        }
    }

    async resetPassword(req, res){
        const {email, otp, newPassword} = req.body;
        const result = await this.otpRepository.resetPassword(email, otp, newPassword);

        if(result.includes("Error")){
            return res.status(404).send(result);
        }
    
        return res.status(200).send(result);
    }catch(err){
        console.log("Error at sendOtp", err);
        return res.status(500).send("Internal Server Error!");
    }
    
}