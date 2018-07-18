require('dotenv').config();
const express = require('express');
const session = require('express-session');
const students = require('./students.json')

const passport = require('passport');
const Auth0Strategy = require('passport-auth0')

const app = express();

app.use(session({
    secret: 'Rocky',
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: process.env.DOMAIN,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_Secret,
    callbackURL: '/login',
    scope: "openid email profile"
},
    function (accessToken, refreshToken, extraParams, profile, done) {
        return done(null, profile)
    }
))
passport.serializeUser((user, done) => {
    done(null, { clientID: user.id, email: user._json.email, name: user._json.name })
})
passport.deserializeUser((obj, done) => {
    done({ obj })
})

app.get('/login', passport.authenticate('auth0',
    { successRedirect: '/students', failureRedirect: '/login', connection: 'github' }
));

function authenticated(req, res, next) {
    if (req.user) {
        next()
    } else {
        res.sendStatus(401);
    }
}

app.get('/students', authenticated, (req, res, next) => {
    res.status(200).send(students)
})
const port = 3000;
app.listen(port, () => { console.log(`Server listening on port ${port}`); });