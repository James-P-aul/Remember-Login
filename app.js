
// MERN
// mongodb
// express- framework add on node
// react
// Node

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs= require("ejs");
const { join } = require("path");

//set
const app = express();
app.use(express.static(join(__dirname,"public")));

app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs');



//connection
mongoose.connect("mongodb://localhost:27017/UserEntry");
//schema
const UserSchema = new mongoose.Schema({
    name: String,
    password : String
});
//model
const User = mongoose.model("user",UserSchema); 




//routing

//home
app.get("/",(req,res)=>{
    res.render("home");
})

//create
app.get("/Register",(req,res)=>{   //www.google.com/Readall
    res.render("register");
})

app.post("/",(req,res)=>{
    var name = req.body.name;
    var password = req.body.password;
    var cnfrmPass = req.body.cnfrmPass;

    if(password === cnfrmPass)
    {
        var user = new User({
            name : name,
            password : password
        });

        user.save();
        res.redirect("/");
    }
    else
    {
        res.send("password not match");
    }

})

//read all
app.get("/ReadAll", (req,res)=>{

    var Items = User.find({}, (err,data)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            // console.log(data);
            res.render("ReadAll", {Items : data});
        }
    })

    
});

//read one
app.get("/readOne/:UserName", (req,res)=>{

    User.find({name: req.params.UserName}, (err,data)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.send(data);
        }
    })
});

//update
app.post("/Update",(req,res)=>{

    User.updateOne({name: req.body.name}, {name:req.body.name , password: req.body.password} , (err,data)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(data);
            res.redirect("/");
        }
    })

})

//delete
app.get("/delete/:UserName",(req,res)=>{
    User.deleteMany({name: req.params.UserName},(err,data)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(data);
            res.redirect("/");
        }
    })
});

app.get("/Delete",(req,res)=>{
    User.deleteMany({},(err,data)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(data);
            res.redirect("/");
        }
    })
})

app.get("/update/:UserName",(req,res)=>{

    
    res.render("update" , {name : req.params.UserName});

})


app.listen(8000,()=>{
    console.log("listening at port 8000");
});