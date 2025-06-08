const dotenv = require("dotenv")
const { Sequelize, DataTypes } = require("sequelize")
dotenv.config()

const sequelize = new Sequelize({
    host : process.env.db_host,
    username : process.env.db_username,
    password : process.env.db_password,
    database : process.env.db_name,
    port : process.env.db_port,
    dialect : "mysql"
})

const db = {}
db.todos = require("./../models/todoModel")(sequelize,DataTypes)
db.users = require("./../models/userModel")(sequelize,DataTypes)

sequelize.authenticate()
    .then(()=>{
        console.log("Database connected")
    })
    .catch((err)=>{
        console.error("Database connection failed",err.message)
    })
sequelize.sync({alter : true})
console.log("Tables are created")

module.exports = sequelize
module.exports = db
