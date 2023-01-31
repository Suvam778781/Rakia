const mongoose=require("mongoose")
const cartSchema=mongoose.Schema({
title:String,
note:String,
category:String,
description:String,
image:String,
rating:Number,
price:Number,
quantity:Number,
userID:String
})
const CartsModel=mongoose.model("Cart",cartSchema)
module.exports={CartsModel};