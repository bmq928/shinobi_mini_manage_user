const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;
let passport = require('passport');

passport.use(new LocalStrategy({
    usernameField: 'mail',
    passwordField: 'password'
}, (mail, password, done) => {
    console.log('inside local-strategy')
    User.findOne({mail}, (err, user) => {
        if(err) return done(err)

        if(!user) return done(null, false, {message: 'incorrect username'})

        user.validPassword(password, (err, same) => {
            if(err) return done(err)
            if(same) return done(null, user)
            if(!same) return done(null, false, {message: 'incorrect password'})
        })
    })
}))