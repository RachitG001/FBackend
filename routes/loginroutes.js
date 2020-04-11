const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

connection = require('./../config/db');
global.config = require('./../config/config');

exports.register = function (req,res){

    var hashp = bcrypt.hashSync(req.body.password,saltRounds);
    var today = new Date();
    var users = {
        "username": req.body.username,
        "password": hashp,
        "created": today,
        "modified": today
        }

    connection.query('INSERT INTO users SET ?', users, function(err,results,fields){

    if (err)
        {
            res.send({
                "code": 400,
                "Status": "This username already exists..."
            });
        }
    else
        {
            res.send({
                "code": 200,
                "Status": "User created successfully..."
            });
        }
    });
}

exports.login = function (req,res){

    var username = req.body.username;
    var password = req.body.password;

    connection.query('SELECT * FROM users WHERE username = ?',username,function(err, results, fields){

        if (err) {
            res.send({
                "Code": 400,
                "failed": "Error occured"
            });
        }
        else{
            if (results.length>0){
                bcrypt.compare(password,results[0].password,(err,resp)=>{
                    if(resp == false){
                        res.send({
                            "Code": 204,
                            "Status": "Email & password do not match"
                        });
                    }
                    else{
                        var options = {
                         expiresIn: 3000
                        }
                        var token = jwt.sign({
                            expiresIn: global.config.tokenLife,
                            data: password
                        },global.config.secret);
                        const refreshToken = jwt.sign({
                            expiresIn: global.config.tokenLife,
                            data: password
                        },global.config.refreshTokenSecret);

                        res.send({
                            "Code": 200,
                            "Status": "Login successfull",
                            "token": token,
                            "refreshToken": refreshToken
                        });
                    }
                })
            }
            else{
                res.send({
                    "Code": 204,
                    "Status": "Email does not exist"
                });
            }
        }
    });
}