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

// To test routes
app.get('/',(req, res)=> res.sendFile(path.join(__dirname+ '/login.html')));

// Auth routes
router.post('/register',login.register);
router.post('/login',login.login);

app.use('/api',router);
app.listen(5000);