const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
firstname:String,
lastname:String,
email:String,
pass:String,
})
const UserModel=mongoose.model("Book",userSchema)
module.exports={UserModel};

