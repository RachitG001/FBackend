var mysql = require('mysql');
var connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
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