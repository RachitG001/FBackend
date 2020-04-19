// Import passport packages
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Import models
const db = require('./sequelize');
passport.use('login',new LocalStrategy(

    function(username, password, done){
        db.User.findOne({
            where:{
                username: username
            }
        }).then(function (user){
            // User not found
            if(!user){
                return done(null,false,{
                    message: "User does not exist."
                });
            }
            // Incorrect password
            else if(!user.validPassword(password)){
                return done(null,false,{
                    message: "Incorrect Password"
                });
            }
            // login successful
            return done(null, user);
        });
    }
));

module.exports = passport;