const dotenv = require("dotenv")
const { Sequelize } = require("sequelize")
dotenv.config()

const sequelize = new Sequelize({
    host : process.env.db_host,
    username : process.env.db_username,
    password : process.env.db_password,
    database : process.env.db_name,
    port : process.env.db_port,
    dialect : "mysql"
})

sequelize.authenticate()
    .then(()=>{
        console.log("Database connected")
    })
    .catch((err)=>{
        console.error("Database connection failed",err.message)
    })
sequelize.sync({alter : true})
console.log("Tables are created")