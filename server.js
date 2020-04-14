const express = require('express');
const login = require('./routes/loginroutes');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.urlencoded({ extented: true }));
app.use(express.json());
app.use(cookieParser());

app.use(function (req, res,next){

    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Origin","Origin, X-Requested-With,Content-Type, Accept");
    next();
});
var router = express.Router();

// Auth routes
app.post('/register',login.register);
app.post('/login',login.login);

app.get('/api',(req , res) => {
    res.send('Hey there!')
});

app.get('/getUsers' , login.getUsers)
app.listen(5000);