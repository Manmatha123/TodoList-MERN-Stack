const mongoose=require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/TodoMernSatck")

mongoose.connect(process.env.MONGO_DB_URL,{
    dbName:"TodoMernSatck",
})




.then(()=>{
    console.log("MongoDB connected");
})
.catch((err)=>{
    console.log("Error ehile connecting MongoDB");
})