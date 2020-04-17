require('dotenv').config();
const express = require('express');
const router = require('./routes/routes');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res,next){

    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Origin","Origin, X-Requested-With,Content-Type, Accept");
    next();
});

app.use(router);

app.use("*",function(req,res){
    console.log('Invalid Url');
    res.sendStatus(404);
  });

app.listen(process.env.PORT,()=>{
    console.log("Server is running");
});
