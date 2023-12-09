require("dotenv").config();const express=require("express");
const app=express();
const PORT=process.env.PORT || 8000;

const cors=require("cors");
app.use(cors({
    origin:"*",
    methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true
}));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
const cookieparser=require("cookie-parser");

app.use(cookieparser());
const Route=require("./Routes/route");
Route(app);
require("./db/merndododb");

app.listen(PORT,()=>{
    console.log(`Server is listening at port ${PORT}`);
})