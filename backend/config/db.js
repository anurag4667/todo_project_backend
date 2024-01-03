import mongoose from "mongoose";

const connectdb =async ()=>{
    try {
        const con = await mongoose.connect(process.env.MONGO_URI);

        console.log(`database connected to ${con.connection.host}`);
    } catch (error) {
        console.log(error.message);
    }
}

export default connectdb;