// const cookieparser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const todomodel=require("../model/merntodomodel");



const auth= async function(req,res,next){
try{
    let token=req.cookies.jwt;


const iscook=jwt.verify(token,process.env.SECREATEKEY);

const usersres=await todomodel.findOne({_id:iscook._id})
req.name=usersres.name;
req.email=usersres.email;
req._id=usersres._id;
next();
}
catch(err){
    res.send("err");
}
}
module.exports=auth;