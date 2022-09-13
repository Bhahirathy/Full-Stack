const mongoose=require("mongoose");
const contentModel=new mongoose.Schema({
    content:{
        type:String,
        required:true
    }
})
const contentSchema=mongoose.model("content",contentModel)
module.exports=contentSchema