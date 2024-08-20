import express from 'express';
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';
import {config} from "dotenv";
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.js';
import cors from "cors";

export const app = express();

config({
    path: "./data/config.env",
})
//middleware fro accepting json data
app.use(express.json());
app.use(cookieParser());
app.use(cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,//used to pas cokkies to frontend
    })
);

//routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/tasks",taskRouter);


// const schema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String,
// });

// const User = mongoose.model('User',schema);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

//custom made error middleware
app.use(errorMiddleware);

// app.get('/users/all', async(req, res) => {
//     // res.send('Hello, World!');
//     const users=await User.find({});
//     res.json({
//         success: true,
//         users,
//     });
// });

// app.post('/users/new', async(req, res) => {

//     const{name, email, password}=req.body;

//     await User.create({
//         name,
//         email,
//         password,
//     });


//     // await User.create({
//     //     name: "Alpha Beta",
//     //     email: "shubham@example.com",
//     //     password: "hello",
//     // });

//     res.status(201).cookie("tmppp","lol").json({
//         success: true,
//         message: "Registered successfully",
//     });
// }); 

