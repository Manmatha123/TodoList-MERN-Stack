const Route=(app)=>{
    const auth=require("../Authorization/authorize");
    const cookieparser=require("cookie-parser");
    app.use(cookieparser());

const {hoemcontroller,redgcontroller,logincontroller,servicecontroller,dataputcontroller,deletedata,deletedataall,logoutme}=require("../controller/controller");

app.get("/",hoemcontroller);
app.post("/signup",redgcontroller);
app.post("/signin",logincontroller);
app.post("/putdata",auth,dataputcontroller);
app.post("/delete",auth,deletedata);
app.get("/deleteall",auth,deletedataall);
app.get("/service",auth,servicecontroller);

app.get("/logout",auth,logoutme);

}
module.exports=Route;