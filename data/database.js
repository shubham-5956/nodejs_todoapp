
import mongoose from 'mongoose';

export const connectDB =()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: 'pracAPI',
    })
    .then((c)=> console.log(`Db connected with ${c.connection.host}`))
    .catch((err)=>console.log(err));
};