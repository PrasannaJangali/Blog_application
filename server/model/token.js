import mongoose from "mongoose";

const tokenSchema=mongoose.Schema({
    token:{
        type:String,
        required:true
    }
})
export default mongoose.model('token',tokenSchema);