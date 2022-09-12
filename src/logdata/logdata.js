const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    firstName :{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true
    },
    passward:{
        type:String,
        required:true
    },
    confirmpassward:{
        type:String,
        required:true
    }
})

const Logdata = new mongoose.model("Logdata", logSchema);

module.exports = Logdata;