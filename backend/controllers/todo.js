import Todo from "../models/todo.js";
import User from "../models/user.js";

const createtodo = async(req,res)=>{
    try {
        const {title,description} = req.body;

        const todo = await Todo.create({title,description});
        const user = await User.findById(req.user._id);

        user.todos.push(todo._id);

        await user.save();
        await todo.save();

        res.status(201).json({
            success : true,
            message : "todo created"
        })
        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }

}

export {createtodo};