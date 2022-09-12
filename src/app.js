
const express = require("express");
require("./db/conn");
const path = require("path");
const Logdata = require("./logdata/logdata");
const hbs = require("hbs");


const app = express();
const port = process.env.PORT || 9000;

const tamplets_path = path.join(__dirname,"../tamplets/views");

app.set("view engine", "hbs");
app.set("views", tamplets_path);
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.get("/", (req,res) => {
    res.render("registeration")
})
app.get("/login", (req,res) => {
    res.render("login")
})

app.get("/index", (req,res) => {
    res.render("index")
})
app.post("/index", async (req,res) => {
    try{
        const pass = req.body.passward;
        const cpass = req.body.confirmpassward;

        if( pass === cpass ){
            const dataSave = new Logdata({
                firstName : req.body.firstName,
                email : req.body.email,
                passward : pass,
                confirmpassward : cpass
            })
            const finalData = await dataSave.save();
            res.status(201).render("index");
        }else{
            res.send("passward is not same");
        }

    }catch(e){
        res.status(400).send(e);
    }
})

app.post("/login", async (req,res) => {
    try{
        const email = req.body.email;
        const passward = req.body.passward;

        const logfinal = await Logdata.findOne({email:email});
        // console.log(logfinal);

        if(logfinal.passward === passward){
            res.status(201).render("index");
        }else{
            res.send("invalid pass");
        }

    }catch(error){
        res.status(400).send("invalid Email")
    }
})

app.listen(port, ()=>{
    console.log(`hey ready to host at ${port}`);
})