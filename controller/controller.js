const todomodel=require("../model/merntodomodel");
const bcrypt=require("bcryptjs");

const hoemcontroller=(req,res)=>{
    res.send("home page.....");
}


// router of the registration page
const redgcontroller=async(req,res)=>{
try{
const {name,email,password}=req.body;

if(!name || !email || !password){
   return res.status(404).send({"message":"fill all the details"});
}

const isUser=await todomodel.findOne({email});
if(isUser){
    return res.status(404).send({"message":"User already exist"});
}

const resfind=await todomodel({
    name,email,password
})

const savedata=await resfind.save();
res.send(savedata);
}
catch(err){
    res.status(404).send({"message":"error while signup user"});
}
}





// router of the login page 
const logincontroller=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
           return res.status(404).send({"message":"fill all the details"});
        }
    
const isuserdata=await todomodel.findOne({email});
if(!isuserdata){
    return res.status(404).send({"message":"Invalid details"});
}
const ismatch=await bcrypt.compare(password,isuserdata.password);

        if(!ismatch){
          return res.status(404).send({"message":"Invalid details"});
        }
        const token=await isuserdata.generatewebtoken();
        res.cookie("jwt",token,{
            httpOnly:true
        });
        res.status(202).send({"message":"Login successfully"});


    }
    catch(err){
        res.send(res)
        res.status(404).send({"message":"Fail To Login.."});
    }
}




const servicecontroller=async (req,res)=>{
try{
const mydata=await todomodel.findOne({_id:req._id});
res.send(mydata);
}
catch(err){
    res.status(404).json({"msg":"nodata found error"});
}
}


const dataputcontroller=async (req,res)=>{
  
try{
    const {message,date}=req.body;
    if(!message || !date){
        return res.status(404).json({"msg":"fail to save data"});
    }
    const mydata=await todomodel.findOne({_id:req._id})
   const putres=await mydata.insertmessage(message,date);
   res.status(202).json({"msg":"Successfully save data"});
}
catch(err){
return   res.status(404).json({"msg":"fail to save data"});
}

}

const deletedata=async(req,res)=>{
try{
    const _id=req._id;
const {id}=req.body;
const del=await todomodel.updateOne({_id},{$pull:{messages:{_id:id}}})
res.status(202).json({"message":"Delete item successfully"});
}
catch(err){
    res.send("error occouer");
}
}
// deletedataall
const deletedataall=async(req,res)=>{
try{

    const _id=req._id;
    const del=await todomodel.updateMany({_id},{$pull:{messages:{}}})
    res.status(202).json({"message":"Delete item successfully"});
}
catch(err){
    res.send("error occouer");
}
}


const logoutme=(req,res)=>{
const success=res.clearCookie("jwt");
res.status(202).send("success logout");
}




module.exports={hoemcontroller,redgcontroller,logincontroller,servicecontroller,dataputcontroller,deletedata,deletedataall,logoutme};