import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next)=>{
    const token = req.headers['authorization'];

    if(!token){
        console.log("!token code executed");
        return res.status(401).send('Unauthorized');
    }    
    try{
        const removedBearerToken = token.split(' ')[1];
        const payload = jwt.verify(
            removedBearerToken,
            process.env.JWT_SECRET
        );
        req.body.userID = payload.userID;
        console.log("Value of userID from JWT:", payload.userID);
    }catch(err){
        console.log("Error from JWT:\n", err);
        return res.status(401).send('Unauthorized');
    }
    next();
};
export default jwtAuth;