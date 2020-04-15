const express = require('express');
const router = express.Router();
const auth = require('../controller/auth');


router.get('/api',(req, res)=>{
    res.send("Welcome to follege");
});

// Define your api routes here
router.post('/api/register',auth.register);
router.post('/api/login',auth.login);
router.get('/api/getUsers',auth.getUsers);

module.exports = router;