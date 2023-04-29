const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport')
const UserModel = require('../model/UserModel')


passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:5550/api/google/callback",
  passReqToCallback: true
},
  async function (request, accessToken, refreshToken, profile, done) {
    await UserModel.findOrCreate({
      googleId: profile.id,
      firstname: profile.name.givenName,
      lastname: profile.name.familyName,
      phone: null, email: profile.email,
      password: null, role: 'client'
    },
      function (err, user) {
        return done(err, user);
      });
  }
));

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})