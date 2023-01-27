const mongoose=require("mongoose")


const productSchema=mongoose.Schema({
title:String,
note:String,
category:String,
userID:String
})
const ProductsModel=mongoose.model("Notes",productSchema)
module.exports={ProductsModel};