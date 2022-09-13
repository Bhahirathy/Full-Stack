const mongoose=require("mongoose");
const userModel=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
// module.exports=mongoose.model("user",userModel)
const userSchema=mongoose.model("user",userModel)
module.exports=userSchema