const express = require("express")
const db = require("./database/config")
const bcrypt = require("bcrypt")

const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))

//get page 
app.get("/", async(req,res)=>{
    const datas = await db.todos.findAll()
    res.render("todo/get",{datas : datas})
})

//add page 
app.get("/add", (req,res)=>{
    res.render("todo/add")
})

//add page receive todo task
app.post("/add", async(req,res)=>{
    const {title, description, date, status} = req.body
    await db.todos.create({
        title : title,
        description : description,
        date : date
    })
    res.redirect("/")
    
})

//update page
app.get("/update", (req,res)=>{
    res.render("todo/update")
})

//register page
app.get("/register", (req,res)=>{
    res.render("authentication/register")
})

//register page receive form data
app.post("/register", async(req,res)=>{
    const {username, email, password, confirm_password} = req.body
    await db.users.create({
        username : username,
        email : email,
        password : bcrypt.hashSync(password,10)
    })
    res.redirect("/add")    
})

//login page
app.get("/login", (req,res)=>{
    res.render("authentication/login")
})





app.listen(3000, ()=>{
    console.log("Server is running on http://localhost:3000")
})