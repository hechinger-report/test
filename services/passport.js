const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});


passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => {
			done(null, user)
		});
});

passport.use(
	new GoogleStrategy({
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: 'https://boiling-plains-27909.herokuapp.com/auth/google/callback',
		proxy: true
		}, (accessToken, refreshToken, profile, done) => {
			User.findOne({googleId: profile.id}).then(function(result) {
				if (!result) {
					new User({
						googleId: profile.id
					}).save().then((user) => {
						done(null, user)
					})
					console.log("New user created")
				} else {
					done(null, result)
				}
				console.log("User logged in")
			});			
			// console.log('accessToken:', accessToken);
			// console.log('refreshToken:', refreshToken);
			// console.log('profile:', profile);			
		})
	);