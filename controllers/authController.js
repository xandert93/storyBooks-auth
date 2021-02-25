const passport = require('passport');

exports.authenticateOnGoogle = (req, res) => {
  const requestUserProfile = passport.authenticate('google', {
    scope: ['profile'],
  });
  requestUserProfile(req, res);
};

exports.authenticateWithGoogle = (req, res) => {
  const authenticateUser = passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
  });
  authenticateUser(req, res);
};

exports.logoutUser = (req, res) => {
  req.logout();
  res.redirect('/');
};
