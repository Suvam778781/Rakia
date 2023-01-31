const jwt=require("jsonwebtoken");
const Adminauthenticate=(req,res,next)=>{
    //  i will pass token of admin here and then admin will able to do the crud operation 
const admintoken=req.headers.authorization
if(admintoken){
const decoded=jwt.verify(admintoken,"admin")

if(decoded){
    const userID=decoded.userID
    req.headers.userID=userID;
    next()
}
else {
    res.send("please login first")
}
}
else {
    res.send("please login first")
}
}
module.exports={Adminauthenticate}