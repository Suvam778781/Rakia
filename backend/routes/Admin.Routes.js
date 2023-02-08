const mongoose=require("mongoose");
const express=require("express")
const bcrypt=require("bcrypt");
const AdminRouter=express.Router()
AdminRouter.use(express.json())
const jwt=require("jsonwebtoken");
const { AdminModel } = require("../model/Admin.Model");
AdminRouter.post("/login",async(req,res)=>{
    let {email,pass}=req.body;
    try{
    const user =await AdminModel.findOne({email})
    if(user){
    bcrypt.compare(pass,user.pass,(err,result)=>{
    if(result){
        const admintoken =jwt.sign({userID:user._id},"admin")
        res.send(({"msg":"Login Succesfully","admintoken":admintoken}))
    }
    else {
        res.send("please login with admin credentials")
    }
    })
    }
    }catch(err){
        res.status(404).send({"err":err})
    }
    })
    AdminRouter.post("/resistor",async(req,res)=>{
    const {email,secKey,type,name,pass}=req.body;
    try{
    bcrypt.hash(pass,5,async(err,secure_password)=>{
    if(err){
        console.log(err);
    }else {
        const user=new AdminModel({name,email,secKey,type,pass:secure_password})
        await user.save()
        res.send("Resistered Succesfully")
    }
    })
    }catch(err){
        res.status(404).send("Error While Resistoring The admin")
        
    }
    })
    module.exports={AdminRouter}
    // 63c0328b1cf87dc5efcc7d5e















// name:String,
// email:String,
// secKey:Number,
// type:String,
// pass:String,