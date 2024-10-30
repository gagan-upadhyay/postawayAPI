import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
    },
    tls:{
        rejectUnauthorized:false,
    }

});

const sendOtpEmail = async (email, otp)=>{
    const mailOptions={
        from:process.env.EMAIL_USER,
        to:email,
        subject:"Your OTP for password reset",
        text:`Your OTP for password reset is: ${otp}. It expires in 10 minutes.`
    }
    await transporter.sendMail(mailOptions);
};

export default sendOtpEmail;