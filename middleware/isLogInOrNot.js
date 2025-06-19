const JWT = require("jsonwebtoken")
const isLogInOrNot = (req,res,next)=>{
    //receive token
    const token = req.cookies.token

    //verify token
    if(!token){
        res.send("Please login")
    } else {
        JWT.verify(token, "secretkey", (error, result)=>{
            if(error){
                res.send("Invalid token")
            } else {
                req.userId = result.id;
                console.log(result)
                next()
            }
        })
    }
}

module.exports = isLogInOrNot