const express = require("express")
const db = require("./database/config")
const bcrypt = require("bcrypt")

const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))


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

app.post("/add", async(req,res)=>{
    const {title, description, date, status} = req.body
    await db.todos.create({
        title : title,
        description : description,
        date : date
    })
    res.redirect("/")
    
})

app.post("/register", async(req,res)=>{
    const {username, email, password, confirm_password} = req.body
    await db.users.create({
        username : username,
        email : email,
        password : bcrypt.hashSync(password,10)
    })
    res.redirect("/add")    
})

app.listen(3000, ()=>{
    console.log("Server is running on http://localhost:3000")
})