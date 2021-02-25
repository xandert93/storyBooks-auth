const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User.js');

module.exports = (passport) => {
  const verifyCallback = async (accessToken, refreshToken, profile, done) => {
    try {
      const foundUser = await User.findOne({ googleId: profile.id });
      if (!foundUser) {
        try {
          const newUser = await new User({
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value,
          }).save();
          return done(null, newUser);
        } catch (err) {
          console.log({ error: err.message });
        }
      } else return done(null, foundUser);
    } catch (err) {
      return done(err);
    }
  };

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      verifyCallback
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) =>
    User.findById(id, (err, user) => done(err, user))
  );
};
