const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
   userType:{
       type:String,
       required:true
   },
   name:{
       type:String,
       required:true
   },
   id:{
       type:String,
       required:true
   },
   password:{
       type:String,
       required:true
   }
})

module.exports=mongoose.model("user",userSchema);