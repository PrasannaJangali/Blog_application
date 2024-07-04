
import mongoose from 'mongoose';

const connection =async (username,password)=>{
    const url= `mongodb+srv://${username}:${password}@cluster0.yxa40tq.mongodb.net/blog_application_project?retryWrites=true&w=majority&appName=Cluster0`;
    try {
        await mongoose.connect(url);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("error while connecting to database");
    }
}
export default connection;