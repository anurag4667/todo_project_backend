import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";
import jwt from  "jsonwebtoken"; 

const userSchema = mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type:String,
        required: true,
        minlength : 6,
    },

    todos : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Todo",
        }
    ]
});

userSchema.pre("save" , async function (next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }        
    next();
})

userSchema.methods.matchpassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generatetoken = function(){
    return jwt.sign({_id:this._id },process.env.JWT_SECRET);
}

const User = mongoose.model("User",userSchema);


export default User;