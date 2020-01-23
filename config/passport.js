const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user')
//const Article = require('../article')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('Made to passport file', profile)
    // a user has logged in with OAuth...
    User.findOne({ 'googleId': profile.id}, function(err, user) {
      if (err) return cb(err);
      if (user) {
        return cb(null, user);
      } else {
        console.log('did not find user making new user')
        //we have a new article via OAuth!
        const newUser= new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          profilePic: profile.photos[0].value,
        });
        newUser.save(function(err) {
          console.log('added new user')
          if(err) console.log(err)
          if (err) return cb(err);
          return cb(null, newUser);
        })
      }
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});