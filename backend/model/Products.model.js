const mongoose=require("mongoose")
const productSchema=mongoose.Schema({
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
const ProductsModel=mongoose.model("Notes",productSchema)
module.exports={ProductsModel};
// {
//     "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//     "price": 109.95,
//     "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//     "category": "men's clothing",
//     "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//     "rating": {
//       "rate": 3.9,
//       "count": 120
//     }
//   }