const mongoose=require("mongoose");
const {Schema}=mongoose
const {Types}=Schema
const {String,Date}=Types
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

const todoschema=new Schema({
                           
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    tokens:[{
        token:{
            type:String,
            require:true
        }
    }],
    messages:[{
        message:{     
            type:String,
            require:true},
            date:{
              type:String,
              require:true
            }
    }]
})


todoschema.methods.generatewebtoken=async function(){
  try{
    const token=await jwt.sign({_id:this._id.toString()},process.env.SECREATEKEY);
this.tokens=this.tokens.concat({token});
await this.save();
return token;
  }
  catch(err){
    console.log("Error to generate token")
  }
};

todoschema.methods.insertmessage=async function(message,date){
try{
  this.messages=this.messages.concat({message,date});
  await this.save();
  return message;
}
catch(err){
    console.log('not put data');
}
}
todoschema.pre("save",async function(next){
      if(this.isModified("password")){
      this.password=await bcrypt.hash(this.password,10)
      }
    next();
});

const todomodel=mongoose.model("todomodel",todoschema);
module.exports=todomodel;

