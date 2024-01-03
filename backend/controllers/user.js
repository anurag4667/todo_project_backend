import User from "../models/user.js"

const register = async (req,res)=>{
    try {
        const {username,email,password} = req.body;

        let user  = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success: false,
                message : "user already exist"
            });
        }
        user = await User.findOne({username});

        if(user){
            return res.status(400).json({
                success: false,
                message : "username already exist pick a new one"
            });
        }

        user = await User.create({username,email,password});
        const token =  user.generatetoken();

        res.status(201).cookie("token",token ,{
            expires : new Date(Date.now() + 90*24*60*60*1000),
            httpOnly : true,
            sameSite : process.env.NODE_ENV === "development" ? "lax" : "none",
            secure : process.env.NODE_ENV === "development" ? false : true,
        })
        .json({
            success : true,
            user,
            token,
        })

        
    } catch (error) {
        res.status(500).json(
            {
                success : false,
                message : error.message,
            }
        )
    }
}

const login = async (req,res)=>{
    try {
        const {username,email,password} = req.body;
        let user;
        if(email){
            user = await User.findOne({email});
        }
        else if(username){
            user = await User.findOne({username});
        }

        if(!user){
            return res.status(400).json({
                success : false,
                message : "user not found"
            })
        }

        const verify = await user.matchpassword(password);
        if(!verify){
            return res.status(400).json({
                success : false,
                message : "incorrect password"
            })
        }

        const token =  user.generatetoken();

        res.status(200).cookie("token",token ,{
            expires : new Date(Date.now() + 90*24*60*60*1000),
            httpOnly : true,
            sameSite : process.env.NODE_ENV === "development" ? "lax" : "none",
            secure : process.env.NODE_ENV === "development" ? false : true,
        })
        .json({
            success : true,
            user,
            token,
        })
        
        
    } catch (error) {
        res.status(500).json(
            {
                success : false,
                message : error.message,
            }
        )
    }
}

const logout = async (req,res) =>{
    try {
        res.status(200).cookie("token", null ,{
            expires : new Date(Date.now()),
            httpOnly : true,
            sameSite : process.env.NODE_ENV === "development" ? "lax" : "none",
            secure : process.env.NODE_ENV === "development" ? false : true,
        }).json({
            success : true,
            message : "logged out successfully"
        })
    } catch (error) {
        res.status(500).json(
            {
                success : false,
                message : error.message,
            }
        )
    }
}
export {register , login,logout};