import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    iscompleted : {
        type : Boolean,
        default : false,
    },
    dateofcreation : {
        type : Date,
        default : Date.now(),
    }
});

const Todo = mongoose.model("Todo",todoSchema);

export default Todo;