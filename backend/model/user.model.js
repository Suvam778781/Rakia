const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
firstname:String,
lastname:String,
email:String,
pass:String,
allorders:Array
})
const UserModel=mongoose.model("User",userSchema)
module.exports={UserModel};

