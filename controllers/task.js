import { Task } from "../models/task.js";
import ErrorHandler from "../utils/errorHandler.js";


export const newTask = async(req,res,next)=>{

    try {
        const{title, description} =  req.body;

        await Task.create({
            title,
            description,
            user: req.user,

        });
        res.status(201).json({
            success: true,
            message: 'Task created successfully',
        });
        
    } catch (error) {
        next(error);  
    }
    
};

export const getMyTask = async(req,res,next)=>{

    try {
        const userid= req.user._id;

        const tasks= await Task.find({user: userid});
        res.json({
            success: true,
            tasks,
        });
        
    } catch (error) {
        next(error);         
    }
};

export const updateTask = async(req,res,next)=>{

    try {
        const {id} = req.params;
    const task = await Task.findById(id);
    if(!task)
        // return next(new Error('Task not found'));
        return next(new ErrorHandler("task not found", 404));
        // return res.status(404).json({
        //     success: false,
        //     message: 'Task not found',
        // });
    task.isCompleted = !task.isCompleted;
    await task.save();

    res.json({
        success: true,
        message: 'Task updated successfully',
    });
        
    } catch (error) {
        next(error);        
    }
};

export const deleteTask = async(req,res,next)=>{

    try {
        const {id} = req.params;
        const task = await Task.findById(id);
        if(!task)
            // return next(new Error('Task not found'));
            return next(new ErrorHandler("Task not found", 404));
            // return res.status(404).json({
            //     success: false,
            //     message: 'Task not found',
            // });

        await task.deleteOne();
        res.json({
            success: true,
            message: 'Task deleted successfully',
        });
        
    } catch (error) {
        next(error);        
    }
};