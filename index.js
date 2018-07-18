require('dotenv').config();
const express = require('express');
const session = require('express-session');

const passport = require('passport');
const Auth0Strategy = require('passport-auth0')

const app = express();

app.use(session({
    secret: Rocky,
    resave: false,
    saveUninitialized: false,
}))

app.use(passport(initialize))
app.use(passport(session))

passport.use(new Auth0Strategy({
    domain: process.env.DOMAIN,
    client = process.env.CLIENT,
    clientSecret = process.env.CLIENT_Secret,
    callbackURL = './login',
    scope = 'openid email profile'
},
    function (accessToken, refreshToken, extraParams, profile, done) {
        return done(null, profile)
    }
))
const port = 3000;
app.listen(port, () => { console.log(`Server listening on port ${port}`); });