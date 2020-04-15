var mysql = require('mysql');

var connection = mysql.createConnection({
    host: process.env.HOST || 'localhost',
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
});

connection.connect(function (err){
    if(!err){
        console.log("Database is connected successfully......");
    }
    else{
        console.log("Error connecting database.....", err);
    }
});

module.exports = connection;