const express = require('express');
const passport = require('passport');
const router = express.Router();

// Redirect user to Discord login
router.get('/login', passport.authenticate('discord'));

// Discord OAuth2 callback URL
router.get('/callback', passport.authenticate('discord', {
  failureRedirect: '/'
}), (req, res) => {
  // Successful login, redirect to dashboard or homepage
  res.redirect('/dashboard');
});

// Logout route
router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
