const express = require("express")
const path = require("path");

const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views")); // or wherever your .ejs files are


app.get("/", (req,res)=>{
    res.render("todo/get")
})
app.get("/add", (req,res)=>{
    res.render("todo/add")
})
app.get("/update", (req,res)=>{
    res.render("todo/update")
})
app.get("/register", (req,res)=>{
    res.render("authentication/register")
})
app.get("/login", (req,res)=>{
    res.render("authentication/login")
})

app.listen(3000, ()=>{
    console.log("Server is running on http://localhost:3000")
})