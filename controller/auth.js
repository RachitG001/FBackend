const {User} = require('../config/sequelize');
const express = require('express');
const passport = require('passport');
// const { check, validationResult} = require('express-validator')

module.exports={

    register:function (req,res){
        console.log("Register api")

        User.create(req.body).then((user)=>{
            res.status(200).json("User created successfully");
            return;
        }).catch((err)=>{
            res.status(400).send(err);
        })
    },

    getUsername: function(req,res){
        console.log('Get all username');
        User.findAll({
            attributes: ['username']
        }).then((users)=>{
            res.json(users);
        }).catch((err)=>{
            res.status(400).send(err);
        })
    },

    // getUsers : function (req,res){
    //     console.log('Get all users');

    //     User.findAll({
    //         attributes: {
    //             exclude: ['password']
    //         }
    //     }).then((users)=>{
    //         res.json(users);
    //     }).catch((err)=>{
    //         res.status(400).send(err);
    //     })
    // },

    login: (req,res,next)=>{
        // req.check('password').exist();
        // req.check('username').exist();

        // const errors = body(req);
        // if(errors){
        //     res.status(400).send(errors);
        // }

        console.log('login api')
        passport.authenticate('login',{session:false},(err,user,info)=>{
            if(!user)
            {
                res.status(401).json({error:info})
            }
            res.status(200).json("Login successful");
        })(req, res, next);
    }
}