
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/feature.js";
import ErrorHandler from "../utils/errorHandler.js";


export const login = async(req, res, next) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user)
            return next(new ErrorHandler("Invalid username or password", 404));
            // return res.status(404).json({
            //     success: false,
            //     message: "Invalid username or password",
            // });
    
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch)
            return next(new ErrorHandler("Invalid username or password", 404));
            // return res.status(404).json({
            //     success: false,
            //     message: "Invalid username or password",
            // });
        
        sendCookie(user, res, `Welcome Back ${user.name}`,200);
        
    } catch (error) {
        next(error);
    }

};

export const register = async(req, res) => {
    try {
        
    const { name, email, password } = req.body;
    let user = await User.findOne({email});
    if(user)
        return next(new ErrorHandler("User Already exists", 404));
    //     return res.status(404).json({
    //     success: false,
    //     message: "User already exists"
    // });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({name,email,password: hashedPassword});

    sendCookie(user, res, "Registered Successfully", 201);
        
    } catch (error) {
        next(error);
    }

};

export const getUserDetails = (req, res) => {

            res.status(200).json({
                success: true,
                user: req.user,
            });
};

export const logout = (req, res) => {

        res
        .status(200)
        .cookie("token","",{
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV=== "Development"?"lax": "none",
            secure: process.env.NODE_ENV=== "Development"?false: true,
        })
        .json({
            success: true,
            user: req.user,
        });
};


