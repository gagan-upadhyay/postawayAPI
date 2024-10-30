import { Router } from "express";
import OTPController from "./otp.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";


const otpRouter = Router();

const otpController = new OTPController();

otpRouter.post('/send', (req, res)=>{
    console.log("Value of req.body from router", req.body);
    otpController.sendOtp(req, res)
});

otpRouter.post('/verify',(req, res)=>{
    otpController.verifyOtp(req, res)
});

otpRouter.post('/reset-password', (req, res)=>{
    otpController.resetPassword(req, res)
});

export default otpRouter;