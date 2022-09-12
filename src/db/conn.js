const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/logindata")
.then(()=>{
    console.log("connection success");
}).catch((e)=>{
    console.log("not reay to connect");
})