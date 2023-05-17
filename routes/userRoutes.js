const express=require("express");
const userRoutes=express.Router();
const User=require("../Models/user");

userRoutes.get("/Register",(req,res)=>{
    res.render("register",{
        title:"Register"
    })
})
userRoutes.post("/Register",async(req,res)=>{
    let data=await req.body;
     const user=new User({
        userType:data.userType,
        name:data.name,
        id:data.id,
        password:data.password
     })
     try{
        user.save();
        res.redirect("/");
     }catch(err){
        console.log(err);
     }
     
})

module.exports=userRoutes