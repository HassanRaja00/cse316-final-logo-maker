var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/User");

router.post('/register', function(req, res) {
    if(!req.body.username || !req.body.password){
        res.json({success: false, msg: 'Must enter both username and password.'});
    } else {
        var newUser = new User({
            username: req.body.username,
            password: req.body.password
        });
        //save user
        newUser.save(function(err) {
            if(err) {
                return res.json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'User successfully created.'});
        });
    }
});

router.post('/login', function(req, res) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if(err) throw err;

        if(!user) {
            res.status(401).send({success: false, msg: 'User not found.'});
        } else {
            //check if passwords match
            user.comparePassword(req.body.password, function(err, isMatch) {
                if(isMatch && !err) { // if the user is found and password is right, create token
                    var token = jwt.sign(user.toJSON(), settings.secret);
                    //return the info including token as JSON
                    res.json({success: true, token: 'JWT' + token});                    
                } else{
                    res.status(401).send({success: false, msg: 'Incorrect password.'});
                }
            });
        }
    });
});

module.exports = router;