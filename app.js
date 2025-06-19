const express = require("express")
const app = express()

const db = require("./database/config")
const bcrypt = require("bcrypt")
const { where } = require("sequelize")

const JWT = require("jsonwebtoken")
const isLogInOrNot = require("./middleware/isLogInOrNot")

const cookieParser = require("cookie-parser")
app.use(cookieParser())

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))

//get page 
app.get("/",isLogInOrNot, async(req,res)=>{
    const userId = req.userId
    const datas = await db.todos.findAll({
        where : {
            userId : userId
        }
    })
    res.render("todo/get",{datas : datas})
})

//add page 
app.get("/add", isLogInOrNot , (req,res)=>{
    res.render("todo/add")
})

//add page receive todo task
app.post("/add",isLogInOrNot,  async(req,res)=>{
    const userId = req.userId
    const {title, description, date, status} = req.body
    await db.todos.create({
        title : title,
        description : description,
        date : date,
        userId : userId,
    })
    res.redirect("/")
    
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
    res.redirect("/login")    
})

//login page
app.get("/login", (req,res)=>{
    res.render("authentication/login")
})

//login page authentication
app.post("/login", async(req,res)=>{
    const {email, password} = req.body
    const user = await db.users.findAll({
        where : {
            email : email
        }
    })
    if(user.length == 0){
        res.send("Email is not registered")
    } else {
        const isPasswordMatch = bcrypt.compareSync(password, user[0].password)
        if(isPasswordMatch){
            const token = JWT.sign({ id : user[0].id },"secretkey",{ expiresIn : "1d" })
            res.cookie("token",token)
            res.redirect("/")
        } else {
            res.send("Invalid Credentials")
        }
    }
})

//delete page
app.get("/delete/:id",isLogInOrNot,  async (req,res)=>{
    const id = req.params.id
    await db.todos.destroy({
        where : {
            id: id
        }
    })
    res.redirect("/")

})

//edit page
app.get("/edit/:id",isLogInOrNot, async(req,res)=>{
    const id = req.params.id
    const todos =await db.todos.findAll({
        where : {
            id : id
        }
    })
    res.render("todo/update", {todos : todos})    
})

//edit page receive 
app.post("/edit/:id", isLogInOrNot, async(req,res)=>{
    const id = req.params.id
    const {title, description, date, status} = req.body
    await db.todos.update({
        title : title,
        description : description,
        date : date,
        status : status
    },{
        where : {
            id : id
        }
    })
    res.redirect("/")

})

app.listen(3000, ()=>{
    console.log("Server is running on http://localhost:3000")
})