import UserRepository from "./user.repository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import session from 'express-session';
// import cookieParser from 'cookie-parser';

dotenv.config();

export default class UserController{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async resetPassword(req, res, next){
        const {newPassword}=req.body;
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        try{
            const result = await this.userRepository.resetPassword(req.userID, hashedPassword);
            if(!result){
                return res.status(400).send("Something is wrong");
            }
            return res.status(201).send("Password updated successfully");
        }catch(err){
            console.log("error from controller resetPassword:\n", err);
            next();
        }
    }

    async signUp(req, res){
        try{
            const {name, email, password, gender} = req.body;
            const isPresent = await this.userRepository.findByEmail(email);
            if(isPresent){
                return res.status(404).send("User already in database");
            }
            //hashing password:
            const hashedPassword = await bcrypt.hash(password, 12);
            //sending to repository
            const result = await this.userRepository.signUp(name, email, hashedPassword, gender);
            console.log(result);
            if (!result){
                return res.status(400).send("Something went wrong");
            }
            return res.status(201).send("User added successfully");
            
        }catch(err){
            console.log("error from controller resetPassword:\n", err);
        }
    }

    async signIn(req, res){
        try{
            const user = await this.userRepository.findByEmail(req.body.email);
            if(!user){
                return res.status(404).send("User doesn't exist");
            }else{
                const result = await bcrypt.compare(req.body.password, user.password);
                console.log('Value of result', result);

                if(!result){
                    return res.status(401).send("Wrong credentials");
                }else{
                    const token = jwt.sign(
                        {
                            userID:user._id,
                            email:user.email,
                            tokenVersion:user.tokenVersion //adding token version
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn:'1h'
                        }
                    );
                    req.session.usermail = req.body.email;
                    res.cookie('Session', token, {httpOnly:true, maxAge:3*24*60*60*1000});
                    const userId = user.id;
                    return res.status(200).send({token, userId});
                }
            }

        }catch(err){
            console.log("Error from signIn:\n",err);

        }
    }
    async getUserDetails(req, res){
        try{
            const result = await this.userRepository.getUserDetails(req.params.userId);
            if(!result){
                return res.status(400).send("Something went wrong");
            }
            return res.status(200).send(result);

        }catch(err){
            console.log("Error from getUserdetails", err);
        }
    }

    async getAllDetails(req, res){
        try{
            const result = await this.userRepository.getAllUsers();
            if(!result){
                return res.status(400).send("Something went wrong");
            }
            return res.status(200).send(result);

        }catch(err){
            console.log("Error from getAllDetails", err);
        }
    }

    async updateUserDetails(req, res){
        try{
            const {name, gender, email} = req.body;
            const result = await this.userRepository.updateUserDetails(req.params.userId, name, gender, email);
            if(!result){
                return res.status(400).send("Something went wrong");
            }
            return res.status(200).send(result);
        }catch(err){
            console.log("Error from updateUserDetails", err);
        }
    }

    async logout(req, res){
        try{
            res.clearCookie('Session');
            if(req.session){
                console.log("inside req.session (logout)");
                await req.session.destroy();
            }
                
        return res.status(200).send("Logout Successfully");
            

        }catch(err){
            console.log("Error from logout section", err);
            res.status(500).send('Internal server error');
        }
    }

    async logoutAllDevices(req, res){

        try{
            console.log("value of req.body.userID", req.body.userID);
            const user = await this.userRepository.findByID(req.body.userID);
            if(!user){
                return res.status(404).send("User Not found");
            }
            user.tokenVersion+=1;
            await user.save();
            res.clearCookie('Session');
            if(req.session){
                await req.session.destroy();

            }
            return res.status(200).send("logout from all devices");

        }catch(err){
            console.error("Error during logoutAllDevices:\n", err);
            return res.status(500).send("Internal server error");
        }

    }
}


