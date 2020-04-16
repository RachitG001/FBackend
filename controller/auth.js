connection = require('.././config/db');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const tokenLife = process.env.tokenLife;
const refreshTokenLife = process.env.refreshTokenLife;
const jwtTokenSecret = process.env.jwtTokenSecret;
const jwtRefreshTokenSecret = process.env.jwtRefreshTokenSecret;

module.exports={
    register:function (req,res){
        console.log("Register api")
        console.log(req.body);
        var hashp = bcrypt.hashSync(req.body.password,saltRounds);
        if (hashp == undefined)
        {
            console.log('Invalid password');
            res.send({
                "code": 422,
                "Status": "Invalid password"
            });
            return;
        }
        var today = new Date();
        var users = {
            "name": req.body.name,
            "username": req.body.username,
            "email": req.body.email,
            "password": hashp,
            "countryExt": "+91",
            "mobile": req.body.mobile,
            "imageUrl": req.body.imageUrl|| null,
            "bio": "Student",
            "dob": "Feb",
            "gender": req.body.gender || null,
            "isEmailVerified": true,
            "type": 1,
            "createdAt": today,
            "updatedAt": today
            }

        connection.query('INSERT INTO users SET ?', users, function(err,results,fields){

        if (err)
            {
                console.log(err);
                res.send({
                    "code": 400,
                    "Status": "This username already exists."
                });
            }
        else
            {
                res.send({
                    "code": 200,
                    "Status": "User created successfully."
                });
            }
        });
    },

    login:function (req,res){

        var username = req.body.username;
        var password = req.body.password;
        console.log(password);

        if (password == undefined)
        {
            console.log('Invalid password');
            res.send({
                "code": 422,
                "Status": "Invalid password"
            });
            return;
        }

        connection.query('SELECT * FROM users WHERE username = ?',username,function(err, results, fields){

            if (err) {
                console.log(err);
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
                                expiresIn: tokenLife,
                                data: password
                            },jwtTokenSecret);
                            const refreshToken = jwt.sign({
                                expiresIn: refreshTokenLife,
                                data: password
                            },jwtRefreshTokenSecret);

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
    },

    getUsers : function (req,res){

        connection.query('SELECT username FROM users', null , function(err, results, fields){

            if (err) {
                console.log(err)
                res.send({
                    "Code": 400,
                    "failed": "Error occured"
                });
            }
            else{
                if (results.length>0){
                   res.send(results)
                }
                else{
                    res.send({
                        "Code": 204,
                        "Status": "Error"
                    });
                }
            }
        });

    }
}