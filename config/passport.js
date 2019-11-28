const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/user');
const Doctor = require('../models/doctor');

module.exports = (passport) => {
    
    //LocalStrategy
    passport.use('local', new LocalStrategy((username, password, done) => {

        //Match User
        let query = {username: username};
        User.findOne(query, (err, user) => {
            if (err) throw err;

            if (!user) {
                return done(null, false, {message: 'No User Found!'});
            }

            console.log(user._id);

            //Match Password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;

                if(isMatch){
                    return done(null, user);
                } else{
                    return done(null, false, {message: 'Incorrect Password!'});
                }
            });
        });

    }));
    
    //Serialize & Deserialize User
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
} 