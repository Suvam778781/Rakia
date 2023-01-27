const mongoose=require("mongoose");
require('dotenv').config()
const express=require("express")
const app=express()
const { connection } = require("./config/db");
const { UserRouter } = require("./routes/User.Route");
const cors=require("cors");
const { productsRouter } = require("./routes/Products.route");
app.use(cors({
    origin:"*"
})) 
app.use("/users",UserRouter)
app.use("/notes",productsRouter)
app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("running on port 8080")
    }
    catch(err){
        console.log("Err While connecting to db")
        console.log(err)
    }
})