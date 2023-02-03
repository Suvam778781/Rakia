const mongoose=require("mongoose")
const productSchema=mongoose.Schema({
  description: String,
  price: Number,
  category: String,
  image: String,
  total_quantity: Number,
  quantity: Number,
  created_at: Date,
  updated_at: Date,
  ordered_at: Date,
  cancelled_at: Date,
  rating: Number,
  brand: String
})
const ProductsModel=mongoose.model("Product",productSchema)
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