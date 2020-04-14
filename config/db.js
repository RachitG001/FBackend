var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'follege',
    database: 'follegedb'
});

connection.connect(function (err){
    if(!err){
        console.log("Database is connected successfully......");
    }
    else{
        console.log("Error connecting database....." , err);
    }
});

module.exports = connection;