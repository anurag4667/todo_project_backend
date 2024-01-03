import User from "../models/user.js";
import jwt  from "jsonwebtoken";
const authentication = async (req,res,next) =>{
    try { 
        const {token} = req.cookies;

        if(!token){
            return res.status(404).json({
                success: false,
                message : "please login first",
            })
        }

        const decode = await jwt.verify(token,process.env.JWT_SECRET);

        const user = await User.findById(decode._id);

        req.user = user;
        next();
        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }

}

export default authentication;