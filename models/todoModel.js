const makeTodoTable = (sequelize, DataTypes) =>{
    const Todo = sequelize.define("todo", {
        title : {
            type : DataTypes.STRING
        },
        description : {
            type : DataTypes.TEXT
        },
        date : {
            type : DataTypes.STRING
        },
        status : {
            type : DataTypes.ENUM("pending", "completed"),
            defaultValue : "pending"
        },
    })
    return Todo
}
module.exports = makeTodoTable