/**
 * Created by ssd on 3/3/15.
 */
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User.js');
var jwt = require('jwt-simple');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;



function createSendToken(user, res) {
    var payload = {
        sub: user.id
    };

    var token = jwt.encode(payload, 'shhhh....');

    res.status(200).send({
        user: user.toJSON(),
        token: token
    });
}

var app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

passport.serializeUser(function(user, done){
    done(null, user.id);
});

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
});

var strategyOptions = {
    usernameField: 'email'
};

var loginStrategy = new LocalStrategy(strategyOptions,
    function(email, password, done) {
        var searchUser = {
            email: email
        };

        User.findOne(searchUser, function(err, user){
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, {message: 'Wrong email/password'});
            }

            user.comparePasswords(password, function(err, isMatch){
                if (err) {
                    return done(err);
                }

                if (!isMatch) {
                    return done(null, false, {message: 'Wrong email/password'});
                }

                return done(null, user);
            });
        })
    });

var registerStrategy = new LocalStrategy(strategyOptions, function(email, password, done) {
    var searchUser = {
        email: email
    };

    User.findOne(searchUser, function(err, user) {
        if (err) {
            return done(err);
        }

        if (user) {
            return done(null, false, {message: 'Email already exists'});
        }

        var newUser = new User({
            email: email,
            password: password
        });

        newUser.save(function (err) {
            done(err, newUser);
        });
    });
});

passport.use('local-login', loginStrategy);
passport.use('local-register', registerStrategy);

app.post('/register', passport.authenticate('local-register'), function(req, res){
    createSendToken(req.user, res);
});

app.post('/login', passport.authenticate('local-login'), function(req, res){
    createSendToken(req.user, res);
});

var jobs = [
    'Cook',
    'SuperHero',
    'Unicorn Wisperer',
    'Toast Inspector'
];

app.get('/jobs', function(req, res){
    if (!req.headers.authorization) {
        return res.status(401).send({
            message: 'You are not authorized'
        });
    }

    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, 'shhhh....');

    if (!payload.sub) {
        res.status(401).send({
            message: 'Authentication failed'
        });
    }

    res.json(jobs);
});

mongoose.connect('mongodb://localhost/jwt');

var server = app.listen(8373, function(){
    console.log('api listening on ', server.address().port);
});

