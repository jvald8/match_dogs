require(`nodejs-dashboard`);
require(`dotenv`).config();
// node dashboard, runs with 'npm dev'

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var _ = require('lodash');

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

var passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy;

var FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID,
	FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(passport.initialize());
app.use(passport.session());

var call = require('./call');

var db = require('../database/user');

var port = process.env.PORT || 8080;

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:8080/auth/facebook/callback',
  profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified', 'picture.type(large)', 'friends']
}, function(accessToken, refreshToken, profile, done) {
  process.nextTick(function() {
    //Assuming user exists
    db.getUser(profile, localStorage.setItem('user', JSON.stringify(profile)), done(null, profile));
  });
}));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  scope: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified', 'picture.type(large)', 'friends'],
  successRedirect: '/success',
  failureRedirect: '/error'
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/login', function(req, res) {
	res.send('<a href="/auth/facebook">Sign in with Facebook</a>')
})

app.get('/success', function(req, res, next) {
  if(_.isEmpty(localStorage.getItem('user').email)) {
  	res.redirect('/profile')
  }
  //res.send('Successfully logged in.<br><a href="/logout">Sign out</a>');
  // if email not present in profile, redirect to profile page, and ask for email.

});

app.get('/profile', function(req, res, next) {
	//console.log(JSON.parse(localStorage.getItem('user')).email);
	//res.send({profile:JSON.parse(localStorage.getItem('user')).id})

	var user = JSON.parse(localStorage.getItem('user')),
		photo = user.photos[0].value;
		
	res.send(`<form><label>Enter your email</label><br><input type="text"></input><input type="submit"></input></form><img src=${photo}>`)
})

app.get('/error', function(req, res, next) {
  res.send("Error logging in.");
});

app.get('/logout', function(req, res) {
	localStorage.removeItem('user');
	res.redirect('/login')
})
// testing login function
app.get('/test', loggedIn, function(req, res) {
	res.send('this should only send when logged in')
})

var router = express.Router();

router.use(function(req, res, next) {
	console.log('something is happening');
	next();
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// api calls -- Gets
router.get('/getDog/:dogId', loggedIn, call.getDog);
router.get('/getDogIds/:zipCode', loggedIn, call.getDogIds);

app.use('/api', router);

app.listen(port);
console.log(`Magic happens on port ${port}`);

function loggedIn(req, res, next) {
	//console.log(localStorage.getItem('user'))
    if (!_.isEmpty(localStorage.getItem('user'))) {
        next();
    } else {
        res.redirect('/login');
    }
}
